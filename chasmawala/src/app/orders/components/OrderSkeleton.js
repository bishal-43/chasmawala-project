// src/app/orders/_components/OrderSkeleton.js

export default function OrderSkeleton() {
  return (
    <div className="bg-white border rounded-lg shadow-sm animate-pulse">
      <div className="bg-gray-50 p-5 flex justify-between border-b">
        <div className="w-1/3 h-10 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-10 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-10 bg-gray-200 rounded"></div>
      </div>
      <div className="p-5 space-y-4">
        <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
        <div className="flex items-center gap-4 py-4">
          <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
          <div className="flex-grow space-y-2">
            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-1/6 h-5 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-4 py-4">
          <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
          <div className="flex-grow space-y-2">
            <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-1/6 h-5 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}