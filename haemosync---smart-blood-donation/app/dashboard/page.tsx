'use client';

import { Droplet, TrendingUp, Users, AlertTriangle, Building2, PhoneCall, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const bloodStockData = [
  { name: 'A+', stock: 45 },
  { name: 'A-', stock: 12 },
  { name: 'B+', stock: 56 },
  { name: 'B-', stock: 8 },
  { name: 'AB+', stock: 23 },
  { name: 'AB-', stock: 4 },
  { name: 'O+', stock: 67 },
  { name: 'O-', stock: 15 },
];

const recentRequests = [
  { id: 1, hospital: 'City General Hospital', bloodGroup: 'O-', units: 3, urgency: 'Critical', time: '10 mins ago' },
  { id: 2, hospital: 'Metro Care Center', bloodGroup: 'B+', units: 2, urgency: 'High', time: '1 hour ago' },
  { id: 3, hospital: 'Sunrise Clinic', bloodGroup: 'A+', units: 1, urgency: 'Medium', time: '3 hours ago' },
];

const institutionalStock = [
  { 
    id: 1, 
    name: 'City General Hospital', 
    type: 'Hospital', 
    location: 'Downtown District', 
    contact: '+91 96555-0199',
    stock: { 'A+': 15, 'A-': 2, 'B+': 20, 'O+': 25, 'O-': 4 } 
  },
  { 
    id: 2, 
    name: 'Red Cross Blood Bank', 
    type: 'Blood Bank', 
    location: 'Westside Medical Park', 
    contact: '+91 9586986588',
    stock: { 'A+': 25, 'A-': 8, 'B+': 30, 'AB+': 12, 'O+': 45, 'O-': 10 } 
  },
  { 
    id: 3, 
    name: 'Metro Care Center', 
    type: 'Hospital', 
    location: 'North District', 
    contact: '+91 6736 8989',
    stock: { 'B+': 6, 'B-': 2, 'AB-': 1, 'O+': 18 } 
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600">Real-time overview of blood inventory and requests.</p>
        </div>
        <button className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700">
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Donors</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">1,248</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-600">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>+12% this month</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Units Available</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">230</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <Droplet className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-600">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>+5% this week</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Requests</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">14</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-amber-600">
            <span>3 Critical</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 mb-8">
        {/* Inventory Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-6 text-lg font-semibold text-slate-900">Live Blood Stock Inventory</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bloodStockData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="stock" fill="#e11d48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-slate-900">Emergency Requests</h3>
          <div className="space-y-4">
            {recentRequests.map((req) => (
              <div key={req.id} className="flex items-start justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md px-2 py-1 text-xs font-bold ${
                      req.urgency === 'Critical' ? 'bg-red-100 text-red-700' :
                      req.urgency === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {req.bloodGroup}
                    </span>
                    <span className="text-sm font-medium text-slate-900">{req.units} Units</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-700">{req.hospital}</p>
                  <p className="text-xs text-slate-500">{req.time}</p>
                </div>
                <button className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                  Match
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Institutional Inventory Grid */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Hospital & Blood Bank Directory</h3>
          <p className="text-sm text-slate-500">Live stock data connected to the network</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {institutionalStock.map((inst) => (
            <div key={inst.id} className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-5 transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-slate-400" />
                    <h4 className="font-semibold text-slate-900">{inst.name}</h4>
                  </div>
                  <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    inst.type === 'Hospital' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {inst.type}
                  </span>
                </div>
              </div>
              
              <div className="mb-4 space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>{inst.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-slate-400" />
                  <span>{inst.contact}</span>
                </div>
              </div>

              <div className="mt-auto border-t border-slate-200 pt-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">Available Stock</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(inst.stock).map(([group, units]) => (
                    <div key={group} className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs shadow-sm">
                      <span className="font-bold text-rose-600">{group}</span>
                      <span className="text-slate-500">{units}u</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="mt-5 w-full rounded-lg bg-slate-900 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800">
                Contact Facility
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
