
import * as React from "react";

export function Alert({ children, type = "info", className = "" }) {
  const base =
    "rounded-md px-3 py-2 text-sm flex items-start gap-2 border shadow-sm";
  const style =
    type === "error"
      ? "bg-red-50 text-red-800 border-red-100"
      : type === "success"
      ? "bg-green-50 text-green-800 border-green-100"
      : "bg-slate-50 text-slate-800 border-slate-100";

  return (
    <div role="status" className={`${base} ${style} ${className}`}>
      <div className="flex-1">{children}</div>
    </div>
  );
}
