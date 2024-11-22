'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email('Te rugăm să introduci o adresă de email validă'),
  password: z.string().min(1, 'Parola este obligatorie'),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Conectarea a eșuat');
      }

      toast.success('Conectare reușită!');

      // Small delay to ensure cookie is set
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Redirect to public profile instead of edit page
      window.location.href = '/my-profile';
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ceva nu a mers bine');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Înapoi la Pagina Principală
      </Link>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Conectare Meseriaș</h1>
          <p className="text-muted-foreground">
            Bine ai revenit! Te rugăm să te conectezi la contul tău
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Introdu emailul tău" {...field} />
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
                    <Input type="password" placeholder="Introdu parola ta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Se conectează...' : 'Conectare'}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-muted-foreground">
          Nu ai cont încă?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Înregistrează-te aici
          </Link>
        </div>
      </div>
    </div>
  );
}
