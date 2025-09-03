// src/components/superadmin/UsersTableSkeleton.js

export function UsersTableSkeleton() {
  const SkeletonRow = () => (
    <tr>
      <td className="p-3 border-b border-gray-200"><div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div></td>
      <td className="p-3 border-b border-gray-200"><div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div></td>
      <td className="p-3 border-b border-gray-200"><div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div></td>
      <td className="p-3 border-b border-gray-200"><div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div></td>
    </tr>
  );

  return (
    <table className="w-full text-left">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Role</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
      </tbody>
    </table>
  );
}