import { useState } from 'react';
import { Button } from '../UI/button';
import { Input } from '../UI/input';
import { Label } from '../UI/label';
import { Card } from '../UI/card';
import { ArrowLeft, Activity, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface AdminLoginProps {
  onAuth: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onAuth, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast.success('Admin login successful!');
      setTimeout(() => onAuth(), 500);
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-3 rounded-xl shadow-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-gray-900">Healthcare Base</h2>
            <p className="text-xs text-gray-600">Sub-Admin Portal</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="p-6 md:p-8 shadow-xl border-0">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-gray-900 mb-2">Admin Access</h2>
            <p className="text-sm text-gray-600">Secure login for authorized personnel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@healthcarebase.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-green-600 hover:underline">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-5"
            >
              <Shield className="mr-2 w-4 h-4" />
              Secure Login
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              This portal is restricted to authorized healthcare administrators only.
              Unauthorized access attempts are logged and monitored.
            </p>
          </div>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2025 CBRILLIANCE AI-Techs LTD. All rights reserved.
        </p>
      </div>
    </div>
  );
}
