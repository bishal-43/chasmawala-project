// src/app/brands/page.js
import BrandCard from "./components/BrandCard";

export const metadata = {
  title: "Shop By Brand | Chasmawala",
  description: "Explore our exclusive collection of eyewear from top international and Indian brands like Ray-Ban, Oakley, John Jacobs, and more.",
};

// --- MOCK DATA ---
// In a real application, you might fetch this from an API or CMS.
const brandsData = [
  { name: 'Ray-Ban', slug: 'ray-ban', logoUrl: '/logos/ray-ban-logo.svg', tagline: 'Timeless style & authenticity.', isFeatured: true },
  { name: 'Oakley', slug: 'oakley', logoUrl: '/logos/oakley-logo.svg', tagline: 'Performance and innovation.', isFeatured: true },
  { name: 'John Jacobs', slug: 'john-jacobs', logoUrl: '/logos/john-jacobs-logo.svg', tagline: 'Trendy, high-quality eyewear.', isFeatured: true },
  { name: 'Vogue Eyewear', slug: 'vogue', logoUrl: '/logos/vogue-eyewear-logo.svg', tagline: 'Fashion-forward frames.' },
  { name: 'Carrera', slug: 'carrera', logoUrl: '/logos/carrera-logo.svg', tagline: 'Racing-inspired designs.' },
  { name: 'Fastrack', slug: 'fastrack', logoUrl: '/logos/fastrack-logo.svg', tagline: 'Youthful and affordable.' },
  { name: 'Lenskart Air', slug: 'lenskart-air', logoUrl: '/logos/lenskart-air-logo.svg', tagline: 'Ultra-lightweight comfort.' },
  { name: 'Vincent Chase', slug: 'vincent-chase', logoUrl: '/logos/vincent-chase-logo.svg', tagline: 'Contemporary & stylish.' },
  { name: 'Polaroid', slug: 'polaroid', logoUrl: '/logos/polaroid-logo.svg', tagline: 'Pioneers of polarized lenses.' },
];

export default function BrandsPage() {
  const featuredBrands = brandsData.filter(b => b.isFeatured);
  const otherBrands = brandsData.filter(b => !b.isFeatured).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="bg-white">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Shop by Brand
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Discover our curated collection from the world's leading eyewear brands.
          </p>
        </div>

        {/* Featured Brands Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800">Featured Brands</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBrands.map(brand => (
              <BrandCard key={brand.slug} brand={brand} isFeatured />
            ))}
          </div>
        </div>

        {/* All Brands Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-gray-800">All Brands</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {otherBrands.map(brand => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}