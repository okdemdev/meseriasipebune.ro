import { notFound } from "next/navigation";
import { ProfessionalProfile } from "@/components/professional-profile";
import { RatingSection } from "@/components/rating-section";

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

export default async function ProfessionalPage({
  params,
}: {
  params: { id: string };
}) {
  const professional = await getProfessional(params.id);
  
  if (!professional) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfessionalProfile professional={professional} />
      <RatingSection professionalId={params.id} />
    </div>
  );
}