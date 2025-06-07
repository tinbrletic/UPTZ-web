"use client";

import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';

export default function Footer() {
  const { t } = useTranslation();
  const { locale } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-8 relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-blue-600">{t('footer.contact')}</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {t('footer.address')}
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {t('footer.phone')}
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {t('footer.email')}
              </p>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-blue-600">{t('footer.followUs')}</h3>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm mb-4">{t('footer.socialDescription')}</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.171875 22C0.171875 9.84974 10.0216 0 22.1719 0C34.3221 0 44.1719 9.84974 44.1719 22C44.1719 34.1503 34.3221 44 22.1719 44C10.0216 44 0.171875 34.1503 0.171875 22Z" fill="#374151" />
                    <path d="M27.1719 13.6667H24.6719C23.5668 13.6667 22.507 14.1057 21.7256 14.8871C20.9442 15.6685 20.5052 16.7283 20.5052 17.8334V20.3334H18.0052V23.6667H20.5052V30.3334H23.8386V23.6667H26.3386L27.1719 20.3334H23.8386V17.8334C23.8386 17.6124 23.9264 17.4004 24.0827 17.2442C24.2389 17.0879 24.4509 17.0001 24.6719 17.0001H27.1719V13.6667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                  <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.171875 22C0.171875 9.84974 10.0216 0 22.1719 0C34.3221 0 44.1719 9.84974 44.1719 22C44.1719 34.1503 34.3221 44 22.1719 44C10.0216 44 0.171875 34.1503 0.171875 22Z" fill="#374151" />
                    <g clipPath="url(#clip0_372_674)">
                      <path d="M14.2552 26.1667C13.6731 23.4194 13.6731 20.5806 14.2552 17.8333C14.3317 17.5543 14.4795 17.3001 14.6841 17.0955C14.8886 16.8909 15.1429 16.7432 15.4219 16.6667C19.8914 15.9262 24.4523 15.9262 28.9219 16.6667C29.2009 16.7432 29.4552 16.8909 29.6597 17.0955C29.8643 17.3001 30.0121 17.5543 30.0885 17.8333C30.6707 20.5806 30.6707 23.4194 30.0885 26.1667C30.0121 26.4457 29.8643 26.6999 29.6597 26.9045C29.4552 27.1091 29.2009 27.2568 28.9219 27.3333C24.4524 28.0739 19.8914 28.0739 15.4219 27.3333C15.1429 27.2568 14.8886 27.1091 14.6841 26.9045C14.4795 26.6999 14.3317 26.4457 14.2552 26.1667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20.5052 24.5L24.6719 22L20.5052 19.5V24.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_372_674">
                        <rect width="20" height="20" fill="white" transform="translate(12.1719 12)" />
                      </clipPath>
                    </defs>
                  </svg>

                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                  <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.171875 22C0.171875 9.84974 10.0216 0 22.1719 0C34.3221 0 44.1719 9.84974 44.1719 22C44.1719 34.1503 34.3221 44 22.1719 44C10.0216 44 0.171875 34.1503 0.171875 22Z" fill="#374151" />
                    <g clipPath="url(#clip0_372_678)">
                      <path d="M26.3385 13.6667H18.0052C15.704 13.6667 13.8385 15.5322 13.8385 17.8334V26.1667C13.8385 28.4679 15.704 30.3334 18.0052 30.3334H26.3385C28.6397 30.3334 30.5052 28.4679 30.5052 26.1667V17.8334C30.5052 15.5322 28.6397 13.6667 26.3385 13.6667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M25.5052 21.475C25.6081 22.1685 25.4896 22.8769 25.1667 23.4992C24.8438 24.1215 24.3329 24.6262 23.7066 24.9414C23.0803 25.2566 22.3706 25.3663 21.6784 25.255C20.9862 25.1436 20.3467 24.8167 19.8509 24.321C19.3552 23.8252 19.0284 23.1857 18.917 22.4935C18.8056 21.8013 18.9153 21.0916 19.2305 20.4653C19.5457 19.8391 20.0504 19.3281 20.6727 19.0052C21.2951 18.6823 22.0034 18.5638 22.6969 18.6667C23.4044 18.7716 24.0593 19.1012 24.565 19.6069C25.0707 20.1126 25.4003 20.7676 25.5052 21.475Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M26.7552 17.4167H26.7636" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_372_678">
                        <rect width="20" height="20" fill="white" transform="translate(12.1719 12)" />
                      </clipPath>
                    </defs>
                  </svg>

                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.171875 22C0.171875 9.84974 10.0216 0 22.1719 0C34.3221 0 44.1719 9.84974 44.1719 22C44.1719 34.1503 34.3221 44 22.1719 44C10.0216 44 0.171875 34.1503 0.171875 22Z" fill="#374151" />
                    <g clipPath="url(#clip0_372_683)">
                      <path d="M25.5052 18.6667C26.8313 18.6667 28.1031 19.1935 29.0408 20.1312C29.9785 21.0689 30.5052 22.3407 30.5052 23.6667V29.5001H27.1719V23.6667C27.1719 23.2247 26.9963 22.8008 26.6838 22.4882C26.3712 22.1757 25.9473 22.0001 25.5052 22.0001C25.0632 22.0001 24.6393 22.1757 24.3267 22.4882C24.0142 22.8008 23.8386 23.2247 23.8386 23.6667V29.5001H20.5052V23.6667C20.5052 22.3407 21.032 21.0689 21.9697 20.1312C22.9074 19.1935 24.1792 18.6667 25.5052 18.6667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17.1718 19.5H13.8385V29.5H17.1718V19.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15.5052 17.0001C16.4256 17.0001 17.1718 16.2539 17.1718 15.3334C17.1718 14.4129 16.4256 13.6667 15.5052 13.6667C14.5847 13.6667 13.8385 14.4129 13.8385 15.3334C13.8385 16.2539 14.5847 17.0001 15.5052 17.0001Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_372_683">
                        <rect width="20" height="20" fill="white" transform="translate(12.1719 12)" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Donations */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-blue-600">{t('footer.donations')}</h3>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">{t('footer.donationDescription')}</p>
              <div className="space-y-2">
                <div className='font-semibold text-base'>
                  <div>
                    {t('footer.donationMethods.paypal.title')} {t('footer.donationMethods.paypal.details')}
                  </div>
                  <div>
                    {t('footer.donationMethods.bankTransfer.title')} {t('footer.donationMethods.bankTransfer.details')}
                  </div>
                </div>
                <p className="text-xs text-gray-400">{t('footer.donationNote')}</p>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          {/* Logos Row */}
          <div className="flex flex-wrap justify-around items-center">
            <div className="flex flex-col items-center">
              <Image className="mb-2 h-auto" width={68} height={68} src="/footer/UPTZ_footer_logo.svg" alt="UPTZ footer logo" />
              <div>
                {t('footer.copyright.upper')}
              </div>
              <div>
                {t('footer.copyright.lower')}
              </div>
            </div>
            <div className="flex gap-1 flex-col items-center">
              <Image className="h-auto" width={60} height={60} src="/footer/RWT_footer_logo.svg" alt="RWT footer logo" />
              <div >
                {t('footer.RWT')}
              </div>
              <Image className="h-auto" width={68} height={13} src="/footer/CC_footer_icon.svg" alt="CC footer icon" />
            </div>
            <div className="flex flex-col items-center">
              <Image className="mb-2 h-auto" width={174} height={59} src="/footer/burza_nautike_footer_logo.svg" alt="Burza Nautike footer logo" />
              <div>
                {t('footer.burzaNautike')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
