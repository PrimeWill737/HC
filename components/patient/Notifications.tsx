import { useState } from 'react';
import { Bell, Check, CheckCheck, Trash2, Filter, Calendar, FileText, Pill, AlertCircle, Info, X } from 'lucide-react';
import { Button } from '../UI/button';
import { Card } from '../UI/card';
import { Badge } from '../UI/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../UI/tabs';
import PatientLayout from '../shared/PatientLayout';
import { toast } from 'sonner';

interface NotificationsProps {
  onNavigate: (screen: string) => void;
  userProfile: {
    name: string;
    email: string;
    phone: string;
  };
}

interface Notification {
  id: number;
  type: 'appointment' | 'lab-result' | 'prescription' | 'system' | 'reminder';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  priority: 'high' | 'medium' | 'low';
}

const allNotifications: Notification[] = [
  {
    id: 1,
    type: 'appointment',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Sarah Johnson has been confirmed for Nov 10, 2025 at 10:30 AM',
    time: '2 hours ago',
    unread: true,
    priority: 'high',
  },
  {
    id: 2,
    type: 'lab-result',
    title: 'Lab Results Available',
    message: 'Your blood test results are now available. Please review them in your health records.',
    time: '1 day ago',
    unread: true,
    priority: 'high',
  },
  {
    id: 3,
    type: 'prescription',
    title: 'Prescription Refill Reminder',
    message: 'Your Lisinopril prescription needs to be refilled. You have 2 refills remaining.',
    time: '2 days ago',
    unread: false,
    priority: 'medium',
  },
  {
    id: 4,
    type: 'reminder',
    title: 'Upcoming Appointment',
    message: 'Reminder: You have an appointment with Dr. Michael Chen tomorrow at 2:00 PM',
    time: '3 days ago',
    unread: true,
    priority: 'high',
  },
  {
    id: 5,
    type: 'system',
    title: 'Profile Updated',
    message: 'Your profile information has been successfully updated.',
    time: '4 days ago',
    unread: false,
    priority: 'low',
  },
  {
    id: 6,
    type: 'appointment',
    title: 'Appointment Rescheduled',
    message: 'Your appointment with Dr. Emily Rodriguez has been rescheduled to Nov 18, 2025.',
    time: '5 days ago',
    unread: false,
    priority: 'medium',
  },
  {
    id: 7,
    type: 'lab-result',
    title: 'Test Results Normal',
    message: 'Your recent cholesterol panel results are within normal range.',
    time: '6 days ago',
    unread: false,
    priority: 'low',
  },
  {
    id: 8,
    type: 'system',
    title: 'Payment Received',
    message: 'Payment of $150 for your consultation has been processed successfully.',
    time: '1 week ago',
    unread: false,
    priority: 'low',
  },
];

export default function Notifications({ onNavigate, userProfile }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>(allNotifications);
  const [filterType, setFilterType] = useState('all');

  const unreadCount = notifications.filter(n => n.unread).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return notification.unread;
    return notification.type === filterType;
  });

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
    toast.success('Notification marked as read');
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    toast.success('All notifications marked as read');
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return { icon: Calendar, color: 'bg-blue-100 text-blue-600' };
      case 'lab-result':
        return { icon: FileText, color: 'bg-purple-100 text-purple-600' };
      case 'prescription':
        return { icon: Pill, color: 'bg-green-100 text-green-600' };
      case 'reminder':
        return { icon: AlertCircle, color: 'bg-orange-100 text-orange-600' };
      case 'system':
        return { icon: Info, color: 'bg-gray-100 text-gray-600' };
      default:
        return { icon: Bell, color: 'bg-gray-100 text-gray-600' };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <PatientLayout onNavigate={onNavigate} activeScreen="notifications" userProfile={userProfile}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <Badge className="bg-red-100 text-red-700">
                  {unreadCount} Unread
                </Badge>
              )}
            </div>
            <p className="text-gray-600">Stay updated with your health appointments and results</p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={handleMarkAllAsRead}
                className="rounded-lg"
              >
                <CheckCheck className="mr-2 w-4 h-4" />
                Mark All as Read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="border-red-200 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="mr-2 w-4 h-4" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-gray-900">{notifications.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-gray-900">{unreadCount}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Lab Results</p>
                <p className="text-gray-900">{notifications.filter(n => n.type === 'lab-result').length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Appointments</p>
                <p className="text-gray-900">{notifications.filter(n => n.type === 'appointment').length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs and Filters */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="all" onClick={() => setFilterType('all')}>
                All
              </TabsTrigger>
              <TabsTrigger value="unread" onClick={() => setFilterType('unread')}>
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="read" onClick={() => setFilterType('read')}>
                Read
              </TabsTrigger>
            </TabsList>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 rounded-lg">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="unread">Unread Only</SelectItem>
                <SelectItem value="appointment">Appointments</SelectItem>
                <SelectItem value="lab-result">Lab Results</SelectItem>
                <SelectItem value="prescription">Prescriptions</SelectItem>
                <SelectItem value="reminder">Reminders</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="all" className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => {
                const { icon: Icon, color } = getNotificationIcon(notification.type);
                return (
                  <Card 
                    key={notification.id} 
                    className={`p-4 transition-all ${
                      notification.unread 
                        ? 'border-l-4 border-l-blue-600 bg-blue-50/30' 
                        : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`p-2 rounded-lg ${color.split(' ')[0]} flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${color.split(' ')[1]}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`${notification.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge className={getPriorityBadge(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">{notification.time}</p>
                          <div className="flex gap-2">
                            {notification.unread && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Mark as Read
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(notification.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-gray-900 mb-2">No Notifications</h3>
                  <p className="text-gray-600">
                    You're all caught up! Check back later for updates about your appointments and health records.
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3">
            {filteredNotifications.filter(n => n.unread).length > 0 ? (
              filteredNotifications.filter(n => n.unread).map((notification) => {
                const { icon: Icon, color } = getNotificationIcon(notification.type);
                return (
                  <Card 
                    key={notification.id} 
                    className="p-4 border-l-4 border-l-blue-600 bg-blue-50/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${color.split(' ')[0]} flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${color.split(' ')[1]}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-gray-900">{notification.title}</h3>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge className={getPriorityBadge(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">{notification.time}</p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Mark as Read
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(notification.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCheck className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">All Caught Up!</h3>
                  <p className="text-gray-600">
                    You have no unread notifications. Great job staying on top of your health!
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="read" className="space-y-3">
            {filteredNotifications.filter(n => !n.unread).length > 0 ? (
              filteredNotifications.filter(n => !n.unread).map((notification) => {
                const { icon: Icon, color } = getNotificationIcon(notification.type);
                return (
                  <Card key={notification.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${color.split(' ')[0]} flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${color.split(' ')[1]}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-gray-700">{notification.title}</h3>
                          <Badge className={getPriorityBadge(notification.priority)}>
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">{notification.time}</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(notification.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-gray-900 mb-2">No Read Notifications</h3>
                  <p className="text-gray-600">
                    You haven't read any notifications yet.
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Notification Settings</h3>
              <p className="text-sm text-gray-600 mb-3">
                Manage your notification preferences in your profile settings to control how and when you receive updates.
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onNavigate('patient-profile')}
                className="border-blue-600 text-blue-700 hover:bg-blue-100"
              >
                Go to Settings
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </PatientLayout>
  );
}
