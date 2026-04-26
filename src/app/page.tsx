"use client";

import HeroSection from "@/features/topup/components/hero-section";
import CategoryGrid from "@/features/topup/components/category-grid";
import PopularProducts from "@/features/topup/components/popular-products";
import HowItWorks from "@/features/topup/components/how-it-works";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <PopularProducts />
      <HowItWorks />
    </>
  );
}
