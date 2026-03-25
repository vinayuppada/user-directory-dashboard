import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function InfoCard({ icon, title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
          {icon}
        </div>
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function DetailRow({ label, value, link }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide sm:w-28 flex-shrink-0 pt-0.5">
        {label}
      </span>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">
          {value}
        </a>
      ) : (
        <span className="text-sm text-gray-700 break-all">{value}</span>
      )}
    </div>
  );
}

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading user...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-red-500 font-medium mb-3">{error || 'User not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:underline text-sm"
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  const avatarColors = [
    'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500',
    'bg-rose-500', 'bg-orange-500', 'bg-amber-500', 'bg-teal-500',
    'bg-cyan-500', 'bg-green-500',
  ];
  const avatarColor = avatarColors[user.name.charCodeAt(0) % avatarColors.length];
  const initials = user.name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-800 font-medium">{user.name}</span>
      </nav>

      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className={`w-20 h-20 rounded-2xl ${avatarColor} flex items-center justify-center text-white text-2xl font-bold shadow-md flex-shrink-0`}>
            {initials}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 text-sm mt-0.5">@{user.username}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <a
                href={`mailto:${user.email}`}
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {user.email}
              </a>
              <span className="text-gray-300">|</span>
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                {user.website}
              </a>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact */}
        <InfoCard
          title="Contact Information"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
        >
          <DetailRow label="Phone" value={user.phone} />
          <DetailRow label="Email" value={user.email} link={`mailto:${user.email}`} />
          <DetailRow label="Website" value={user.website} link={`https://${user.website}`} />
          <DetailRow label="Username" value={`@${user.username}`} />
        </InfoCard>

        {/* Address */}
        <InfoCard
          title="Address"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        >
          <DetailRow label="Street" value={`${user.address.street}, ${user.address.suite}`} />
          <DetailRow label="City" value={user.address.city} />
          <DetailRow label="Zipcode" value={user.address.zipcode} />
          <DetailRow
            label="Geo"
            value={`${user.address.geo.lat}, ${user.address.geo.lng}`}
            link={`https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}`}
          />
        </InfoCard>

        {/* Company */}
        <InfoCard
          title="Company"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        >
          <DetailRow label="Name" value={user.company.name} />
          <DetailRow label="Catch Phrase" value={user.company.catchPhrase} />
          <DetailRow label="Business" value={user.company.bs} />
        </InfoCard>

        {/* User ID Card */}
        <InfoCard
          title="Account Details"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          }
        >
          <DetailRow label="User ID" value={`#${user.id}`} />
          <DetailRow label="Full Name" value={user.name} />
          <DetailRow label="Username" value={user.username} />
          <DetailRow label="Email" value={user.email} />
        </InfoCard>
      </div>
    </div>
  );
}
