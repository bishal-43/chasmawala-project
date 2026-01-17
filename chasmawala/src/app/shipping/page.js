// src/app/shipping/page.js
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Shipping Information | Chasmawala",
  description: "Learn about Chasmawala's Nepal shipping policies, delivery timelines, tracking, and courier partners.",
};

// --- Icon Components ---
const TruckIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 0 1 3.375-3.375h9.75a3.375 3.375 0 0 1 3.375 3.375v1.875M10.5 6h9M10.5 6a2.25 2.25 0 0 0-2.25 2.25v4.5a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-4.5a2.25 2.25 0 0 0-2.25-2.25H10.5Z" />
  </svg>
);
const MapPinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);
const ClockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export default function ShippingPage() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Shipping Information
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Get your new eyewear delivered to your doorstep, quickly and securely.
          </p>
        </div>

        {/* Highlights Section */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <TruckIcon className="w-10 h-10 mx-auto text-blue-600" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Free Shipping</h3>
            <p className="mt-1 text-gray-600">On all prepaid orders above ₹1199 across Nepal.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <MapPinIcon className="w-10 h-10 mx-auto text-blue-600" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Pan-Nepal Delivery</h3>
            <p className="mt-1 text-gray-600">We deliver to over 100s pincodes nationwide.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <ClockIcon className="w-10 h-10 mx-auto text-blue-600" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Fast Dispatch</h3>
            <p className="mt-1 text-gray-600">Orders are dispatched from our Janakpur warehouse within 24 hours.</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-20 space-y-12">
            
            {/* Delivery Timelines Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Dispatch & Delivery Timelines</h2>
                <p className="mt-2 text-gray-600">Our standard delivery times are estimated below. Business days exclude public holidays and Sundays.</p>
                <div className="mt-6 border rounded-lg bg-white overflow-hidden">
                    <div className="grid grid-cols-2 font-semibold bg-gray-100 p-4 border-b">
                        <span>Location</span>
                        <span className="text-right">Estimated Delivery Time</span>
                    </div>
                    <div className="grid grid-cols-2 p-4 border-b">
                        <span>Janakpur</span>
                        <span className="text-right">3 Business Days</span>
                    </div>
                    <div className="grid grid-cols-2 p-4 border-b">
                        <span>Metro Cities (Biratnagar, Kathmandu, Birgunj, etc.)</span>
                        <span className="text-right">3-5 Business Days</span>
                    </div>
                    <div className="grid grid-cols-2 p-4 border-b">
                        <span>Tier II & III Cities</span>
                        <span className="text-right">5-7 Business Days</span>
                    </div>
                    <div className="grid grid-cols-2 p-4">
                        <span>Rest of Nepal and Bihar</span>
                        <span className="text-right">7-10 Business Days</span>
                    </div>
                </div>
                <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-lg text-sm">
                    <strong>Please Note:</strong> Eyeglasses with prescription lenses are custom-made and may require an additional 2-3 business days for processing and fitting before dispatch.
                </div>
            </div>
            
            {/* Order Tracking */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">How to Track Your Order</h2>
                <p className="mt-2 text-gray-600">
                    Once your order is dispatched, you will receive an email and an SMS containing your tracking ID and a link to our courier partner's website. You can click the link to track your package's journey in real-time. You can also find the tracking information in the 'My Orders' section of your account.
                </p>
            </div>

            {/* Shipping Charges */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Shipping Charges</h2>
                <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                    <li><strong>Free Shipping:</strong> We offer free shipping on all prepaid orders of ₹1199 or more.</li>
                    <li><strong>Standard Charge:</strong> A flat fee of ₹50 is charged on all prepaid orders below ₹1199.</li>
                    <li><strong>Cash on Delivery (COD):</strong> An additional handling fee of ₹50 is applicable to all COD orders.</li>
                </ul>
            </div>
            
             {/* FAQ Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                <div className="mt-4 space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-800">Do you ship internationally?</h3>
                        <p className="text-gray-600">Currently, Chasmawala only ships within Nepal and Bihar.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">What if I'm not available at the time of delivery?</h3>
                        <p className="text-gray-600">Our courier partners will attempt delivery up to three times. If you are unavailable, they will contact you on your registered mobile number to reschedule.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}