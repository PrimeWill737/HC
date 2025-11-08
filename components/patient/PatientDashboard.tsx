import { Calendar, Bell, FileText, Activity, Clock, Plus, User } from 'lucide-react';
import { Button } from '../UI/button';
import { Card } from '../UI/card';
import { Badge } from '../UI/badge';
import PatientLayout from '../shared/PatientLayout';

interface PatientDashboardProps {
  onNavigate: (screen: string) => void;
  userProfile: {
    name: string;
    email: string;
    phone: string;
  };
}

const upcomingAppointments = [
  {
    id: 1,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: 'Nov 10, 2025',
    time: '10:30 AM',
    clinic: 'City Heart Clinic',
    status: 'Confirmed',
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    specialty: 'General Physician',
    date: 'Nov 15, 2025',
    time: '2:00 PM',
    clinic: 'Central Medical Center',
    status: 'Pending',
  },
];

const notifications = [
  {
    id: 1,
    message: 'Your appointment with Dr. Sarah Johnson is confirmed',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    message: 'Lab results are now available',
    time: '1 day ago',
    unread: true,
  },
  {
    id: 3,
    message: 'Prescription refill reminder',
    time: '2 days ago',
    unread: false,
  },
];

const healthRecordsSummary = [
  { label: 'Blood Type', value: 'A+' },
  { label: 'Allergies', value: 'None' },
  { label: 'Last Checkup', value: 'Oct 15, 2025' },
  { label: 'Prescriptions', value: '2 Active' },
];

export default function PatientDashboard({ onNavigate, userProfile }: PatientDashboardProps) {
  return (
    <PatientLayout onNavigate={onNavigate} activeScreen="dashboard" userProfile={userProfile}>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 p-6 md:p-8 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-white mb-2">Welcome back, {userProfile.name.split(' ')[0]}!</h1>
              <p className="text-blue-100">
                You have {upcomingAppointments.length} upcoming appointments
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Activity className="w-8 h-8 text-white" />
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={() => onNavigate('book-appointment')}
            className="bg-green-600 hover:bg-green-700 text-white h-auto py-6 px-6 rounded-xl shadow-md flex items-center justify-start gap-3"
          >
            <Plus className="w-5 h-5" />
            <span>Book a Doctor</span>
          </Button>

          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Appointments</p>
                <p className="text-gray-900">{upcomingAppointments.length}</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onNavigate('records')}
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Records</p>
                <p className="text-gray-900">12 Files</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onNavigate('notifications')}
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Notifications</p>
                <p className="text-gray-900">{notifications.filter(n => n.unread).length} New</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Upcoming Appointments</h2>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900">{appointment.doctor}</h3>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      </div>
                    </div>
                    <Badge
                      variant={appointment.status === 'Confirmed' ? 'default' : 'secondary'}
                      className={appointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' : ''}
                    >
                      {appointment.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 ml-11">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {appointment.time}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 ml-11 mt-1">
                    📍 {appointment.clinic}
                  </p>
                </Card>
              ))}
            </div>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Health Record Summary */}
            <Card className="p-6">
              <h2 className="text-gray-900 mb-4">Health Summary</h2>
              <div className="space-y-3">
                {healthRecordsSummary.map((record, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{record.label}</span>
                    <span className="text-sm text-gray-900">{record.value}</span>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full mt-4 text-blue-600 p-0">
                View Full Record →
              </Button>
            </Card>

            {/* Notifications */}
            <Card className="p-6">
              <h2 className="text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.unread ? 'bg-blue-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full mt-4 text-blue-600 p-0">
                View All Notifications →
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
