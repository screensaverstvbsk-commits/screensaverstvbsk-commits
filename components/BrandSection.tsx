import React from 'react';

export const BrandSection: React.FC = () => {
  // Using SimpleIcons CDN with explicit color codes
  // Sony is explicitly set to black (000000)
  
  const brands = [
    { 
      name: "Sony", 
      logo: "https://cdn.simpleicons.org/sony/000000", 
    },
    { 
      name: "Samsung", 
      logo: "https://cdn.simpleicons.org/samsung/1428A0", 
    },
    { 
      name: "LG", 
      logo: "https://cdn.simpleicons.org/lg/A50034", 
    },
    { 
      name: "Panasonic", 
      logo: "https://cdn.simpleicons.org/panasonic/0044BB", 
    },
    { 
      name: "OnePlus", 
      logo: "https://cdn.simpleicons.org/oneplus/F50000", 
    }
  ];

  return (
    <section id="brands" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Brands We Repair</h2>
          <p className="mt-4 text-lg text-slate-600">Specialized expert service for major global TV brands.</p>
        </div>

        {/* Standardized height for all logos to "make them look similar size" */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 items-center justify-items-center">
          {brands.map((brand) => (
            <div 
              key={brand.name} 
              className="flex items-center justify-center w-full h-16 group"
            >
              <img 
                src={brand.logo} 
                alt={`${brand.name} TV Repair`} 
                loading="lazy"
                className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
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