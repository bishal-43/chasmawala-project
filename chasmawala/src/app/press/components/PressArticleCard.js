// src/app/press/components/PressArticleCard.js

import Link from "next/link";

export default function PressArticleCard({ article }) {
  return (
    <Link
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
    >
      <div className="flex-shrink-0 bg-white h-24 flex items-center justify-center p-4 border-b">
        <img
          className="max-h-12 w-auto object-contain"
          src={article.logoUrl}
          alt={`${article.publication} logo`}
        />
      </div>
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
            {article.title}
          </h3>
          <p className="mt-3 text-base text-gray-500 line-clamp-3">
            {article.excerpt}
          </p>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-500">{article.date}</p>
        </div>
      </div>
    </Link>
  );
}