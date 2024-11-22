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
import { Loader2, PencilIcon, X } from 'lucide-react';
import { CATEGORIES, CITIES } from '@/lib/constants';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().optional(),
  whatsapp: z.string().min(10, 'WhatsApp number must be at least 10 characters'),
  category: z.string().min(1, 'Main category is required'),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  city: z.string().min(1, 'Main city is required'),
  cities: z.array(z.string()).min(1, 'At least one city is required'),
  profileImage: z.string().min(1, 'Profile image is required'),
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
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Manage your professional profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
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
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell clients about yourself and your work..."
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
                    <FormLabel>WhatsApp Number</FormLabel>
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
                    <FormLabel>Main Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your main category" />
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
                    <FormLabel>Additional Categories</FormLabel>
                    <Select onValueChange={(value) => handleAddCategory(value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Add more categories" />
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
                    <FormLabel>Main City</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your main city" />
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
                    <FormLabel>Additional Cities</FormLabel>
                    <Select onValueChange={(value) => handleAddCity(value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Add more cities" />
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
                    <FormLabel>Work Portfolio</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        maxFiles={5}
                        multiple
                      />
                    </FormControl>
                    <FormDescription>Add up to 5 images of your best work</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
