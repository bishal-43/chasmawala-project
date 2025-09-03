// src/components/superadmin/AdminListSkeleton.js

export const AdminListSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border">
    <ul className="divide-y divide-slate-200">
      {[...Array(3)].map((_, i) => (
        <li key={i} className="flex items-center justify-between p-4">
          <div className="flex items-center w-full">
            <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse"></div>
            <div className="ml-4 flex-1">
              <div className="h-4 w-1/4 rounded bg-slate-200 animate-pulse"></div>
              <div className="mt-2 h-3 w-2/5 rounded bg-slate-200 animate-pulse"></div>
            </div>
          </div>
          <div className="h-8 w-8 rounded-md bg-slate-200 animate-pulse"></div>
        </li>
      ))}
    </ul>
  </div>
);