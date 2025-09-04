import { Suspense } from "react";
import OrderSuccessContent from "./OrderSuccessContent";

export default function OrderSuccessPage() {
  
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
