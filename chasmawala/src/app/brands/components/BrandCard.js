// src/app/brands/_components/BrandCard.js
import Link from 'next/link';
import Image from 'next/image';

export default function BrandCard({ brand, isFeatured = false }) {
  if (isFeatured) {
    return (
      <Link href={`/collections/${brand.slug}`} className="group block">
        <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100 border transition hover:shadow-lg">
          {/* Using a simple div for background logos in featured cards might be better for styling */}
          <div className="flex h-full w-full items-center justify-center p-8">
             <Image
              src={brand.logoUrl}
              alt={`${brand.name} logo`}
              width={180}
              height={60}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-40 p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-white">{brand.name}</h3>
            <p className="text-sm text-gray-200">{brand.tagline}</p>
          </div>
        </div>
      </Link>
    );
  }

  // Default card for the main grid
  return (
    <Link href={`/collections/${brand.slug}`} className="group block">
      <div className="flex h-32 w-full items-center justify-center rounded-lg border bg-white p-4 transition duration-300 ease-in-out hover:shadow-md hover:border-blue-500">
        <Image
          src={brand.logoUrl}
          alt={`${brand.name} logo`}
          width={120}
          height={40}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </Link>
  );
}