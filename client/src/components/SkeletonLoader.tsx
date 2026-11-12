import { motion } from "framer-motion";
import "./SkeletonLoader.css";

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonLoader = ({ count = 4 }: SkeletonLoaderProps) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="skeleton-card"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.7 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.1,
          }}
        >
          <div className="skeleton-image" />
          <div className="skeleton-content">
            <div className="skeleton-title" />
            <div className="skeleton-description" />
            <div className="skeleton-price" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
