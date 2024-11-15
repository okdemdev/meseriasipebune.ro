import { CategoryGrid } from "@/components/category-grid";
import { SearchBar } from "@/components/search-bar";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <SearchBar />
        <CategoryGrid />
      </div>
    </div>
  );
}