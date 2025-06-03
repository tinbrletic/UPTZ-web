"use client";

import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const { t } = useTranslation();
  const { locale } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent text-white z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href={`/${locale}`} className="flex" >
          <Image
            src="/adria_hydrofoil_navbar_logo.svg"
            alt="Adria Hydrofoil Logo"
            width={94}
            height={131}
          />
          <Image
            src="/UPTZ_navbar_logo.svg"
            alt="UPTZ Logo"
            width={229}
            height={84}
          />
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href={`/${locale}/about-us`} className="hover:text-blue-300">
            {t('menu.aboutUs')}
          </Link>
          <div className="relative group">
            <span className="hover:text-blue-300 cursor-default flex gap-1 items-center">
              {t('menu.projects')}

              <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 7.5L0.602887 0.749999L8.39711 0.75L4.5 7.5Z" fill="white" />
              </svg>

            </span>
            <div className="absolute top-full left-0 mt-1 w-48 bg-transparent text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                <Link href={`/${locale}/projects/wilson`} className="block py-1 hover:text-blue-300">
                  Wilson
                </Link>
                <Link href={`/${locale}/projects/malo-vitra`} className="block py-1 hover:text-blue-300">
                  Malo Vitra
                </Link>
                <Link href={`/${locale}/projects/teredo-navalis`} className="block py-1 hover:text-blue-300">
                  Teredo Navalis
                </Link>
                <Link href={`/${locale}/projects/delta-one`} className="block py-1 hover:text-blue-300">
                  Delta One
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
