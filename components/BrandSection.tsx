import React from 'react';

export const BrandSection: React.FC = () => {
  // Using SimpleIcons CDN with official brand colors
  const brands = [
    { 
      name: "Sony", 
      logo: "https://cdn.simpleicons.org/sony", 
    },
    { 
      name: "Samsung", 
      logo: "https://cdn.simpleicons.org/samsung", 
    },
    { 
      name: "LG", 
      logo: "https://cdn.simpleicons.org/lg", 
    },
    { 
      name: "Panasonic", 
      logo: "https://cdn.simpleicons.org/panasonic", 
    },
    { 
      name: "Xiaomi", 
      logo: "https://cdn.simpleicons.org/xiaomi", 
    },
    { 
      name: "OnePlus", 
      logo: "https://cdn.simpleicons.org/oneplus", 
    },
    { 
      name: "Philips", 
      logo: "https://cdn.simpleicons.org/philips", 
    },
    { 
      name: "Haier", 
      logo: "https://cdn.simpleicons.org/haier", 
    }
  ];

  return (
    <section id="brands" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Expert Service for All Brands</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our technicians are certified to handle the complex internal circuitry of all major global and local Smart TV brands.
          </p>
        </div>

        {/* Standardized container for visual similarity */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 md:gap-12 items-center justify-items-center">
          {brands.map((brand) => (
            <div 
              key={brand.name} 
              className="flex items-center justify-center w-full h-20 transition-all duration-300 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
              title={brand.name}
            >
              <img 
                src={brand.logo} 
                alt={`${brand.name} TV Repair`} 
                loading="lazy"
                className="max-h-8 md:max-h-10 w-auto max-w-[120px] object-contain"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center bg-slate-50 py-6 rounded-2xl border border-dashed border-slate-200">
             <p className="text-slate-500 text-sm">
               Don't see your brand? We repair <strong>TCL, Hisense, BPL, Sansui, Micromax</strong> and more. 
               <a href="#book-now" className="ml-2 text-blue-600 font-bold hover:underline">Check Availability</a>
             </p>
        </div>
      </div>
    </section>
  );
};