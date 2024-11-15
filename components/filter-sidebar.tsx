"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const cities = [
  "Bucharest",
  "Cluj-Napoca",
  "Timișoara",
  "Iași",
  "Constanța",
  "Brașov",
];

export function FilterSidebar() {
  const [minRating, setMinRating] = useState([4]);
  const [selectedCity, setSelectedCity] = useState("");

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
            <span className="text-sm text-muted-foreground">
              {minRating} stars and above
            </span>
          </div>

          <div className="space-y-2">
            <Label>Search by Name</Label>
            <Input placeholder="Search professionals..." />
          </div>

          <Button className="w-full">Apply Filters</Button>
        </div>
      </div>
    </div>
  );
}