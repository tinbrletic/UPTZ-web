"use client";

import { useTranslation } from "@/hooks/useTranslation";
import {
  CONTACT_LIMITS,
  CONTACT_THROTTLE_MS,
  classifySendError,
  prepareContactSubmission,
} from "@/lib/contactForm";
import emailjs from '@emailjs/browser';
import { useState } from "react";

export default function Contact() {
  const { t } = useTranslation();
  const emptyForm = { name: '', email: '', message: '', website: '' };
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  // Store the translation key, not the text, so the message follows a language switch.
  const [errorKey, setErrorKey] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorKey('');

    const submission = prepareContactSubmission(formData);

    if (submission.status === 'spam') {
      // Look successful so bots get no signal, but send nothing.
      setSubmitStatus('success');
      setFormData(emptyForm);
      return;
    }

    if (submission.status === 'invalid') {
      setSubmitStatus('error');
      setErrorKey(`contact.form.errors.${submission.error}`);
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      console.error(
        'EmailJS is not configured: set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.'
      );
      setSubmitStatus('error');
      setErrorKey('contact.form.errors.failed');
      return;
    }

    setIsSubmitting(true);
    try {
      // The recipient is fixed in the EmailJS template, never sent from here.
      await emailjs.send(serviceId, templateId, submission.params, {
        publicKey,
        blockHeadless: true,
        limitRate: { id: 'contact-form', throttle: CONTACT_THROTTLE_MS },
      });

      setSubmitStatus('success');
      setFormData(emptyForm);
    } catch (error: unknown) {
      // Full details stay in the console; visitors get a translated message.
      console.error('EmailJS error details:', error);
      setSubmitStatus('error');
      setErrorKey(`contact.form.errors.${classifySendError(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative pt-20">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-4xl font-bold mb-10 text-center">{t("menu.contact")}</h1>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{t("contact.getInTouch")}</h2>
            <p className="mb-4">{t("contact.reachOut")}</p>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">{t("contact.email")}:</h3>
              <a href="mailto:uptzri@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                {t("footer.email")}
              </a>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">{t("contact.phone")}:</h3>
              <a href="tel:+385 98 9176039" className="text-blue-600 hover:text-blue-800 transition-colors">
                {t("footer.phone")}
              </a>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">{t("contact.address")}:</h3>
              <address className="not-italic">
                {t("footer.address")}
              </address>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{t("contact.contactForm")}</h2>

            {submitStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800">{t("contact.form.success")}</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">{t(errorKey)}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Honeypot: off-screen and hidden from screen readers, so only bots fill it in. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-medium">
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  maxLength={CONTACT_LIMITS.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-medium">
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  maxLength={CONTACT_LIMITS.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block mb-2 font-medium">
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  maxLength={CONTACT_LIMITS.message}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-semibold py-2 px-6 rounded-md transition-colors ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
              >
                {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
