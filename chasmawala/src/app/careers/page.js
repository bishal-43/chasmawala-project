// src/app/careers/page.js
"use client";
import { useState } from 'react';
import Link from 'next/link';
import JobListingCard from './components/JobListingCard';

/*export const metadata = {
  title: "Careers at Chasmawala",
  description: "Join our mission-driven team at Chasmawala. Explore exciting career opportunities in technology, marketing, retail, and more in Pune.",
};*/

// --- MOCK DATA ---
// In a real application, you would fetch this from an API or CMS.
const jobOpenings = [
  
  { id: 1, title: 'Customer Support Executive', department: 'Operations', location: 'Janakpur, Madhesh Pradesh', type: 'Full-time' },
];

const companyValues = [
  { title: 'Customer First', description: 'We are obsessed with providing the best experience to our customers.' },
  { title: 'Innovate Fearlessly', description: 'We challenge the status quo and are not afraid to try new things.' },
  { title: 'Own It, Together', description: 'We take ownership and collaborate to achieve our common goals.' },
];

const employeePerks = [
  { title: 'Comprehensive Health Insurance' },
  { title: 'Flexible Work Hours' },
  { title: 'Generous Leave Policy' },
  { title: 'Team Outings & Events' },
  { title: 'Professional Development' },
  { title: 'Free Eyewear!' },
];

export default function CareersPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const departments = ['All', ...new Set(jobOpenings.map(job => job.department))];

  const filteredJobs = activeFilter === 'All'
    ? jobOpenings
    : jobOpenings.filter(job => job.department === activeFilter);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="text-center bg-white py-16 sm:py-24 px-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Help Us Build the Future of Eyewear
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          We're a passionate team dedicated to making high-quality, stylish eyewear accessible to everyone in India.
        </p>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Company Values Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Work With Us?</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {companyValues.map(value => (
              <div key={value.title} className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Perks & Benefits Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Perks & Benefits</h2>
          <div className="mt-10 max-w-3xl mx-auto grid grid-cols-2 gap-6 text-left">
            {employeePerks.map(perk => (
              <div key={perk.title} className="flex items-center gap-3">
                <span className="text-blue-600">✔</span>
                <p className="text-gray-700">{perk.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900">Open Positions</h2>
          {/* Filter Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {departments.map(department => (
              <button
                key={department}
                onClick={() => setActiveFilter(department)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                  activeFilter === department
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {department}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="mt-10 space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => <JobListingCard key={job.id} job={job} />)
            ) : (
              <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600">No open positions in this department right now. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Spontaneous Application CTA */}
        <div className="mt-20 text-center bg-white p-8 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Don't see a role for you?</h3>
          <p className="mt-2 text-gray-600">
            We're always looking for talented people. Send your resume to{' '}
            <a href="mailto:careers@chasmawala.com" className="font-medium text-blue-600 hover:underline">
              careers@chasmawala.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}