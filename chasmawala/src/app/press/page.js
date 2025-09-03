// src/app/press/page.js

import Link from "next/link";
import PressArticleCard from "./components/PressArticleCard";

export const metadata = {
  title: "Chasmawala in the Press",
  description: "Read the latest news, articles, and media features about Chasmawala's journey and innovative eyewear.",
};

// --- MOCK DATA ---
// In a real application, you might fetch this data from a CMS or database.
const pressArticles = [
  {
    id: 1,
    publication: "The Times of India",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/The_Times_of_India_logo.svg/2560px-The_Times_of_India_logo.svg.png",
    title: "Chasmawala: The Pune Startup Changing How India Sees Eyewear",
    excerpt: "From a small shop in Pune to a nationwide phenomenon, Chasmawala is revolutionizing the eyewear industry with its blend of style and affordability.",
    link: "#", // Replace with actual article link
    date: "August 28, 2025",
  },
  {
    id: 2,
    publication: "YourStory",
    logoUrl: "https://images.yourstory.com/assets/images/logo-dark.svg",
    title: "How Chasmawala Bootstrapped its Way to a 100 Crore Business",
    excerpt: "The founders share their incredible journey of building a direct-to-consumer eyewear brand that's capturing the hearts of millions.",
    link: "#",
    date: "July 15, 2025",
  },
  {
    id: 3,
    publication: "The Economic Times",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/The_Economic_Times_logo.svg/2560px-The_Economic_Times_logo.svg.png",
    title: "Vision for the Future: Chasmawala Secures Series A Funding",
    excerpt: "The eyewear startup has raised $15 million to expand its manufacturing capabilities and open 50 new retail stores across India.",
    link: "#",
    date: "June 05, 2025",
  },
];

export default function PressPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Chasmawala in the Press
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            We're making headlines! See what the media is saying about our mission
            to provide stylish, high-quality eyewear for everyone.
          </p>
        </div>

        {/* Press Articles Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pressArticles.map((article) => (
            <PressArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Media Resources Section */}
        <div className="mt-20 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            For Media Inquiries
          </h2>
          <p className="mt-2 text-gray-600">
            Are you a member of the press? We'd love to chat.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Contact Us
            </Link>
            <Link
              href="/press-kit.zip"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Download Press Kit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}