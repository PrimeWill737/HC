import { useState } from 'react';
import { 
  Calendar, 
  Shield, 
  Clock, 
  FileText, 
  Users, 
  Activity, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X,
  Star,
  TrendingUp,
  Heart,
  Smartphone,
  Lock,
  Bell
} from 'lucide-react';
import { Button } from './UI/button';
import { Card } from './UI/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (screen: string) => void;
}

const features = [
  {
    icon: Calendar,
    title: 'Easy Appointment Booking',
    description: 'Schedule appointments with top healthcare professionals in just a few clicks. View real-time availability and get instant confirmations.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FileText,
    title: 'Digital Health Records',
    description: 'Access your complete medical history, lab results, prescriptions, and imaging reports anytime, anywhere. All securely encrypted.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your health data is protected with bank-level encryption. We comply with all healthcare privacy regulations and standards.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Clock,
    title: '24/7 Access',
    description: 'Manage your healthcare on your schedule. Book appointments, view records, and get notifications round the clock.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Never miss an appointment or medication. Get timely notifications for upcoming visits, prescription refills, and lab results.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Access your healthcare from any device. Our responsive platform works seamlessly on desktop, tablet, and mobile.',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

const stats = [
  { value: '50K+', label: 'Active Patients' },
  { value: '500+', label: 'Healthcare Providers' },
  { value: '100K+', label: 'Appointments Booked' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const howItWorks = [
  {
    step: '1',
    title: 'Create Your Account',
    description: 'Sign up in seconds with your email. Set up your profile and add your medical information.',
  },
  {
    step: '2',
    title: 'Find Your Doctor',
    description: 'Browse our network of qualified healthcare professionals. Filter by specialty, location, and availability.',
  },
  {
    step: '3',
    title: 'Book Appointment',
    description: 'Choose a convenient time slot and book your appointment. Receive instant confirmation and reminders.',
  },
  {
    step: '4',
    title: 'Get Quality Care',
    description: 'Visit your healthcare provider and get the care you need. All records are automatically updated.',
  },
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Patient',
    content: 'Healthcare Base has transformed how I manage my family\'s health. Booking appointments is so easy, and having all our records in one place is a game-changer.',
    rating: 5,
  },
  {
    name: 'Dr. James Wilson',
    role: 'General Practitioner',
    content: 'As a healthcare provider, this platform has streamlined my practice. The admin tools are intuitive, and my patients love the convenience.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Patient',
    content: 'I was skeptical at first, but Healthcare Base exceeded my expectations. The reminder system ensures I never miss important appointments.',
    rating: 5,
  },
];

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900">Healthcare Base</h2>
                <p className="text-xs text-gray-500">CBRILLIANCE AI-Techs</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => onNavigate('admin-login')}
                className="rounded-lg"
              >
                Admin Login
              </Button>
              <Button 
                onClick={() => onNavigate('welcome')}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-600 hover:text-gray-900 py-2">Features</a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900 py-2">How It Works</a>
              <a href="#testimonials" className="block text-gray-600 hover:text-gray-900 py-2">Testimonials</a>
              <a href="#contact" className="block text-gray-600 hover:text-gray-900 py-2">Contact</a>
              <div className="pt-3 space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('admin-login')}
                  className="w-full rounded-lg"
                >
                  Admin Login
                </Button>
                <Button 
                  onClick={() => onNavigate('welcome')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                <p className="text-sm">🏥 Trusted by 50,000+ Patients</p>
              </div>
              <h1 className="text-gray-900 mb-6">
                Your Health, Simplified & Secured
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Book appointments with top healthcare professionals, access your medical records anytime, 
                and take control of your health journey—all in one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('welcome')}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('admin-login')}
                  className="rounded-lg"
                >
                  Healthcare Provider Login
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">4.9/5 from 2,500+ reviews</p>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758691461990-03b49d969495?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwcGF0aWVudCUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3NjI0OTMzNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Healthcare Professional"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Users</p>
                    <p className="text-gray-900">50,000+</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Satisfaction</p>
                    <p className="text-gray-900">98%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-white mb-2">{stat.value}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">
              Everything You Need for Better Healthcare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to make healthcare management simple, secure, and accessible for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with Healthcare Base in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{item.step}</span>
                </div>
                <h3 className="text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our patients and healthcare providers are saying
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">&quot;{testimonial.content}&quot;</p>
                <div>
                  <p className="text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of patients who trust Healthcare Base for their healthcare needs. 
            Get started today—it's free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate('welcome')}
              className="bg-white text-blue-600 hover:bg-gray-100 rounded-lg"
            >
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate('admin-login')}
              className="border-white text-white hover:bg-blue-700 rounded-lg"
            >
              Provider Portal
            </Button>
          </div>
        </div>
      </section>

      {/* For Healthcare Providers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691463610-3c2ecf5fb3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neSUyMG1vZGVybnxlbnwxfHx8fDE3NjI0OTIzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Healthcare Technology"
                className="w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-gray-900 mb-6">
                For Healthcare Providers
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Streamline your practice with our comprehensive admin dashboard. Manage appointments, 
                track revenue, and provide better care with powerful analytics.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-900 mb-1">Appointment Management</h3>
                    <p className="text-gray-600">Efficiently manage bookings, cancellations, and rescheduling</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-900 mb-1">Revenue Analytics</h3>
                    <p className="text-gray-600">Track earnings with detailed remittance reports and charts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-900 mb-1">Export Reports</h3>
                    <p className="text-gray-600">Generate and export detailed reports in PDF or Excel format</p>
                  </div>
                </div>
              </div>
              <Button 
                size="lg"
                onClick={() => onNavigate('admin-login')}
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Access Provider Portal
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white">Healthcare Base</h3>
                  <p className="text-xs text-gray-400">CBRILLIANCE AI-Techs LTD</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering patients and healthcare providers with modern, secure, and accessible healthcare management.
              </p>
            </div>

            <div>
              <h4 className="text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © 2025 CBRILLIANCE AI-Techs LTD. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Lock className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Shield className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
