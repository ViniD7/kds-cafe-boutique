import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/Order'; // Assuming this is the order model path

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia' as any,
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
      return res.status(400).json({ error: { message: 'Missing required parameters: amount or orderId' } });
    }

    // amount should be in cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Assuming amount comes in BRL (e.g. 150.00)
      currency: 'brl',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: orderId.toString(),
      },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return res.status(400).json({ error: { message: error.message } });
  }
};

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event;

  try {
    // req.body is a Buffer because we use express.raw() in server.ts
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentSucceeded = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment of ${paymentSucceeded.amount} succeeded for order ${paymentSucceeded.metadata.orderId}`);
      
      try {
        // Update order status in DB
        if (paymentSucceeded.metadata.orderId) {
          await Order.findByIdAndUpdate(paymentSucceeded.metadata.orderId, {
            paymentStatus: 'PAID',
            paymentMethod: paymentSucceeded.payment_method_types[0] === 'pix' ? 'PIX' : 'CREDIT_CARD',
          });
        }
      } catch (dbError) {
        console.error('Error updating order after successful payment:', dbError);
      }
      break;

    case 'payment_intent.payment_failed':
      const paymentFailed = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment failed: ${paymentFailed.last_payment_error?.message}`);
      
      try {
        if (paymentFailed.metadata.orderId) {
          await Order.findByIdAndUpdate(paymentFailed.metadata.orderId, {
            paymentStatus: 'FAILED',
          });
        }
      } catch (dbError) {
        console.error('Error updating order after failed payment:', dbError);
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return res.status(200).send();
};
