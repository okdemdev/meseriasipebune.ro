'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfessionalProfile } from '@/components/professional-profile';
import { Button } from '@/components/ui/button';
import { Loader2, PencilIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function MyPublicProfilePage() {
  const [professional, setProfessional] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      setProfessional(data);
    } catch (error) {
      toast.error('Failed to load profile');
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!professional) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <Button onClick={() => router.push('/profile')} variant="outline">
          <PencilIcon className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>
      <ProfessionalProfile professional={professional} isOwnProfile={true} />
    </div>
  );
}
