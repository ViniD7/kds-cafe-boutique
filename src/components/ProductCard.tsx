import {
  motion,
  useAnimation,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product, Kit } from "@/data/products";
import {
  formatCurrency,
  truncateText,
  calculateDiscount,
  getImageUrl,
} from "@/lib/utils";
import { FaShoppingCart, FaEye, FaHeart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import "./ProductCard/ProductCard.css";

interface ProductCardProps {
  item: Product | Kit;
  isKit?: boolean;
}

const PremiumProductCard = ({ item, isKit = false }: ProductCardProps) => {
  const { id, name, shortDescription, price, images } = item;
  const kit = isKit ? (item as Kit) : null;
  const discount = kit ? calculateDiscount(kit.originalPrice, kit.price) : 0;

  // Check if product is available (has stock)
  const isAvailable = isKit
    ? true
    : (item as Product).variants.some((variant) => variant.stock > 0);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Detecta se é mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Configuração do carrossel automático
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovered && !isMobile && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isHovered, images.length, isMobile]);

  // Variantes de animação premium
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hover: {
      y: isMobile ? 0 : -10,
      scale: isMobile ? 1 : 1.05,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    },
  };

  const imageVariants: Variants = {
    enter: { opacity: 0, zIndex: 1 },
    center: { opacity: 1, zIndex: 1 },
    exit: { opacity: 0, zIndex: 0 },
  };

  const actionButtonVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    // Check if product is a kit
    if (isKit) {
      addToCart(id, 1, undefined, true);
      toast({
        title: "Adicionado ao Carrinho",
        description: `${name} foi adicionado ao seu carrinho.`,
      });
      return;
    }

    // For products, check availability
    if (!isAvailable) {
      toast({
        title: "Produto Indisponível",
        description:
          "Este produto está esgotado e não pode ser adicionado ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    // For available products, add the first variant with stock to the cart
    const product = item as Product;
    const availableVariant = product.variants.find(
      (variant) => variant.stock > 0
    );

    if (availableVariant) {
      addToCart(id, 1, availableVariant.id, false);
      toast({
        title: "Adicionado ao Carrinho",
        description: `${name} (${availableVariant.name}) foi adicionado ao seu carrinho.`,
      });
    } else {
      // This shouldn't happen if isAvailable is true, but just in case
      toast({
        title: "Produto Indisponível",
        description:
          "Este produto está esgotado e não pode ser adicionado ao carrinho.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover={isMobile ? undefined : "hover"}
      whileTap={isMobile ? { scale: 0.98 } : undefined}
      variants={cardVariants}
      className="premium-product-card"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => isMobile && setIsHovered(true)}
      onTouchEnd={() => isMobile && setTimeout(() => setIsHovered(false), 500)}
    >
      <Link
        to={isKit ? `/kits/${id}` : `/produtos/${id}`}
        className="premium-product-link"
      >
        <div className="premium-image-container">
          {!imageLoaded && (
            <motion.div
              className="premium-image-placeholder"
              initial={{ opacity: 1 }}
              animate={{ opacity: imageLoaded ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="placeholder-spinner" />
            </motion.div>
          )}

          <div className="image-carousel">
            <AnimatePresence initial={false} custom={currentImageIndex}>
              <motion.img
                key={currentImageIndex}
                src={getImageUrl(images[currentImageIndex])}
                alt={name}
                className="premium-product-image"
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
                custom={currentImageIndex}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.6, ease: "easeInOut" },
                }}
              />
            </AnimatePresence>
          </div>

          {isKit && discount > 0 && (
            <motion.div
              className="premium-discount-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                delay: 0.3,
                stiffness: 500,
                damping: 15,
              }}
            >
              {discount}% OFF
            </motion.div>
          )}

          {/* Indisponível tag */}
          {!isKit && !isAvailable && (
            <motion.div
              className="premium-unavailable-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                delay: 0.3,
                stiffness: 500,
                damping: 15,
              }}
            >
              Indisponível
            </motion.div>
          )}

          {images.length > 1 && (
            <div className="image-nav-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`nav-dot ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

          <motion.div
            className="product-actions"
            initial="hidden"
            animate={isHovered || isMobile ? "visible" : "hidden"}
            variants={{
              hidden: {
                opacity: 0,
                transition: { staggerChildren: 0.1, staggerDirection: -1 },
              },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  when: "beforeChildren",
                },
              },
            }}
          >
            <motion.button
              className="action-button cart-button"
              variants={actionButtonVariants}
              whileHover={isMobile ? undefined : "hover"}
              whileTap="tap"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <FaShoppingCart />
            </motion.button>
            <motion.button
              className="action-button view-button"
              variants={actionButtonVariants}
              whileHover={isMobile ? undefined : "hover"}
              whileTap="tap"
              aria-label="Quick view"
            >
              <FaEye />
            </motion.button>
          </motion.div>
        </div>

        <div className="premium-product-content">
          <motion.h3
            className="premium-product-title"
            whileHover={{ color: "#baa460" }}
            transition={{ duration: 0.2 }}
          >
            {name}
          </motion.h3>

          <p className="premium-product-description">
            {truncateText(shortDescription, isMobile ? 50 : 70)}
          </p>

          <div className="premium-price-container">
            <span className="premium-current-price">
              {formatCurrency(price)}
            </span>
            {isKit && kit && (
              <span className="premium-original-price">
                {formatCurrency(kit.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PremiumProductCard;
