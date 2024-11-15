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

const cities = ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Brașov'];

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
    router.push(`/category/${category}?${params.toString()}`);

    // Wait for the page to load and then scroll
    setTimeout(() => {
      const professionalsSection = document.getElementById('professionals-section');
      if (professionalsSection) {
        window.scrollTo({
          top: professionalsSection.offsetTop - 100, // Offset to show part of the second professional
          behavior: 'smooth',
        });
      }
    }, 300); // Adjust the timeout if needed to wait for the page to load
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>City</Label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city.toLowerCase()}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Minimum Rating</Label>
            <Slider
              value={minRating}
              onValueChange={setMinRating}
              max={5}
              step={0.5}
              className="mt-2"
            />
            <span className="text-sm text-muted-foreground">{minRating} stars and above</span>
          </div>

          <div className="space-y-2">
            <Label>Search by Name</Label>
            <Input
              placeholder="Search professionals..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
