// src/app/returns/page.js
import Link from "next/link";

export const metadata = {
  title: "Returns Policy | Chasmawala",
  description: "Read our hassle-free returns and exchange policy. We offer a 14-day easy return window with free pickup and quick refunds.",
};

// --- Icon Components ---
const CalendarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18" />
  </svg>
);

const TruckIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 0 1 3.375-3.375h9.75a3.375 3.375 0 0 1 3.375 3.375v1.875M10.5 6h9M10.5 6a2.25 2.25 0 0 0-2.25 2.25v4.5a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-4.5a2.25 2.25 0 0 0-2.25-2.25H10.5Z" />
  </svg>
);

const WalletIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z" />
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export default function ReturnsPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hassle-Free Returns & Exchanges
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Your satisfaction is our priority. If you're not completely happy with your purchase, we're here to help.
          </p>
        </div>

        {/* Highlights Section */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
          <div className="p-6 bg-gray-50 rounded-lg">
            <CalendarIcon className="w-10 h-10 mx-auto text-blue-600" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">14-Day Easy Returns</h3>
            <p className="mt-1 text-gray-600">Return any item within 14 days of delivery.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <TruckIcon className="w-10 h-10 mx-auto text-blue-600" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Free Reverse Pickup</h3>
            <p className="mt-1 text-gray-600">We'll pick up your return from your doorstep, free of charge.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <WalletIcon className="w-10 h-10 mx-auto text-blue-600" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Quick Refunds</h3>
            <p className="mt-1 text-gray-600">Get your refund processed within 48 hours of pickup.</p>
          </div>
        </div>

        {/* Policy Details Section */}
        <div className="mt-20 space-y-16">
          {/* Eligibility Section */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-center text-gray-900">
              Eligibility for Returns
            </h2>
            <p className="mt-2 text-center text-gray-600">
              For a successful return, please ensure your items meet these conditions.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-6">
                <CheckCircleIcon className="h-7 w-7 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Original Condition</h3>
                  <p className="mt-1 text-gray-600">Item must be unused, unwashed, and unaltered.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-6">
                <CheckCircleIcon className="h-7 w-7 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Full Packaging</h3>
                  <p className="mt-1 text-gray-600">Include the original case, cloth, and all accessories.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-6">
                <CheckCircleIcon className="h-7 w-7 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Intact Tags</h3>
                  <p className="mt-1 text-gray-600">All original tags and labels must be attached.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Process Section */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-center text-gray-900">
              Our Easy 4-Step Return Process
            </h2>
            <div className="mt-10 max-w-2xl mx-auto space-y-8">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Log in & Find Your Order</h3>
                  <p className="mt-1 text-gray-600">Go to the "My Orders" section of your account.</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Initiate Return</h3>
                  <p className="mt-1 text-gray-600">Select the item you wish to return and click "Return/Exchange".</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Select Reason</h3>
                  <p className="mt-1 text-gray-600">Choose a reason and confirm if you want a refund or exchange.</p>
                </div>
              </div>
              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">4</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Schedule Pickup</h3>
                  <p className="mt-1 text-gray-600">Confirm your address for our free reverse pickup service.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Refunds & Final CTA */}
          <div className="space-y-8 pt-8 border-t">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Refunds & Exchanges</h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600">
                Once your return is inspected, refunds are credited to your original payment method within 5-7 business days. For exchanges, your new product will be dispatched within 48 hours.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900">Need Help?</h3>
              <p className="mt-2 text-gray-600">
                If you have any questions, please feel free to{" "}
                <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                  contact our support team
                </Link>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}