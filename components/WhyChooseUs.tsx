import React from 'react';
import { Wrench, Clock, ShieldCheck, MapPin, Truck, Award } from 'lucide-react';
import { SERVICE_AREAS } from '../constants';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Certified Experts",
      description: "Our team consists of verified and highly trained professionals."
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Fast Service",
      description: "We aim for same-day service visits for most locations in Bangalore."
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Doorstep Repair",
      description: "No need to carry your TV. We come to your location and fix it."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
      title: "Service Warranty",
      description: "Get peace of mind with up to 3 months warranty on our repairs."
    }
  ];

  return (
    <section id="why-us" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features Grid */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Why Choose Screen Savers?</h2>
          <p className="mt-4 text-lg text-slate-600">We restore your entertainment experience quickly and affordably.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-center text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Service Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 md:p-12 lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-2xl font-bold text-slate-900">Service Area</h3>
              </div>
              <p className="text-lg text-slate-600 mb-6">
                We provide exclusive doorstep service across <strong className="text-slate-900">Bangalore</strong>.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {SERVICE_AREAS.map((area) => (
                  <div key={area} className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    {area}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:w-1/2 lg:pl-12 border-t lg:border-t-0 lg:border-l border-slate-100 pt-8 lg:pt-0">
               <div className="bg-blue-50 rounded-xl p-6 text-center">
                 <p className="font-semibold text-blue-900 mb-2">Not sure if we cover your area?</p>
                 <p className="text-blue-700 mb-4">Call us directly to confirm availability.</p>
                 <a href="tel:+919606860679" className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                   Call Now
                 </a>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};