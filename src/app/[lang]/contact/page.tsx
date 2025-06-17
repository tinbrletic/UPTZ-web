"use client";

import BlobContainer from "@/components/BlobContainer";
import { useTranslation } from "@/hooks/useTranslation";
import emailjs from '@emailjs/browser';
import { useState } from "react";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // EmailJS configuration
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        title: `New Contact Form Submission from ${formData.name}`,
        to_email: 'uptzri@gmail.com',
      }; await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: unknown) {
      console.error('EmailJS error details:', error);
      setSubmitStatus('error');

      // Provide more specific error messages
      let errorMsg = 'Failed to send message. Please try again.';
      if (error && typeof error === 'object' && 'text' in error) {
        errorMsg = `Error: ${(error as { text: string }).text}`;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMsg = `Error: ${(error as { message: string }).message}`;
      }

      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative pt-20">
      <div className="fixed inset-0 pointer-events-none z-0">
        <BlobContainer animationType="normal" />
        <BlobContainer animationType="reverse" className="opacity-50" />
        <BlobContainer animationType="slow" className="opacity-30" />
      </div>
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
                <p className="text-green-800">Your message has been sent successfully! We&apos;ll get back to you soon.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
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
                {isSubmitting ? 'Sending...' : t("contact.form.send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
