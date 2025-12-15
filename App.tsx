import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandSection } from './components/BrandSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { EnquiryForm } from './components/EnquiryForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Hero />
        <BrandSection />
        <WhyChooseUs />
        <EnquiryForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;