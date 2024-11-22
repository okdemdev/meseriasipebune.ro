import { CategoryHeader } from '@/components/category-header';
import { FilterSidebar } from '@/components/filter-sidebar';
import { ProfessionalCard } from '@/components/professional-card';
import { normalizeCategory } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

async function getProfessionals(category: string, searchParams: URLSearchParams) {
  try {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set('category', category.toLowerCase());

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/professionals?${queryParams.toString()}`,
      { cache: 'no-store' }
    );

    if (!res.ok) throw new Error('Failed to fetch professionals');
    return res.json();
  } catch (error) {
    console.error('Error fetching professionals:', error);
    return [];
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string };
}) {
  const normalizedCategory = normalizeCategory(decodeURIComponent(params.category));
  const professionals = await getProfessionals(params.category, new URLSearchParams(searchParams));

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Înapoi la Categorii
        </Button>
      </Link>
      <CategoryHeader category={normalizedCategory} />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionals.map((professional: any) => (
              <ProfessionalCard key={professional._id} professional={professional} />
            ))}
          </div>
          {professionals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Nu am găsit meseriași în această categorie.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
