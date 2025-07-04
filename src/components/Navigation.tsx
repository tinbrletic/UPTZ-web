"use client";

import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = memo(function Navigation() {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if we're on the contact page or open-source page
  const isContactPage = pathname?.includes('/contact');
  const isOpenSourcePage = pathname?.includes('/open-source');

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Change background when scrolled past 80% of viewport height
    setIsScrolled(scrollPosition > viewportHeight * 0.8);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 text-white z-50 transition-all duration-300 ${isScrolled || isContactPage || isOpenSourcePage || isMobileMenuOpen
      ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg'
      : 'bg-transparent'
      }`}>
      <div className="container mx-auto px-8 flex justify-between items-center">        <Link href={`/${locale}`} className="flex" >
        <Image
          className='h-auto'
          src="/adria_hydrofoil_navbar_logo.svg"
          alt="Adria Hydrofoil Logo"
          width={55}
          height={131}
          style={{ height: "auto" }}
          priority={true}
          loading="eager"
          fetchPriority="high"
        />
        <Image
          className='h-auto'
          src="/UPTZ_navbar_logo.svg"
          alt="UPTZ Logo"
          width={175}
          height={84}
          style={{ height: "auto" }}
          priority={true}
          loading="eager"
          fetchPriority="high"
        />
      </Link>
        <div className="hidden md:flex items-center text-xl space-x-6">
          <Link href={`/${locale}/about-us`} className="hover:text-blue-300">
            {t('menu.aboutUs')}
          </Link>
          <div className="relative group">
            <span className="hover:text-blue-300 cursor-default flex gap-2 items-center">
              {t('menu.projects')}          <svg
                width="10"
                height="9"
                viewBox="0 0 9 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Dropdown arrow"
              >
                <path d="M4.5 7.5L0.602887 0.749999L8.39711 0.75L4.5 7.5Z" fill="white" />
              </svg>

            </span>
            <div className={`absolute top-full left-0 mt-1 w-48 ${isScrolled || isContactPage || isOpenSourcePage
              ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg border border-gray-700 rounded-lg pl-4'
              : 'bg-transparent'
              } text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
              <div className="py-1">
                <Link href={`/${locale}/projects/vilson`} className="block py-1 hover:text-blue-300 duration-200">
                  <span className="relative inline-block overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-300 after:origin-bottom after:scale-y-0 hover:after:scale-y-125 after:transition-transform after:duration-400">
                    Vilson
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
          <Link href={`/${locale}/contact`} className="hover:text-blue-300">
            {t('menu.contact')}
          </Link>
          <Link href={`/${locale}/open-source`} className="hover:text-blue-300">
            {t('menu.openSource')}
          </Link>
          <LanguageSwitcher className="bg-blue-600 hover:bg-blue-700" />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
          aria-label="Toggle mobile menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 absolute ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
            }`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
            }`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 absolute ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
            }`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } ${isScrolled || isContactPage || isOpenSourcePage ? 'bg-gray-900/95' : 'bg-gray-900/95'} backdrop-blur-sm`}>
        <div className="px-8 py-4 space-y-4">
          <Link
            href={`/${locale}/about-us`}
            className="block text-white hover:text-blue-300 transition-colors"
            onClick={closeMobileMenu}
          >
            {t('menu.aboutUs')}
          </Link>

          <div className="space-y-2">
            <span className="block text-white font-medium">{t('menu.projects')}</span>
            <div className="pl-4 space-y-2">
              <Link
                href={`/${locale}/projects/wilson`}
                className="block text-gray-300 hover:text-blue-300 transition-colors"
                onClick={closeMobileMenu}
              >
                Wilson
              </Link>
              <Link
                href={`/${locale}/projects/malo-vitra`}
                className="block text-gray-300 hover:text-blue-300 transition-colors"
                onClick={closeMobileMenu}
              >
                Malo Vitra
              </Link>
              <Link
                href={`/${locale}/projects/teredo-navalis`}
                className="block text-gray-300 hover:text-blue-300 transition-colors"
                onClick={closeMobileMenu}
              >
                Teredo Navalis
              </Link>
              <Link
                href={`/${locale}/projects/delta-one`}
                className="block text-gray-300 hover:text-blue-300 transition-colors"
                onClick={closeMobileMenu}
              >
                Delta One
              </Link>
            </div>
          </div>

          <Link
            href={`/${locale}/partners`}
            className="block text-white hover:text-blue-300 transition-colors"
            onClick={closeMobileMenu}
          >
            {t('menu.partners')}
          </Link>

          <Link
            href={`/${locale}/contact`}
            className="block text-white hover:text-blue-300 transition-colors"
            onClick={closeMobileMenu}
          >
            {t('menu.contact')}
          </Link>

          <Link
            href={`/${locale}/open-source`}
            className="block text-white hover:text-blue-300 transition-colors"
            onClick={closeMobileMenu}
          >
            {t('menu.openSource')}
          </Link>

          <div className="pt-2">            <LanguageSwitcher className="bg-blue-600 hover:bg-blue-700" />
          </div>
        </div>
      </div>    </nav>
  );
});

export default Navigation;
