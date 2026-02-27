import Link from 'next/link';
import { ArrowRight, Droplet, HeartPulse, MapPin, ShieldCheck, Car, Network, Lock, Shield, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-rose-50 to-white py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100">
            <Droplet className="h-10 w-10 fill-rose-600 text-rose-600" />
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Every Drop <span className="text-rose-600">Saves a Life</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 sm:text-xl">
            Join our smart blood donation network. We connect donors, hospitals, and blood banks in real-time to ensure no one waits for blood during an emergency.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="group flex h-12 items-center justify-center gap-2 rounded-full bg-rose-600 px-8 text-sm font-semibold text-white transition-all hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-600/20"
            >
              Become a Donor
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/request"
              className="flex h-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              Request Blood
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Advanced Intelligent Network</h2>
            <p className="mt-4 text-lg text-slate-600">Connecting every critical node in the healthcare and emergency response ecosystem.</p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1. Unified Network */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <Network className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Unified Real-Time Network</h3>
              <p className="text-slate-600">
                Seamlessly connects vehicles, hospitals, blood banks, registered donors, and defense forces into one intelligent, synchronized ecosystem.
              </p>
            </div>

            {/* 2. Car Accident Detection */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <Car className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Crash Detection & Signaling</h3>
              <p className="text-slate-600">
                Automated car accident detection instantly signals nearby hospitals and blood banks to prepare for incoming trauma patients.
              </p>
            </div>

            {/* 3. Secure SOS & Medical Data */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Encrypted Emergency SOS</h3>
              <p className="text-slate-600">
                Pre-registered medical data, blood group, emergency contacts, and history are securely stored, encrypted, and instantly accessible during SOS.
              </p>
            </div>

            {/* 4. Army Integration */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-100">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Defense Force Integration</h3>
              <p className="text-slate-600">
                Direct integration with army and defense forces for rapid blood mobilization during national emergencies and mass casualty events.
              </p>
            </div>

            {/* 5. Donor Reliability */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Donor Reliability Scoring</h3>
              <p className="text-slate-600">
                Advanced tracking of donor reliability and response rates to ensure critical requests are routed to the most dependable individuals.
              </p>
            </div>

            {/* 6. Real-time Location */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Precision Geolocation</h3>
              <p className="text-slate-600">
                Instantly locate the nearest eligible donors during emergencies using advanced geolocation and smart compatibility matching.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
