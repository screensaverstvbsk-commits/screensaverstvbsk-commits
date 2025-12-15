import React from 'react';

export const BrandSection: React.FC = () => {
  const brands = [
    { 
      name: "Sony", 
      logo: "https://cdn.svgporn.com/logos/sony.svg",
      className: "h-8 md:h-10" 
    },
    { 
      name: "Samsung", 
      logo: "https://cdn.svgporn.com/logos/samsung.svg",
      className: "h-6 md:h-8" // Samsung is wide, so slightly shorter height balances it
    },
    { 
      name: "LG", 
      logo: "https://cdn.svgporn.com/logos/lg.svg",
      className: "h-10 md:h-12" 
    },
    { 
      name: "Panasonic", 
      logo: "https://cdn.svgporn.com/logos/panasonic.svg",
      className: "h-6 md:h-8" 
    },
    { 
      name: "OnePlus", 
      logo: "https://cdn.svgporn.com/logos/oneplus.svg",
      className: "h-8 md:h-10" 
    }
  ];

  return (
    <section id="brands" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Brands We Repair</h2>
          <p className="mt-4 text-lg text-slate-600">Specialized expert service for major global TV brands.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <div 
              key={brand.name} 
              className="flex items-center justify-center w-full h-32 p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 hover:bg-white transition-all duration-300 group cursor-default"
            >
              <img 
                src={brand.logo} 
                alt={`${brand.name} TV Repair`} 
                loading="lazy"
                className={`w-auto max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ${brand.className}`}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
             <p className="text-slate-500 text-sm">Don't see your brand? We repair most other LED & Smart TVs too. <a href="#book-now" className="text-blue-600 font-semibold hover:underline">Contact us</a></p>
        </div>
      </div>
    </section>
  );
};