"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const projects = [
  {
    slug: "vilson",
    title: "Vilson",
    image: "/about_landing_images/vilson.jpg",
    descriptionKey: "menu.projectsDropdown.vilson",
  },
  {
    slug: "karolina",
    title: "Karolina",
    image: "/about_landing_images/karolina.jpg",
    descriptionKey: "menu.projectsDropdown.karolina",
  },
  {
    slug: "malo-vitra",
    title: "Malo Vitra",
    image: "/about_landing_images/malo_vitra.jpg",
    descriptionKey: "menu.projectsDropdown.maloVitra",
  },
  {
    slug: "teredo-navalis",
    title: "Teredo Navalis",
    image: "/about_landing_images/teredo_navalis.jpg",
    descriptionKey: "menu.projectsDropdown.teredoNavalis",
  },
];

const Navigation = memo(function Navigation() {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <div className="fixed inset-x-0 top-4 z-[60] flex justify-center px-4">
      <div className="w-full md:w-auto">
        <Menu setActive={setActive} className="justify-between md:justify-start">
          <Link
            href={`/${locale}`}
            className="flex shrink-0 items-center gap-1"
            onClick={closeMobileMenu}
          >
            <Image
              src="/adria_hydrofoil_navbar_logo.svg"
              alt="Adria Hydrofoil Logo"
              width={55}
              height={131}
              className="h-10 w-auto"
              priority
            />
            <Image
              src="/UPTZ_navbar_logo.svg"
              alt="UPTZ Logo"
              width={175}
              height={84}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 text-lg text-white md:flex">
            <Link
              href={`/${locale}/about-us`}
              className="transition-colors hover:text-blue-300"
            >
              {t("menu.aboutUs")}
            </Link>
            <MenuItem setActive={setActive} active={active} item={t("menu.projects")}>
              <div className="grid grid-cols-2 gap-6 p-2">
                {projects.map((project) => (
                  <ProductItem
                    key={project.slug}
                    title={project.title}
                    description={t(project.descriptionKey)}
                    href={`/${locale}/projects/${project.slug}`}
                    src={project.image}
                  />
                ))}
              </div>
            </MenuItem>
            <Link
              href={`/${locale}/achievements`}
              className="transition-colors hover:text-blue-300"
            >
              {t("menu.achievements")}
            </Link>
            <Link
              href={`/${locale}/partners`}
              className="transition-colors hover:text-blue-300"
            >
              {t("menu.partners")}
            </Link>
            <LanguageSwitcher className="rounded-full bg-blue-600 text-white hover:bg-blue-700" />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="relative flex h-8 w-8 flex-col items-center justify-center md:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`absolute block h-0.5 w-6 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 w-6 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            ></span>
          </button>
        </Menu>

        {/* Mobile card menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 space-y-3 rounded-2xl border border-white/15 bg-gray-950/95 px-6 py-4 text-white shadow-2xl backdrop-blur-md md:hidden"
            >
              <Link
                href={`/${locale}/about-us`}
                className="block transition-colors hover:text-blue-300"
                onClick={closeMobileMenu}
              >
                {t("menu.aboutUs")}
              </Link>

              <div className="space-y-2">
                <span className="block font-medium">{t("menu.projects")}</span>
                <div className="space-y-2 pl-4">
                  {projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/${locale}/projects/${project.slug}`}
                      className="block text-gray-300 transition-colors hover:text-blue-300"
                      onClick={closeMobileMenu}
                    >
                      {project.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href={`/${locale}/achievements`}
                className="block transition-colors hover:text-blue-300"
                onClick={closeMobileMenu}
              >
                {t("menu.achievements")}
              </Link>

              <Link
                href={`/${locale}/partners`}
                className="block transition-colors hover:text-blue-300"
                onClick={closeMobileMenu}
              >
                {t("menu.partners")}
              </Link>

              <div className="pt-2">
                <LanguageSwitcher className="rounded-full bg-blue-600 text-white hover:bg-blue-700" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

export default Navigation;
