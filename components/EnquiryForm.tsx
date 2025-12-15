'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { EnquiryFormData, TVBrand, SubmitStatus } from '../types';
import { WHATSAPP_URL_BASE } from '../constants';

export const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    phone: '',
    email: '',
    brand: TVBrand.SONY,
    issue: ''
  });

  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // 1. WhatsApp Logic 
    // We execute this immediately to prevent browser popup blockers from stopping the new tab
    const whatsappMessage = `
*New TV Repair Enquiry*
----------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'N/A'}
*Brand:* ${formData.brand}
*Issue:* ${formData.issue}
*Location:* Bangalore
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappLink = `${WHATSAPP_URL_BASE}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');

    // 2. Email Logic (Background Process)
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Log detailed error for debugging
        const errorData = await response.json().catch(() => ({}));
        console.error('Email API Error:', errorData);
        console.warn('Email sending failed, but WhatsApp opened. Check server logs.');
      } else {
        console.log('Email sent successfully');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      // 3. Show Success Message regardless of email outcome (since WhatsApp opened)
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div id="book-now" className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 text-center max-w-lg mx-auto">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Enquiry Sent!</h3>
        <p className="text-slate-600 mb-6">
          Thank you for contacting Screen Savers. We have opened WhatsApp to send your details. Our technician will call you shortly.
        </p>
        <Button onClick={() => setStatus('idle')} variant="outline">
          Send Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <section id="book-now" className="py-16 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left Side: Info */}
            <div className="md:w-5/12 bg-slate-50 p-8 md:p-12 flex flex-col justify-center border-r border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Book Your Repair</h3>
              <p className="text-slate-600 mb-6">
                Fill out the form to schedule a visit. We prioritize urgent repairs.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">1</div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">Submit Details</p>
                    <p className="text-sm text-slate-500">Tell us about the issue.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">2</div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">WhatsApp Connect</p>
                    <p className="text-sm text-slate-500">We receive your enquiry instantly.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">3</div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">Technician Visit</p>
                    <p className="text-sm text-slate-500">Expert arrives at your doorstep.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="md:w-7/12 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="9999999999"
                    />
                  </div>
                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-slate-700">TV Brand</label>
                    <select
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    >
                      {Object.values(TVBrand).map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address (Optional)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="issue" className="block text-sm font-medium text-slate-700">Problem Description</label>
                  <textarea
                    id="issue"
                    name="issue"
                    rows={3}
                    value={formData.issue}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="E.g., Screen flickering, no sound, power issue..."
                  />
                </div>

                <Button type="submit" fullWidth disabled={status === 'loading'} className="mt-4">
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Book Service Now <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};