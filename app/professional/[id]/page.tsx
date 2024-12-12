import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProfessionalProfile } from '@/components/professional-profile';
import { RatingSection } from '@/components/rating-section';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { slugifyCategory } from '@/lib/utils';

async function getProfessional(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professionals/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch professional');
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ProfessionalPage({ params }: { params: { id: string } }) {
  const professional = await getProfessional(params.id);

  if (!professional) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link href={`/categories/${slugifyCategory(professional.category)}`}>
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Înapoi la {professional.category}
        </Button>
      </Link>
      <ProfessionalProfile professional={professional} />
      <RatingSection professionalId={params.id} />
    </div>
  );
}
