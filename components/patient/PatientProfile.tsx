import { useState } from 'react';
import { User, Mail, Phone, Lock, LogOut, Save, Bell, Shield } from 'lucide-react';
import { Button } from '../UI/button';
import { Input } from '../UI/input';
import { Label } from '../UI/label';
import { Card } from '../UI/card';
import { Separator } from '../UI/separator';
import { Switch } from '../UI/switch';
import PatientLayout from '../shared/PatientLayout';
import { toast } from 'sonner';

interface PatientProfileProps {
  userProfile: {
    name: string;
    email: string;
    phone: string;
  };
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export default function PatientProfile({ userProfile, onNavigate, onLogout }: PatientProfileProps) {
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    setTimeout(() => onLogout(), 500);
  };

  return (
    <PatientLayout onNavigate={onNavigate} activeScreen="patient-profile" userProfile={userProfile}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-gray-900 mb-6">Personal Information</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 rounded-lg"
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveProfile}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-5 mt-6"
              >
                <Save className="mr-2 w-4 h-4" />
                Save Changes
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Security Section */}
            <div>
              <h3 className="text-gray-900 mb-4">Security</h3>
              <Button
                variant="outline"
                className="w-full justify-start rounded-lg"
              >
                <Lock className="mr-2 w-4 h-4" />
                Change Password
              </Button>
            </div>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">
                  {userProfile.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-gray-900 mb-1">{userProfile.name}</h3>
              <p className="text-sm text-gray-600">{userProfile.email}</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">Member since</p>
                <p className="text-sm text-gray-700">January 2025</p>
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-gray-700" />
                <h3 className="text-gray-900">Notifications</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Email Notifications</p>
                    <p className="text-xs text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">SMS Notifications</p>
                    <p className="text-xs text-gray-500">Receive updates via SMS</p>
                  </div>
                  <Switch
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-gray-700" />
                <h3 className="text-gray-900">Account Stats</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Appointments</span>
                  <span className="text-sm text-gray-900">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Upcoming</span>
                  <span className="text-sm text-gray-900">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Health Records</span>
                  <span className="text-sm text-gray-900">8 Files</span>
                </div>
              </div>
            </Card>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="mr-2 w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
