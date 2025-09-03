import { Users, Trash2 } from "lucide-react";

export const AdminList = ({ admins, onDelete }) => {
  if (admins.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border">
        <Users className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-2 text-lg font-medium text-slate-900">No Admins Found</h3>
        <p className="mt-1 text-sm text-slate-500">
          Get started by adding a new administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <ul className="divide-y divide-slate-200">
        {admins.map((admin) => (
          <li key={admin._id} className="flex items-center justify-between p-4 hover:bg-slate-50">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                 <span className="text-slate-600 font-medium">{admin.name.charAt(0)}</span>
              </div>
              <div className="ml-4">
                <div className="font-medium text-slate-900">{admin.name}</div>
                <div className="text-sm text-slate-500">{admin.email}</div>
              </div>
            </div>
            <button
              onClick={() => onDelete(admin._id)}
              className="p-2 rounded-md text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors"
              aria-label={`Delete ${admin.name}`}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};