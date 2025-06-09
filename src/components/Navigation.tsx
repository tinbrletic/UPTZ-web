"use client";

import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Change background when scrolled past 80% of viewport height
      setIsScrolled(scrollPosition > viewportHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 text-white z-50 transition-all duration-300 ${isScrolled
      ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg'
      : 'bg-transparent'
      }`}>
      <div className="container mx-auto px-8 flex justify-between items-center">
        <Link href={`/${locale}`} className="flex" >
          <Image
            className='h-auto'
            src="/adria_hydrofoil_navbar_logo.svg"
            alt="Adria Hydrofoil Logo"
            width={55}
            height={131}
            style={{ height: "auto" }}
          />
          <Image
            className='h-auto'
            src="/UPTZ_navbar_logo.svg"
            alt="UPTZ Logo"
            width={175}
            height={84}
            style={{ height: "auto" }}
          />
        </Link>
        <div className="hidden md:flex items-center text-xl space-x-6">
          <Link href={`/${locale}/about-us`} className="hover:text-blue-300">
            {t('menu.aboutUs')}
          </Link>
          <div className="relative group">
            <span className="hover:text-blue-300 cursor-default flex gap-2 items-center">
              {t('menu.projects')}

              <svg width="10" height="9" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 7.5L0.602887 0.749999L8.39711 0.75L4.5 7.5Z" fill="white" />
              </svg>

            </span>
            <div className={`absolute top-full left-0 mt-1 w-48 ${isScrolled
              ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg border border-gray-700 rounded-lg pl-4'
              : 'bg-transparent'
              } text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
              <div className="py-1">
                <Link href={`/${locale}/projects/wilson`} className="block py-1 hover:text-blue-300 duration-200">
                  <span className="relative inline-block overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-300 after:origin-bottom after:scale-y-0 hover:after:scale-y-125 after:transition-transform after:duration-400">
                    Wilson
                  </span>
                </Link>
                <Link href={`/${locale}/projects/malo-vitra`} className="block py-1 hover:text-blue-300 duration-200">
                  <span className="relative inline-block overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-300 after:origin-bottom after:scale-y-0 hover:after:scale-y-125 after:transition-transform after:duration-400">
                    Malo Vitra
                  </span>
                </Link>
                <Link href={`/${locale}/projects/teredo-navalis`} className="block py-1 hover:text-blue-300 duration-200">
                  <span className="relative inline-block overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-300 after:origin-bottom after:scale-y-0 hover:after:scale-y-125 after:transition-transform after:duration-400">
                    Teredo Navalis
                  </span>
                </Link>
                <Link href={`/${locale}/projects/delta-one`} className="block py-1 hover:text-blue-300 duration-200">
                  <span className="relative inline-block overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-300 after:origin-bottom after:scale-y-0 hover:after:scale-y-125 after:transition-transform after:duration-400">
                    Delta One
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <Link href={`/${locale}/partners`} className="hover:text-blue-300">
            {t('menu.partners')}
          </Link>
          <Link href={`/${locale}/open-source`} className="hover:text-blue-300">
            {t('menu.openSource')}
          </Link>
          <LanguageSwitcher className="bg-blue-600 hover:bg-blue-700" />
        </div>
      </div>

    </nav>
  );
}
