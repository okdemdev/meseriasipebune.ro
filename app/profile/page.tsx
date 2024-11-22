'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUpload } from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2, PencilIcon, X, ArrowLeft } from 'lucide-react';
import { CATEGORIES, CITIES } from '@/lib/constants';

const formSchema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  bio: z.string().optional(),
  whatsapp: z.string().min(10, 'Numărul de WhatsApp trebuie să aibă cel puțin 10 caractere'),
  category: z.string().min(1, 'Categoria principală este obligatorie'),
  categories: z.array(z.string()).min(1, 'Cel puțin o categorie este necesară'),
  city: z.string().min(1, 'Orașul principal este obligatoriu'),
  cities: z.array(z.string()).min(1, 'Cel puțin un oraș este necesar'),
  profileImage: z.string().min(1, 'Imaginea de profil este obligatorie'),
  workImages: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCategory, setNewCategory] = useState<string>('');
  const [newCity, setNewCity] = useState<string>('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      bio: '',
      whatsapp: '',
      category: '',
      categories: [],
      city: '',
      cities: [],
      profileImage: '',
      workImages: [],
    },
  });

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

      // Reset form with fetched data
      form.reset({
        name: data.name,
        bio: data.bio || '',
        whatsapp: data.whatsapp,
        category: data.category,
        categories: data.categories || [],
        city: data.city,
        cities: data.cities || [],
        profileImage: data.profileImage,
        workImages: data.workImages || [],
      });
    } catch (error) {
      toast.error('Failed to load profile');
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast.success('Profile updated successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = (category: string) => {
    const currentCategories = form.getValues('categories');
    if (!currentCategories.includes(category)) {
      form.setValue('categories', [...currentCategories, category]);
    }
    setNewCategory('');
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    const currentCategories = form.getValues('categories');
    form.setValue(
      'categories',
      currentCategories.filter((cat) => cat !== categoryToRemove)
    );
  };

  const handleAddCity = (city: string) => {
    const currentCities = form.getValues('cities');
    if (!currentCities.includes(city)) {
      form.setValue('cities', [...currentCities, city]);
    }
    setNewCity('');
  };

  const handleRemoveCity = (cityToRemove: string) => {
    const currentCities = form.getValues('cities');
    form.setValue(
      'cities',
      currentCities.filter((city) => city !== cityToRemove)
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <Button onClick={() => router.push('/my-profile')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Înapoi la Profilul Public
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Setări Profil</CardTitle>
          <CardDescription>Gestionează informațiile profilului tău profesional</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poză de Profil</FormLabel>
                    <FormControl>
                      <ImageUpload value={field.value} onChange={field.onChange} maxFiles={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nume</FormLabel>
                    <FormControl>
                      <Input placeholder="Numele tău" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descriere</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Spune-le clienților despre tine și serviciile tale..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Număr WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder="+40 123 456 789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria Principală</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectează categoria principală" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categorii Adiționale</FormLabel>
                    <Select onValueChange={(value) => handleAddCategory(value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Adaugă mai multe categorii" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                          <button
                            type="button"
                            onClick={() => handleRemoveCategory(category)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orașul Principal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectează orașul principal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CITIES.map((city) => (
                          <SelectItem key={city} value={city.toLowerCase()}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orașe Adiționale</FormLabel>
                    <Select onValueChange={(value) => handleAddCity(value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Adaugă mai multe orașe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CITIES.map((city) => (
                          <SelectItem key={city} value={city.toLowerCase()}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((city) => (
                        <Badge key={city} variant="secondary">
                          {city}
                          <button
                            type="button"
                            onClick={() => handleRemoveCity(city)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={form.control}
                name="workImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portofoliu de Lucrări</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        maxFiles={5}
                        multiple
                      />
                    </FormControl>
                    <FormDescription>
                      Adaugă până la 5 imagini cu cele mai bune lucrări
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Se salvează...' : 'Salvează Modificările'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
