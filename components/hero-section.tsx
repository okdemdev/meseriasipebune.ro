import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="relative bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Găsește Profesioniști Calificați
          <span className="text-primary block mt-2">Pentru Proiectele Tale</span>
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground max-w-2xl mx-auto">
          Conectează-te cu meseriași de încredere din zona ta. De la instalații sanitare la lucrări
          electrice, găsește expertul potrivit pentru îmbunătățirile casei tale.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
          <Link href="/categories">
            <Button size="lg" className="w-full sm:w-auto">
              Vezi Categorii
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Înregistrează-te ca Meseriaș
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
