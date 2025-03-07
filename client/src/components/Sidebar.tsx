import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Building2,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
    color: 'text-sky-500',
  },
  {
    label: 'Businesses',
    icon: Building2,
    href: '/businesses',
    color: 'text-violet-500',
  },
  {
    label: 'Analytics',
    icon: TrendingUp,
    href: '/analytics',
    color: 'text-pink-700',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: 'text-orange-700'
  },
  {
    label: 'Help',
    icon: HelpCircle,
    href: '/help',
    color: 'text-emerald-500',
  }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background/80 backdrop-blur-sm border-r">
      <div className="px-3 py-2 flex-1">
        <Link to="/" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">BusinessHub</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                location.pathname === route.href ? 'text-primary bg-primary/10' : 'text-muted-foreground',
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <button className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-destructive hover:bg-destructive/10 rounded-lg transition">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}