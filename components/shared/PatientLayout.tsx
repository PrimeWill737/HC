import { Activity, Calendar, User, FileText, Bell, Menu, X } from 'lucide-react';
import { Button } from '../UI/button';
import { useState } from 'react';

interface PatientLayoutProps {
  children: React.ReactNode;
  onNavigate: (screen: string) => void;
  activeScreen: string;
  userProfile: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function PatientLayout({ children, onNavigate, activeScreen, userProfile }: PatientLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'patient-dashboard', label: 'Dashboard', icon: Activity, screen: 'patient-dashboard' },
    { id: 'book-appointment', label: 'Book Appointment', icon: Calendar, screen: 'book-appointment' },
    { id: 'records', label: 'Health Records', icon: FileText, screen: 'records' },
    { id: 'notifications', label: 'Notifications', icon: Bell, screen: 'notifications' },
    { id: 'patient-profile', label: 'Profile', icon: User, screen: 'patient-profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-blue-900">Healthcare Base</h3>
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
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                );
              })}
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
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
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
