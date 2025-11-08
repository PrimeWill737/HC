import { Activity, LayoutDashboard, Calendar, DollarSign, FileText, Menu, X, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
  onNavigate: (screen: string) => void;
  activeScreen: string;
}

export default function AdminLayout({ children, onNavigate, activeScreen }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard, screen: 'admin-dashboard' },
    { id: 'booking-management', label: 'Bookings', icon: Calendar, screen: 'booking-management' },
    { id: 'remittance', label: 'Remittance', icon: DollarSign, screen: 'remittance' },
    { id: 'reports', label: 'Reports', icon: FileText, screen: 'reports' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-green-600 to-green-700 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Healthcare Base</h3>
                <p className="text-xs text-gray-500">Admin Portal</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeScreen === item.screen ? 'default' : 'ghost'}
                    onClick={() => onNavigate(item.screen)}
                    className={`gap-2 ${
                      activeScreen === item.screen
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                );
              })}
              
              <Button
                variant="ghost"
                onClick={() => onNavigate('welcome')}
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Logout</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeScreen === item.screen ? 'default' : 'ghost'}
                    onClick={() => {
                      onNavigate(item.screen);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full justify-start gap-3 ${
                      activeScreen === item.screen
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
              
              <Button
                variant="ghost"
                onClick={() => {
                  onNavigate('welcome');
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
