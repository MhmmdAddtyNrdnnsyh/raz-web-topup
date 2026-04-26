import type { Category, Product, PaymentMethod } from "@/features/topup/types";
import { CATEGORIES, PRODUCTS, PAYMENT_METHODS } from "@/lib/mock-data";

// Using mock data for now - replace with apiClient calls when backend is ready

export async function getCategories(): Promise<Category[]> {
  // return apiClient.get<Category[]>('/categories');
  return Promise.resolve(CATEGORIES);
}

export async function getProducts(): Promise<Product[]> {
  // return apiClient.get<Product[]>('/products');
  return Promise.resolve(PRODUCTS);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  // return apiClient.get<Product>(`/products/${slug}`);
  return Promise.resolve(PRODUCTS.find((p) => p.slug === slug) ?? null);
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  // return apiClient.get<Product[]>(`/products?category=${categorySlug}`);
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return Promise.resolve([]);
  return Promise.resolve(
    PRODUCTS.filter((p) => p.categoryId === category.id)
  );
}

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  // return apiClient.get<PaymentMethod[]>('/payment-methods');
  return Promise.resolve(PAYMENT_METHODS);
}
