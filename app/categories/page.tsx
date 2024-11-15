import { CategoryGrid } from '@/components/category-grid';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">Browse Categories</h1>
        <p className="text-muted-foreground">
          Explore our range of professional services for your home improvement needs.
        </p>
      </div>
      <CategoryGrid />
    </div>
  );
}
