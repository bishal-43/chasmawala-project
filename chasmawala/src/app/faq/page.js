// src/app/faq/page.js
import FAQAccordion from "./components/FAQAccordion";
import Link from "next/link";

export const metadata = {
  title: "Frequently Asked Questions | Chasmawala",
  description: "Find answers to common questions about ordering, shipping, returns, and our eyewear products at Chasmawala.",
};

// You can easily update your FAQs by editing this data structure.
const faqData = [
  {
    category: "Ordering & Payment",
    items: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards, UPI (including Google Pay, PhonePe, Paytm), Net Banking, and select mobile wallets. Cash on Delivery (COD) is also available for most pincodes.",
      },
      {
        question: "Can I use my prescription to order glasses?",
        answer: "Absolutely! You can upload a photo of your prescription on the product page, enter the details manually, or choose to send it to us later via WhatsApp or email.",
      },
      {
        question: "How do I know which frame size is right for me?",
        answer: "Each product page has a detailed size guide with frame width, lens height, and temple length. We also have a virtual try-on feature on select frames to help you see how they look.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        question: "How long will it take to receive my order?",
        answer: "Orders are typically dispatched within 24-48 hours. Delivery takes 3-5 business days for metro cities and 5-7 business days for other locations. Prescription glasses may take an additional 2 days for lens fitting.",
      },
      {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you will receive an email and SMS with a tracking link. You can use this link to follow your package's journey to your doorstep.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer: "We offer a 14-day no-questions-asked return policy for all our products. The item must be in its original condition with all accessories. To initiate a return, please visit the 'My Orders' section of your account.",
      },
      {
        question: "How do I exchange a product?",
        answer: "You can place an exchange request from the 'My Orders' section. Our team will arrange for the pickup of the original item and dispatch the new one upon successful quality check.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Have a question? We're here to help. Find the answers to our most
            common questions below.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="mt-16 space-y-12">
          {faqData.map((section) => (
            <div key={section.category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {section.category}
              </h2>
              <FAQAccordion items={section.items} />
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center bg-white border-2 border-dashed rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Still have questions?
          </h2>
          <p className="mt-2 text-gray-600">
            If you can't find the answer you're looking for, please don't
            hesitate to reach out to our support team.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-base font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}