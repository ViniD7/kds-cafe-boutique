import { Product, Kit } from "../types/api";
import { productAPI } from "../services/api";

// These functions will now fetch data from the API instead of using static data
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    return await productAPI.getAllProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    return await productAPI.getProductById(id);
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return undefined;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    return await productAPI.getProductsByCategory(category);
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    return await productAPI.getAllProducts({ featured: true });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};

// Note: Kits functionality might need to be implemented separately depending on your API structure
// For now, keeping it simple with the same interface
export const getAllKits = async (): Promise<Kit[]> => {
  // In a real implementation, you might have a separate endpoint for kits
  // For now, we'll return an empty array or fetch products that are kits
  try {
    const allProducts = await getAllProducts();
    // Filter products that are kits if your API differentiates them
    return allProducts.filter(p => p.category.toLowerCase().includes('kit')) as unknown as Kit[];
  } catch (error) {
    console.error("Error fetching kits:", error);
    return [];
  }
};

export const getKitById = async (id: string): Promise<Kit | undefined> => {
  try {
    // In a real implementation, you might have a separate endpoint for kits
    const product = await productAPI.getProductById(id);
    return product as unknown as Kit;
  } catch (error) {
    console.error(`Error fetching kit with id ${id}:`, error);
    return undefined;
  }
};

export const categories = [
  "Café especial",
  "Café gourmet",
  "Kits",
  "Cookie Cups",
  "Drip coffee",
  "Cápsulas",
  "Sacas de Café",
];