'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { BrandSection } from '../components/BrandSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { EnquiryForm } from '../components/EnquiryForm';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { MobileAppNav } from '../components/MobileAppNav';
import { InstallPWA } from '../components/InstallPWA';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const scrollToForm = () => {
    const element = document.getElementById('book-now');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile-only app install prompt */}
      <div className="md:hidden">
        <InstallPWA variant="banner" />
      </div>

      {/* Shared Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onScrollToForm={scrollToForm}
      />

      <Header onBookNow={handleOpenModal} />

      <main>
        <Hero onBookNow={handleOpenModal} />
        <BrandSection />
        <WhyChooseUs />
        <EnquiryForm />
      </main>

      <Footer />

      {/* Mobile App Navigation */}
      <MobileAppNav onBookNow={handleOpenModal} />
    </div>
  );
}