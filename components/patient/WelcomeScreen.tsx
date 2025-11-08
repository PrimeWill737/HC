import { Activity, ArrowRight, Shield, Clock, Users, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header with Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => onNavigate('landing')}
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Home
        </Button>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl shadow-lg">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-blue-900">Healthcare Base</h1>
              <p className="text-xs text-gray-600">by CBRILLIANCE AI-Techs LTD</p>
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-600 mb-12"
          >
            Your trusted digital health companion
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              onClick={() => onNavigate('patient-auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl shadow-lg group"
              size="lg"
            >
              Patient Portal
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => onNavigate('admin-login')}
              variant="outline"
              className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-6 rounded-xl shadow-sm"
              size="lg"
            >
              Admin Access
            </Button>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20"
        >
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Quick Booking</h3>
            <p className="text-sm text-gray-600">
              Schedule appointments with top doctors in seconds
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-600">
              Your health data is protected with enterprise-grade security
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Expert Care</h3>
            <p className="text-sm text-gray-600">
              Access verified healthcare professionals nationwide
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-sm text-gray-500">
        © 2025 CBRILLIANCE AI-Techs LTD. All rights reserved.
      </div>
    </div>
  );
}
