'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { CITIES } from '@/lib/constants';

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minRating, setMinRating] = useState([4]);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchName, setSearchName] = useState('');

  // Initialize filters from URL params
  useEffect(() => {
    const city = searchParams.get('city');
    const rating = searchParams.get('rating');
    const search = searchParams.get('search');

    if (city) setSelectedCity(city);
    if (rating) setMinRating([parseFloat(rating)]);
    if (search) setSearchName(search);
  }, [searchParams]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCity) params.set('city', selectedCity);
    else params.delete('city');

    if (minRating[0] !== 4) params.set('rating', minRating[0].toString());
    else params.delete('rating');

    if (searchName) params.set('search', searchName);
    else params.delete('search');

    const category = window.location.pathname.split('/').pop();
    router.push(`/categories/${category}?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filtre</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Oraș</Label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Alege orașul" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((city) => (
                  <SelectItem key={city} value={city.toLowerCase()}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Rating Minim</Label>
            <Slider
              value={minRating}
              onValueChange={setMinRating}
              max={5}
              step={0.5}
              className="mt-2"
            />
            <span className="text-sm text-muted-foreground">{minRating} stele și peste</span>
          </div>

          <div className="space-y-2">
            <Label>Caută după nume</Label>
            <Input
              placeholder="Caută meseriași..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleApplyFilters}>
            Aplică Filtrele
          </Button>
        </div>
      </div>
    </div>
  );
}
