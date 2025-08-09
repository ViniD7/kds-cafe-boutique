import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductGrid from "@/components/ProductGrid";
import { categories, products, getProductsByCategory } from "@/data/products";
import { useInView } from "react-intersection-observer";
import "./Products/Products.css";
import SectionHeader from "@/components/SectionHeader/SectionHeader";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 4;
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Animation variants
  const parallaxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(getProductsByCategory(activeCategory));
    }
    setCurrentIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const visibleProducts = filteredProducts.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  return (
    <motion.div
      className="products-parallax-container"
      initial="hidden"
      animate="visible"
      variants={parallaxVariants}
      ref={ref}
    >
      <div className="parallax-background" />
      <div className="container-custom">
        <SectionHeader
          title="Nossos"
          highlightedText="Cafés Especiais"
          subtitle="Descubra nossa seleção de cafés especiais, torrados com precisão para destacar suas características únicas e proporcionar uma experiência sensorial completa."
        />
        {/* Category Filter */}
        <motion.div className="categories-wrapper" variants={itemVariants}>
          <motion.div
            className="categories-scroller"
            drag={isMobile ? "x" : false}
            dragConstraints={isMobile ? { right: 0, left: -510 } : undefined}
            whileTap={isMobile ? { cursor: "grabbing" } : undefined}
            style={{
              justifyContent: isMobile ? "flex-start" : "center",
              padding: isMobile ? "0.5rem 1rem" : "0.5rem",
            }}
          >
            {["all", ...categories.filter((c) => c !== "Kits")].map(
              (category) => (
                <motion.div
                  key={category}
                  className={`category-pill ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {category === "all" ? "Todos" : category}
                  {activeCategory === category && (
                    <motion.div
                      className="active-indicator"
                      layoutId="activePill"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>

        {/* Product Carousel */}
        <motion.div className="carousel-container" variants={itemVariants}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ProductGrid products={visibleProducts} />
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <>
              <motion.div className="carousel-indicators">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <motion.div
                    key={index}
                    className={`indicator ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </motion.div>

              <motion.div
                className="carousel-controls"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.button
                  onClick={prevSlide}
                  className="carousel-button"
                  aria-label="Produtos anteriores"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#a9925d",
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                >
                  <FaChevronLeft />
                </motion.button>
                <motion.button
                  onClick={nextSlide}
                  className="carousel-button"
                  aria-label="Próximos produtos"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#a9925d",
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                >
                  <FaChevronRight />
                </motion.button>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Products;
