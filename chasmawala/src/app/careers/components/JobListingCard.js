// src/app/careers/_components/JobListingCard.js

import Link from 'next/link';

export default function JobListingCard({ job }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
          <Link href={`/careers/${job.id}`}>{job.title}</Link>
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
          <span>{job.department}</span>
          <span className="hidden sm:inline">·</span>
          <span>{job.location}</span>
          <span className="hidden sm:inline">·</span>
          <span>{job.type}</span>
        </div>
      </div>
      <Link
        href={`/careers/${job.id}`}
        className="flex-shrink-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
      >
        Apply Now
      </Link>
    </div>
  );
}