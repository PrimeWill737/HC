import { Users, Calendar, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { Button } from '../UI/button';
import { Card } from '../UI/card';
import { Badge } from '../UI/badge';
import AdminLayout from '../shared/AdminLayout';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AdminDashboardProps {
  onNavigate: (screen: string) => void;
}

// Mock Data
const revenueData = [
  { month: 'Jan', clinic: 45600, platform: 2400 },
  { month: 'Feb', clinic: 52250, platform: 2750 },
  { month: 'Mar', clinic: 48450, platform: 2550 },
  { month: 'Apr', clinic: 61750, platform: 3250 },
  { month: 'May', clinic: 68400, platform: 3600 },
  { month: 'Jun', clinic: 71250, platform: 3750 },
];

const bookingsData = [
  { name: 'Mon', bookings: 45 },
  { name: 'Tue', bookings: 52 },
  { name: 'Wed', bookings: 48 },
  { name: 'Thu', bookings: 61 },
  { name: 'Fri', bookings: 55 },
  { name: 'Sat', bookings: 38 },
  { name: 'Sun', bookings: 28 },
];

const revenueSplitData = [
  { name: 'Clinic Revenue (95%)', value: 71250, color: '#007BFF' },
  { name: 'Platform Fee (5%)', value: 3750, color: '#00B894' },
];

const recentBookings = [
  { id: 1, patient: 'John Smith', doctor: 'Dr. Sarah Johnson', amount: 150, status: 'Confirmed', date: 'Nov 8, 2025' },
  { id: 2, patient: 'Emma Wilson', doctor: 'Dr. Michael Chen', amount: 100, status: 'Pending', date: 'Nov 8, 2025' },
  { id: 3, patient: 'Michael Brown', doctor: 'Dr. Emily Rodriguez', amount: 120, status: 'Confirmed', date: 'Nov 8, 2025' },
  { id: 4, patient: 'Sarah Davis', doctor: 'Dr. James Wilson', amount: 180, status: 'Confirmed', date: 'Nov 7, 2025' },
];

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  return (
    <AdminLayout onNavigate={onNavigate} activeScreen="admin-dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Monitor your healthcare platform performance</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg">
            <Download className="mr-2 w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                12%
              </Badge>
            </div>
            <h3 className="text-gray-900 mb-1">Total Patients</h3>
            <p className="text-gray-600">2,847</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                8%
              </Badge>
            </div>
            <h3 className="text-gray-900 mb-1">Total Bookings</h3>
            <p className="text-gray-600">1,249</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                15%
              </Badge>
            </div>
            <h3 className="text-gray-900 mb-1">Total Revenue</h3>
            <p className="text-gray-600">$75,000</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <Badge className="bg-red-100 text-red-700 flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3" />
                3%
              </Badge>
            </div>
            <h3 className="text-gray-900 mb-1">Platform Fee</h3>
            <p className="text-gray-600">$3,750</p>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900">Revenue Trend</h2>
                <p className="text-sm text-gray-600">Monthly revenue breakdown (95/5 split)</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorClinic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007BFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#007BFF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPlatform" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B894" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00B894" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="clinic" 
                  stroke="#007BFF" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorClinic)" 
                  name="Clinic Revenue (95%)"
                />
                <Area 
                  type="monotone" 
                  dataKey="platform" 
                  stroke="#00B894" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPlatform)" 
                  name="Platform Fee (5%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Bookings Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900">Weekly Bookings</h2>
                <p className="text-sm text-gray-600">Last 7 days activity</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="bookings" fill="#007BFF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Revenue Split & Recent Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Split Pie Chart */}
          <Card className="p-6">
            <h2 className="text-gray-900 mb-6">Revenue Split (This Month)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueSplitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueSplitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {revenueSplitData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-gray-900">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Bookings */}
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Recent Bookings</h2>
              <Button 
                variant="link" 
                className="text-green-600 p-0"
                onClick={() => onNavigate('booking-management')}
              >
                View All →
              </Button>
            </div>

            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-gray-900">{booking.patient}</p>
                    <p className="text-sm text-gray-600">{booking.doctor}</p>
                    <p className="text-xs text-gray-500 mt-1">{booking.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 mb-1">${booking.amount}</p>
                    <Badge 
                      variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}
                      className={booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : ''}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
