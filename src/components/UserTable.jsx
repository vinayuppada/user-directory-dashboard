import { useNavigate } from 'react-router-dom';
import SortButton from './SortButton';

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const colors = [
    'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500',
    'bg-rose-500', 'bg-orange-500', 'bg-amber-500', 'bg-teal-500',
    'bg-cyan-500', 'bg-green-500',
  ];
  const color = colors[name.charCodeAt(0) % colors.length];

  return (
    <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
      {initials}
    </div>
  );
}

export default function UserTable({ users, sortField, sortDir, onSort }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3.5 text-left">
              <SortButton label="Name" field="name" sortField={sortField} sortDir={sortDir} onSort={onSort} />
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3.5 text-left">
              <SortButton label="Company" field="company" sortField={sortField} sortDir={sortDir} onSort={onSort} />
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Website
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">No users found</span>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className="hover:bg-blue-50 cursor-pointer transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={user.name} />
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400">@{user.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <a
                    href={`mailto:${user.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {user.email}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.phone}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium">
                    {user.company.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                  >
                    {user.website}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
