import { motion } from "framer-motion";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  title: string;
  highlightedText: string;
  subtitle: string;
  className?: string;
}

const SectionHeader = ({
  title,
  highlightedText,
  subtitle,
  className = "",
}: SectionHeaderProps) => {
  return (
    <motion.div
      className={`${styles.header} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.span
          style={{ display: "inline-block" }}
          whileHover={{
            y: -5,
            transition: { type: "spring", stiffness: 300 },
          }}
        >
          {title}{" "}
          <span className={styles.titleHighlight}>{highlightedText}</span>
        </motion.span>
      </motion.h1>
      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export default SectionHeader;
