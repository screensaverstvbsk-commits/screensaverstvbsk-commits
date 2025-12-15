import React from 'react';

export const BrandSection: React.FC = () => {
  // Using SimpleIcons CDN which is highly reliable for brand logos
  // Color code 334155 matches slate-700 for a professional neutral look
  const iconColor = "334155";
  
  const brands = [
    { 
      name: "Sony", 
      logo: `https://cdn.simpleicons.org/sony/${iconColor}`,
      className: "h-8 md:h-10" 
    },
    { 
      name: "Samsung", 
      logo: `https://cdn.simpleicons.org/samsung/${iconColor}`,
      className: "h-8 md:h-10" 
    },
    { 
      name: "LG", 
      logo: `https://cdn.simpleicons.org/lg/${iconColor}`,
      className: "h-10 md:h-12" 
    },
    { 
      name: "Panasonic", 
      logo: `https://cdn.simpleicons.org/panasonic/${iconColor}`,
      className: "h-8 md:h-10" 
    },
    { 
      name: "OnePlus", 
      logo: `https://cdn.simpleicons.org/oneplus/${iconColor}`,
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
              className="flex items-center justify-center w-full h-32 p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 hover:bg-white transition-all duration-300 group"
            >
              <img 
                src={brand.logo} 
                alt={`${brand.name} TV Repair`} 
                loading="lazy"
                width={100}
                height={50}
                className={`w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-110 ${brand.className}`}
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