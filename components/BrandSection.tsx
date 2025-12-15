import React from 'react';

export const BrandSection: React.FC = () => {
  const brands = [
    { 
      name: "Sony", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Sony_logo.svg/500px-Sony_logo.svg.png",
      heightClass: "h-6 md:h-8" 
    },
    { 
      name: "Samsung", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/500px-Samsung_Logo.svg.png",
      heightClass: "h-8 md:h-10" 
    },
    { 
      name: "LG", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/500px-LG_logo_%282015%29.svg.png",
      heightClass: "h-10 md:h-12" 
    },
    { 
      name: "Panasonic", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Panasonic_logo_%28Blue%29.svg/500px-Panasonic_logo_%28Blue%29.svg.png",
      heightClass: "h-6 md:h-8" 
    },
    { 
      name: "OnePlus", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/OnePlus_logo_2020.svg/500px-OnePlus_logo_2020.svg.png",
      heightClass: "h-6 md:h-8" 
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
                className={`w-auto max-w-[80%] object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter grayscale group-hover:grayscale-0 ${brand.heightClass}`}
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