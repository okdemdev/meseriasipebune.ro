import { ProfessionalCard } from '@/components/professional-card';
import { CategoryHeader } from '@/components/category-header';
import { FilterSidebar } from '@/components/filter-sidebar';

async function getProfessionals(category: string, searchParams: URLSearchParams) {
  const queryString = searchParams.toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/professionals?category=${category}${
    queryString ? `&${queryString}` : ''
  }`;

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch professionals');
  return res.json();
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const urlSearchParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) urlSearchParams.set(key, value.toString());
  });

  const professionals = await getProfessionals(params.slug, urlSearchParams);

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader category={params.slug} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <FilterSidebar />
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionals.map((professional: any) => (
              <ProfessionalCard key={professional._id} professional={professional} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
