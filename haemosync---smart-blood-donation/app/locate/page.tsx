'use client';

import { useState } from 'react';
import { MapPin, Search, Navigation, Phone } from 'lucide-react';

const mockDonors = [
  { id: 1, name: 'Alex M.', bloodGroup: 'O-', distance: '1.2 km', status: 'Available', phone: '+1 555-0101' },
  { id: 2, name: 'Sarah K.', bloodGroup: 'A+', distance: '2.5 km', status: 'Available', phone: '+1 555-0102' },
  { id: 3, name: 'David L.', bloodGroup: 'B+', distance: '3.1 km', status: 'Unavailable', phone: '+1 555-0103' },
  { id: 4, name: 'Emily R.', bloodGroup: 'AB-', distance: '4.0 km', status: 'Available', phone: '+1 555-0104' },
];

export default function LocatePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');

  const filteredDonors = mockDonors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) || donor.distance.includes(searchQuery);
    const matchesGroup = selectedGroup === 'All' || donor.bloodGroup === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Locate Donors</h1>
        <p className="mt-2 text-slate-600">Find nearby eligible blood donors in real-time.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar / Search */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-900">Search Filters</h3>
            
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by location or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Blood Group</label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                >
                  <option value="All">All Groups</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 font-semibold text-white transition-colors hover:bg-slate-800">
                <Navigation className="h-4 w-4" />
                Use My Location
              </button>
            </div>
          </div>

          {/* Donor List */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-900">Nearby Donors ({filteredDonors.length})</h3>
            <div className="space-y-4">
              {filteredDonors.map((donor) => (
                <div key={donor.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                      donor.status === 'Available' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {donor.bloodGroup}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{donor.name}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3 w-3" />
                        {donor.distance}
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={donor.status !== 'Available'}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      donor.status === 'Available' ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                    title={donor.status === 'Available' ? 'Contact Donor' : 'Unavailable'}
                  >
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {filteredDonors.length === 0 && (
                <p className="text-center text-sm text-slate-500">No donors found matching criteria.</p>
              )}
            </div>
          </div>
        </div>

        {/* Map View (Placeholder) */}
        <div className="lg:col-span-2">
          <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/1200/800?blur=2')] bg-cover bg-center opacity-50 mix-blend-multiply" />
            
            {/* Map Overlay UI */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                <MapPin className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">Interactive Map View</h3>
              <p className="max-w-md text-slate-600">
                In a production environment, this area would display a live Google Map showing real-time locations of donors and hospitals within your radius.
              </p>
              <div className="mt-8 flex gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-rose-600" /> Donor
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-blue-600" /> Hospital
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
