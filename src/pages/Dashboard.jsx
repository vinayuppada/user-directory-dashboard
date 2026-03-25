import { useState, useMemo } from 'react';
import { useUsers } from '../hooks/useUsers';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';

export default function Dashboard() {
  const { users, loading, error } = useUsers();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  function handleSort(field) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = q
      ? users.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
        )
      : [...users];

    result.sort((a, b) => {
      const aVal = sortField === 'company' ? a.company.name : a.name;
      const bVal = sortField === 'company' ? b.company.name : b.name;
      const cmp = aVal.localeCompare(bVal);
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [users, search, sortField, sortDir]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Directory</h1>
        <p className="mt-1 text-gray-500 text-sm">
          Browse, search, and sort all registered users.
        </p>
      </div>

      {/* Stats + Search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 flex items-center gap-2">
            <span className="text-blue-600 font-bold text-xl">{filtered.length}</span>
            <span className="text-blue-700 text-sm font-medium">
              {filtered.length === 1 ? 'user' : 'users'}{' '}
              {search ? 'found' : 'total'}
            </span>
          </div>
          {search && (
            <span className="text-sm text-gray-400">
              Showing results for &quot;{search}&quot;
            </span>
          )}
        </div>
        <div className="w-full sm:w-80">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">Loading users...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">Failed to load users</p>
            <p className="text-gray-400 text-sm mt-1">{error}</p>
          </div>
        </div>
      ) : (
        <UserTable
          users={filtered}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
        />
      )}
    </div>
  );
}
