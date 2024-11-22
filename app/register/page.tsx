'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from '@/components/image-upload';
import { toast } from 'sonner';
import { CATEGORIES, CITIES } from '@/lib/constants';

const formSchema = z.object({
  email: z.string().email('Te rugăm să introduci o adresă de email validă'),
  password: z.string().min(6, 'Parola trebuie să aibă cel puțin 6 caractere'),
  name: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  category: z.string().min(1, 'Te rugăm să selectezi o categorie'),
  city: z.string().min(1, 'Te rugăm să selectezi un oraș'),
  whatsapp: z.string().min(10, 'Te rugăm să introduci un număr valid de WhatsApp'),
  profileImage: z.string().min(1, 'Imaginea de profil este obligatorie'),
  workImages: z.array(z.string()).min(1, 'Este necesară cel puțin o imagine cu lucrările tale'),
  categories: z.array(z.string()),
  cities: z.array(z.string()),
});

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      category: '',
      city: '',
      whatsapp: '',
      profileImage: '',
      workImages: [],
      categories: [],
      cities: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      values.categories = [values.category, ...values.categories];
      values.cities = [values.city, ...values.cities];

      const response = await fetch('/api/professionals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Înregistrarea a eșuat');
      }

      toast.success('Înregistrare reușită!');

      // Redirect to public profile instead of edit page
      window.location.href = '/my-profile';
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ceva nu a mers bine');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <Link href="/">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Înapoi la Pagina Principală
        </Button>
      </Link>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Înregistrare ca Meseriaș</h1>
          <p className="text-muted-foreground mt-2">
            Creează-ți profilul și începe să primești cereri de lucrări
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    Adaugă până la 5 imagini cu cele mai bune lucrări ale tale
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@exemplu.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parolă</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Creează o parolă" {...field} />
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
                  <FormLabel>Nume Complet</FormLabel>
                  <FormControl>
                    <Input placeholder="Numele tău complet" {...field} />
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
                        <SelectValue placeholder="Alege meseria ta" />
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orașul Principal</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Alege orașul tău" />
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
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Număr WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="+40 123 456 789" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Se creează contul...' : 'Creează Cont'}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-muted-foreground">
          Ai deja un cont?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Conectează-te aici
          </Link>
        </div>
      </div>
    </div>
  );
}
