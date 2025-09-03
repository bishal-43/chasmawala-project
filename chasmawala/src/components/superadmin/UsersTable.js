// src/components/superadmin/UsersTable.js

const roleStyles = {
  user: "bg-blue-100 text-blue-700",
  admin: "bg-green-100 text-green-700",
  superadmin: "bg-purple-100 text-purple-700",
  default: "bg-gray-100 text-gray-600",
};

const UserRoleBadge = ({ role }) => {
  const style = roleStyles[role] || roleStyles.default;
  return (
    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full capitalize ${style}`}>
      {role}
    </span>
  );
};

export function UsersTable({ users, onDeleteClick }) {
  if (users.length === 0) {
    return <p className="text-gray-500">No Users found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 font-semibold">Name</th>
            <th className="p-3 font-semibold">Email</th>
            <th className="p-3 font-semibold">Role</th>
            <th className="p-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="p-3 border-b border-gray-200">{user.name}</td>
              <td className="p-3 border-b border-gray-200">{user.email}</td>
              <td className="p-3 border-b border-gray-200"><UserRoleBadge role={user.role} /></td>
              <td className="p-3 border-b border-gray-200">
                <button
                  onClick={() => onDeleteClick(user._id)}
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}