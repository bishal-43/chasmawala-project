// src/app/about/page.js
import Image from 'next/image';
import Link from 'next/link';

// This is a Server Component, so we can export metadata.
export const metadata = {
  title: "Our Story | Chasmawala",
  description: "Learn about Chasmawala’s journey from a small Pune shop to a leading online eyewear brand, and our commitment to quality and affordability.",
};

// --- Icon Components for the Values Section ---
const EyeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.43-4.43a1.012 1.012 0 0 1 1.413 1.414L3.45 11h17.1a1 1 0 0 1 0 2H3.449l3.431 3.431a1.012 1.012 0 1 1-1.413 1.414l-4.43-4.43Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m15 12-3-3-3 3" />
  </svg>
);
// Replace other icons similarly...

const AboutPage = () => {
  const timelineEvents = [
    { year: '2024', title: 'The Spark', description: 'Our founder, Sharban Sah, opens a small eyewear shop in Janakpur with a vision to provide affordable, stylish glasses to the local community.' },
    { year: '2025', title: 'Going Digital', description: 'Chasmawala.com is launched, bringing our curated collection of frames to customers all across Madhesh Province of Nepal and Bihar of India.' },
    
    { year: 'Today', title: 'Looking Ahead', description: 'Continuously innovating with new styles, lens technologies, and a commitment to making you see and feel great.' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-80">
        <Image
          src="/images/eyewear-workshop.jpg" // Replace with a relevant, high-quality image
          alt="Chasmawala workshop"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Story</h1>
          <p className="mt-4 max-w-2xl text-lg">A clear vision for quality eyewear in Nepal.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Our Journey Section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">From Janakpur, with a Vision</h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Chasmawala started not in a boardroom, but in a small, bustling shop in the heart of Janakpur. Our founder saw a simple problem: quality, fashionable eyewear was too expensive for most people.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Driven by a passion for craftsmanship and a commitment to honest pricing, we set out to change that. We began by building relationships with the best manufacturers, cutting out the middlemen, and passing those savings directly to you.
            </p>
          </div>
          <div className="h-80 w-full">
             <Image
              src="/images/janakpur-storefront.jpg" // Replace with an image of your storefront or team
              alt="Chasmawala Janakpur store"
              width={500}
              height={400}
              className="rounded-lg object-cover w-full h-full shadow-lg"
            />
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-24">
            <h2 className="text-3xl font-bold text-center text-gray-900">Our Journey So Far</h2>
            <div className="mt-12 max-w-3xl mx-auto space-y-8 border-l-2 border-gray-200 pl-8">
                {timelineEvents.map((event) => (
                    <div key={event.year} className="relative">
                        <div className="absolute -left-10 h-4 w-4 rounded-full bg-blue-600 mt-1"></div>
                        <p className="font-semibold text-blue-600">{event.year}</p>
                        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                        <p className="mt-1 text-gray-600">{event.description}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Our Mission Section */}
        <div className="mt-24 bg-blue-600 text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-blue-100">
                To make high-quality, fashionable eyewear accessible to everyone in Nepal, empowering them to express their unique style without compromising on quality or budget.
            </p>
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Ready to See the Difference?</h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-gray-600">
                Explore our latest collection and find the perfect pair that tells your story.
            </p>
            <div className="mt-8">
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                  Shop Now
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;