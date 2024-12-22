'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Wrench, Menu, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, [pathname]); // Re-run auth check when pathname changes

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/profile', {
        // Include credentials to send cookies
        credentials: 'include',
        // Add cache control to prevent stale responses
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setIsLoggedIn(false);
        // Force a hard navigation
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Don't show auth buttons while checking auth status
  if (isLoading) {
    return (
      <nav className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/icon.png" alt="Logo" width={24} height={24} />
              <span className="text-xl font-bold">Meseriași pe Bune</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/icon.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold">Meseriași pe Bune</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/my-profile">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profilul Meu</span>
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Deconectare
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Conectare</Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline">Înregistrare ca Meseriaș</Button>
                </Link>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            {isLoggedIn ? (
              <>
                <Link href="/my-profile">
                  <Button
                    variant="ghost"
                    className="w-full mb-2 flex items-center justify-center space-x-2"
                  >
                    <User className="h-5 w-5" />
                    <span>Profilul Meu</span>
                  </Button>
                </Link>
                <Button variant="outline" className="w-full mb-2" onClick={handleLogout}>
                  Deconectare
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="w-full mb-2">
                    Conectare
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" className="w-full mb-2">
                    Înregistrare ca Meseriaș
                  </Button>
                </Link>
              </>
            )}
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
