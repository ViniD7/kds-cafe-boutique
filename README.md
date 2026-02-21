# KDS Cafe Boutique - Full Stack E-commerce Application

This is a full-stack e-commerce application built with React and TypeScript for the frontend and Node.js/Express/MongoDB for the backend. The application has been restructured into a proper full-stack architecture with separate client and server applications.

## Project Structure

```
kds-cafe-boutique/
├── client/                 # Frontend application
│   ├── public/
│   ├── src/
│   │   ├── Assets/
│   │   ├── Constants/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/       # API service layer
│   │   ├── types/          # Shared TypeScript types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/                 # Backend application
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.ts
│   ├── package.json
│   └── .env
├── package.json            # Root package.json for monorepo management
└── README.md
```

## Features

### Client-Side (React/TypeScript)
- Product browsing and filtering
- Shopping cart functionality
- User authentication and profiles
- Order history
- Responsive design
- API communication layer

### Server-Side (Node.js/Express/MongoDB)
- RESTful API endpoints
- User authentication with JWT
- Product management
- Shopping cart management
- Order processing
- Database models for users, products, carts, and orders
- Input validation and security

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Router DOM
- Axios for HTTP requests
- Vite as bundler

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests
- Dotenv for environment variables

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (either local installation or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kds-cafe-boutique
```

2. Install dependencies for both client and server:
```bash
npm run install:all
```

3. Set up environment variables:

Create `.env` file in the `server/` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kds-cafe-boutique
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

4. Run the application:

For development (both client and server):
```bash
npm run dev
```

For client only:
```bash
cd client
npm run dev
```

For server only:
```bash
cd server
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create a new product (requires auth)
- `PUT /api/products/:id` - Update a product (requires auth)
- `DELETE /api/products/:id` - Delete a product (requires auth)

### Cart
- `GET /api/cart` - Get user's cart (requires auth)
- `POST /api/cart/add` - Add item to cart (requires auth)
- `PUT /api/cart/update/:itemId` - Update cart item quantity (requires auth)
- `DELETE /api/cart/remove/:itemId` - Remove item from cart (requires auth)
- `DELETE /api/cart/clear` - Clear user's cart (requires auth)

### Orders
- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get specific order (requires auth)
- `POST /api/orders` - Create a new order (requires auth)
- `PUT /api/orders/:id` - Update an order (requires auth)
- `DELETE /api/orders/:id` - Delete an order (requires auth)

## Scripts

- `npm run dev` - Run both client and server in development mode
- `npm run dev:client` - Run only the client in development mode
- `npm run dev:server` - Run only the server in development mode
- `npm run install:all` - Install dependencies for both client and server
- `npm run build` - Build both client and server
- `npm run build:client` - Build only the client
- `npm run build:server` - Build only the server

## Environment Variables

### Server (.env)
- `NODE_ENV` - Environment (development/production)
- `PORT` - Port for the server to run on
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing

### Client (.env)
- `REACT_APP_API_URL` - Base URL for API requests

## Database Models

### User
- `_id`: ObjectId
- `name`: String
- `email`: String (unique)
- `password`: String
- `createdAt`: Date
- `updatedAt`: Date

### Product
- `_id`: ObjectId
- `name`: String
- `description`: String
- `shortDescription`: String
- `price`: Number
- `images`: [String]
- `variants`: [{ name: String, price: Number, stock: Number }]
- `category`: String
- `featured`: Boolean
- `createdAt`: Date
- `updatedAt`: Date

### Cart
- `_id`: ObjectId
- `userId`: ObjectId (ref to User)
- `items`: [{ productId: ObjectId, variantId: String, quantity: Number, isKit: Boolean }]
- `createdAt`: Date
- `updatedAt`: Date

### Order
- `_id`: ObjectId
- `userId`: ObjectId (ref to User)
- `items`: [{ productId: ObjectId, variantId: String, name: String, quantity: Number, price: Number, isKit: Boolean }]
- `total`: Number
- `status`: String (enum: 'Pendente', 'Processando', 'Enviado', 'Entregue', 'Cancelado')
- `createdAt`: Date
- `updatedAt`: Date

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.