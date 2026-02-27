import Link from 'next/link';
import { Droplet, LayoutDashboard, User, HeartPulse, MapPin } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-rose-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-rose-600">
          <Droplet className="h-6 w-6 fill-rose-600" />
          <span className="text-xl font-bold tracking-tight">HaemoSync</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/dashboard" className="flex items-center gap-2 hover:text-rose-600 transition-colors">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link href="/request" className="flex items-center gap-2 hover:text-rose-600 transition-colors">
            <HeartPulse className="h-4 w-4" />
            <span className="hidden sm:inline">Request Blood</span>
          </Link>
          <Link href="/locate" className="flex items-center gap-2 hover:text-rose-600 transition-colors">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Locate Donors</span>
          </Link>
          <Link href="/profile" className="flex items-center gap-2 hover:text-rose-600 transition-colors">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
