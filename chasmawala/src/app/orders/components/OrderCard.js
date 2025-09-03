// src/app/orders/_components/OrderCard.js

const STATUS_STYLES = {
  Processing: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

export default function OrderCard({ order }) {
  const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.default;
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="bg-gray-50 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-2 border-b">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Order ID</p>
          <p className="font-mono text-sm text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
        </div>
        <div className="space-y-1 text-left sm:text-right">
          <p className="text-sm font-medium text-gray-500">Date Placed</p>
          <p className="text-sm text-gray-900">{orderDate}</p>
        </div>
        <div className="space-y-1 text-left sm:text-right">
          <p className="text-sm font-medium text-gray-500">Total Amount</p>
          <p className="text-lg font-semibold text-gray-900">₹{order.totalAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Card Body - Items */}
      <div className="p-4 sm:p-5">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusStyle}`}>
          {order.status}
        </span>
        <ul className="mt-4 divide-y divide-gray-200">
          {order.items.map((item) => (
            <li key={item.productId || item._id} className="py-4 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
              <div className="flex-grow">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}