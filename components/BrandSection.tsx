import React from 'react';

export const BrandSection: React.FC = () => {
  // Using SimpleIcons CDN with explicit color codes to ensure visibility on white background
  // Sony is explicitly set to black (000000) to fix visibility issues
  
  const brands = [
    { 
      name: "Sony", 
      logo: "https://cdn.simpleicons.org/sony/000000", // Force Black
      className: "h-5 md:h-7" 
    },
    { 
      name: "Samsung", 
      logo: "https://cdn.simpleicons.org/samsung/1428A0", // Official Blue
      className: "h-8 md:h-10" 
    },
    { 
      name: "LG", 
      logo: "https://cdn.simpleicons.org/lg/A50034", // Official Red
      className: "h-10 md:h-12" 
    },
    { 
      name: "Panasonic", 
      logo: "https://cdn.simpleicons.org/panasonic/0044BB", // Official Blue
      className: "h-6 md:h-8" 
    },
    { 
      name: "OnePlus", 
      logo: "https://cdn.simpleicons.org/oneplus/F50000", // Official Red
      className: "h-8 md:h-10" 
    }
  ];

  return (
    <section id="brands" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Brands We Repair</h2>
          <p className="mt-4 text-lg text-slate-600">Specialized expert service for major global TV brands.</p>
        </div>

        {/* Removed card backgrounds (bg-slate-50, shadow) to show plain logos as requested */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 items-center justify-items-center">
          {brands.map((brand) => (
            <div 
              key={brand.name} 
              className="flex items-center justify-center w-full group"
            >
              <img 
                src={brand.logo} 
                alt={`${brand.name} TV Repair`} 
                loading="lazy"
                width={120}
                height={60}
                className={`w-auto max-w-[140px] object-contain transition-transform duration-300 group-hover:scale-110 ${brand.className}`}
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