'use client';

import { User, Droplet, Calendar, MapPin, CheckCircle2, Award, AlertCircle } from 'lucide-react';
import { addDays, format, isPast } from 'date-fns';

export default function ProfilePage() {
  // Mock user data - using a recent date to demonstrate the eligibility logic
  const recentDonationDate = new Date();
  recentDonationDate.setDate(recentDonationDate.getDate() - 45); // 45 days ago
  const formattedLastDonation = format(recentDonationDate, 'yyyy-MM-dd');

  const user = {
    name: 'John Doe',
    bloodGroup: 'O+',
    lastDonation: formattedLastDonation,
    totalDonations: 4,
    location: 'Downtown, City Center',
    phone: '+91 8787675634',
    email: 'john.doe@example.com',
  };

  // Calculate Eligibility
  const lastDonationDateObj = new Date(user.lastDonation);
  const nextEligibleDate = addDays(lastDonationDateObj, 90);
  const isEligibleNow = isPast(nextEligibleDate);
  const formattedNextEligibleDate = format(nextEligibleDate, 'MMM dd, yyyy');
  const displayLastDonation = format(lastDonationDateObj, 'MMM dd, yyyy');

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-2 text-slate-600">Manage your donor profile and view your donation history.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Sidebar / Quick Info */}
        <div className="space-y-6 md:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
              <User className="h-12 w-12 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-sm text-slate-500">{user.email}</p>
            <div className="mt-6 flex justify-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                <Droplet className="h-4 w-4 fill-rose-600" />
                {user.bloodGroup}
              </span>
              {isEligibleNow ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Eligible
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                  <AlertCircle className="h-4 w-4" />
                  Wait Period
                </span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-900">Contact Info</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-slate-400" />
                <span>{user.phone}</span>
              </div>
            </div>
            <button className="mt-6 w-full rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Donations</p>
                  <p className="text-2xl font-bold text-slate-900">{user.totalDonations}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Last Donation</p>
                  <p className="text-lg font-bold text-slate-900">{displayLastDonation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Health Screening Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Health Screening Summary</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm sm:grid-cols-3">
              <div>
                <p className="text-slate-500">Age</p>
                <p className="font-medium text-slate-900">28 Years</p>
              </div>
              <div>
                <p className="text-slate-500">BMI</p>
                <p className="font-medium text-slate-900">22.4 (Healthy)</p>
              </div>
              <div>
                <p className="text-slate-500">HIV Status</p>
                <p className="font-medium text-slate-900">Negative</p>
              </div>
              <div>
                <p className="text-slate-500">Weight</p>
                <p className="font-medium text-slate-900">72 kg</p>
              </div>
              <div>
                <p className="text-slate-500">Height</p>
                <p className="font-medium text-slate-900">178 cm</p>
              </div>
              <div>
                <p className="text-slate-500">Next Eligible Date</p>
                {isEligibleNow ? (
                  <p className="font-medium text-emerald-600">Available Now</p>
                ) : (
                  <p className="font-medium text-amber-600">{formattedNextEligibleDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Donation History */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Donation History</h3>
            <div className="space-y-4">
              {[
                { date: 'Oct 15, 2023', location: 'City General Hospital', units: 1 },
                { date: 'Feb 20, 2023', location: 'Metro Care Center', units: 1 },
                { date: 'Aug 10, 2022', location: 'Blood Drive Camp', units: 1 },
              ].map((donation, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                      <Droplet className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{donation.location}</p>
                      <p className="text-sm text-slate-500">{donation.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{donation.units} Unit</p>
                    <p className="text-xs text-emerald-600">Successful</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
