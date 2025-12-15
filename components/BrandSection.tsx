import React from 'react';

export const BrandSection: React.FC = () => {
  const brands = [
    { name: "Sony", color: "text-slate-800" },
    { name: "Samsung", color: "text-blue-700" },
    { name: "LG", color: "text-red-600" },
    { name: "Panasonic", color: "text-slate-700" },
    { name: "Xiaomi / Mi", color: "text-orange-500" },
    { name: "OnePlus", color: "text-red-500" }
  ];

  return (
    <section id="brands" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Brands We Repair</h2>
          <p className="mt-4 text-lg text-slate-600">Specialized service for all major LED, LCD, and Smart TV brands.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand) => (
            <div 
              key={brand.name} 
              className="flex items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow"
            >
              <span className={`text-xl font-bold ${brand.color}`}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};