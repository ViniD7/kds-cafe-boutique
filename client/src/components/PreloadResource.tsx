import { useEffect } from "react";
import { Helmet } from "react-helmet";

const PreloadResources = () => {
  useEffect(() => {
    // Pré-carrega as imagens da página Sobre
    const preloadImages = [
      "/Assets/images/sobre.webp",
      "/Assets/images/colheita1.webp",
      "/Assets/images/placeholder.svg",
    ];

    preloadImages.forEach((image) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = image;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <Helmet>
      <link rel="preload" href="/Assets/images/sobre.webp" as="image" />
      <link rel="preload" href="/Assets/images/colheita1.webp" as="image" />
      <link rel="preload" href="/Assets/images/placeholder.svg" as="image" />
    </Helmet>
  );
};

export default PreloadResources;
