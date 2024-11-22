'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { StarRating } from '@/components/star-rating';
import { toast } from 'sonner';

const formSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Comentariul trebuie să aibă cel puțin 10 caractere'),
});

interface RatingSectionProps {
  professionalId: string;
}

export function RatingSection({ professionalId }: RatingSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 5,
      comment: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/professionals/${professionalId}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Evaluarea nu a putut fi trimisă');

      toast.success('Evaluare trimisă cu succes!');
      form.reset();
    } catch (error) {
      toast.error('Nu s-a putut trimite evaluarea. Te rugăm să încerci din nou.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6">Lasă o Evaluare</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Evaluare</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Button
                        key={value}
                        type="button"
                        variant={field.value >= value ? 'default' : 'outline'}
                        className="p-2"
                        onClick={() => field.onChange(value)}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentariu</FormLabel>
                <FormControl>
                  <Textarea placeholder="Împărtășește experiența ta..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Se trimite...' : 'Trimite Evaluarea'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
