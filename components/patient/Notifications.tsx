import { useState } from 'react';
import { Bell, Check, CheckCheck, Trash2, Filter, Calendar, FileText, Pill, AlertCircle, Info, X } from 'lucide-react';
import { Button } from '../UI/button';
// import { Card } from '../UI/card';
// import { Badge } from '../UI/badge';
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
        return { icon: Calendar, color: 'notification-type-appointment' };
      case 'lab-result':
        return { icon: FileText, color: 'notification-type-lab-result' };
      case 'prescription':
        return { icon: Pill, color: 'notification-type-prescription' };
      case 'reminder':
        return { icon: AlertCircle, color: 'notification-type-reminder' };
      case 'system':
        return { icon: Info, color: 'notification-type-system' };
      default:
        return { icon: Bell, color: 'notification-type-system' };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'notification-priority high';
      case 'medium':
        return 'notification-priority medium';
      case 'low':
        return 'notification-priority low';
      default:
        return 'notification-priority low';
    }
  };

  return (
    <PatientLayout onNavigate={onNavigate} activeScreen="notifications" userProfile={userProfile}>
      <div className="notifications-container">
        {/* Header */}
        <div className="notifications-header">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="notifications-title">Notifications</h1>
              {unreadCount > 0 && (
                <div className="notifications-badge unread">
                  {unreadCount} Unread
                </div>
              )}
            </div>
            <p className="notifications-subtitle">Stay updated with your health appointments and results</p>
          </div>
          <div className="notifications-actions">
            {unreadCount > 0 && (
              <button
                className="notifications-button outline"
                onClick={handleMarkAllAsRead}
              >
                <CheckCheck className="mr-2 w-4 h-4" />
                Mark All as Read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                className="notifications-button danger"
                onClick={handleClearAll}
              >
                <Trash2 className="mr-2 w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="notifications-stats-grid">
          <div className="notifications-stat-card">
            <div className="notifications-stat-content">
              <div className="notifications-stat-icon bg-blue-100">
                <Bell className="icon-blue" />
              </div>
              <div className="notifications-stat-info">
                <p className="notifications-stat-label">Total</p>
                <p className="notifications-stat-value">{notifications.length}</p>
              </div>
            </div>
          </div>
          <div className="notifications-stat-card">
            <div className="notifications-stat-content">
              <div className="notifications-stat-icon bg-red-100">
                <AlertCircle className="icon-red" />
              </div>
              <div className="notifications-stat-info">
                <p className="notifications-stat-label">Unread</p>
                <p className="notifications-stat-value">{unreadCount}</p>
              </div>
            </div>
          </div>
          <div className="notifications-stat-card">
            <div className="notifications-stat-content">
              <div className="notifications-stat-icon bg-purple-100">
                <FileText className="icon-purple" />
              </div>
              <div className="notifications-stat-info">
                <p className="notifications-stat-label">Lab Results</p>
                <p className="notifications-stat-value">{notifications.filter(n => n.type === 'lab-result').length}</p>
              </div>
            </div>
          </div>
          <div className="notifications-stat-card">
            <div className="notifications-stat-content">
              <div className="notifications-stat-icon bg-green-100">
                <Calendar className="icon-green" />
              </div>
              <div className="notifications-stat-info">
                <p className="notifications-stat-label">Appointments</p>
                <p className="notifications-stat-value">{notifications.filter(n => n.type === 'appointment').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Filters */}
        <Tabs defaultValue="all" className="notifications-tabs-container">
          <div className="notifications-tabs-header">
            <TabsList className="notifications-tabs-list">
              <TabsTrigger 
                value="all" 
                className="notifications-tab-trigger"
                onClick={() => setFilterType('all')}
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="unread" 
                className="notifications-tab-trigger"
                onClick={() => setFilterType('unread')}
              >
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger 
                value="read" 
                className="notifications-tab-trigger"
                onClick={() => setFilterType('read')}
              >
                Read
              </TabsTrigger>
            </TabsList>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="notifications-filter-select">
                <div className="notifications-filter-trigger">
                  <Filter className="notifications-filter-icon" />
                  <SelectValue placeholder="Filter by type" />
                </div>
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

          <TabsContent value="all" className="notifications-list">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => {
                const { icon: Icon, color } = getNotificationIcon(notification.type);
                return (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.unread ? 'unread' : ''}`}
                  >
                    <div className="notification-content">
                      <div className={`notification-icon-container ${color}`}>
                        <Icon className="notification-icon" />
                      </div>
                      <div className="notification-details">
                        <div className="notification-header">
                          <h3 className={`notification-title ${notification.unread ? 'unread' : ''}`}>
                            {notification.title}
                          </h3>
                          <div className="notification-meta">
                            <span className={getPriorityBadge(notification.priority)}>
                              {notification.priority}
                            </span>
                            {notification.unread && (
                              <div className="notification-unread-indicator" />
                            )}
                          </div>
                        </div>
                        <p className="notification-message">
                          {notification.message}
                        </p>
                        <div className="notification-footer">
                          <p className="notification-time">{notification.time}</p>
                          <div className="notification-actions">
                            {notification.unread && (
                              <button
                                className="notifications-button ghost small"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Mark as Read
                              </button>
                            )}
                            <button
                              className="notifications-button ghost danger small"
                              onClick={() => handleDelete(notification.id)}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="notifications-empty-state">
                <div className="notifications-empty-icon">
                  <Bell className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="notifications-empty-title">No Notifications</h3>
                <p className="notifications-empty-description">
                  You're all caught up! Check back later for updates about your appointments and health records.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="notifications-list">
            {filteredNotifications.filter(n => n.unread).length > 0 ? (
              filteredNotifications.filter(n => n.unread).map((notification) => {
                const { icon: Icon, color } = getNotificationIcon(notification.type);
                return (
                  <div 
                    key={notification.id} 
                    className="notification-item unread"
                  >
                    <div className="notification-content">
                      <div className={`notification-icon-container ${color}`}>
                        <Icon className="notification-icon" />
                      </div>
                      <div className="notification-details">
                        <div className="notification-header">
                          <h3 className="notification-title unread">
                            {notification.title}
                          </h3>
                          <div className="notification-meta">
                            <span className={getPriorityBadge(notification.priority)}>
                              {notification.priority}
                            </span>
                            <div className="notification-unread-indicator" />
                          </div>
                        </div>
                        <p className="notification-message">{notification.message}</p>
                        <div className="notification-footer">
                          <p className="notification-time">{notification.time}</p>
                          <div className="notification-actions">
                            <button
                              className="notifications-button ghost small"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Mark as Read
                            </button>
                            <button
                              className="notifications-button ghost danger small"
                              onClick={() => handleDelete(notification.id)}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="notifications-empty-state">
                <div className="notifications-empty-icon success">
                  <CheckCheck className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="notifications-empty-title">All Caught Up!</h3>
                <p className="notifications-empty-description">
                  You have no unread notifications. Great job staying on top of your health!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="read" className="notifications-list">
            {filteredNotifications.filter(n => !n.unread).length > 0 ? (
              filteredNotifications.filter(n => !n.unread).map((notification) => {
                const { icon: Icon, color } = getNotificationIcon(notification.type);
                return (
                  <div key={notification.id} className="notification-item">
                    <div className="notification-content">
                      <div className={`notification-icon-container ${color}`}>
                        <Icon className="notification-icon" />
                      </div>
                      <div className="notification-details">
                        <div className="notification-header">
                          <h3 className="notification-title">
                            {notification.title}
                          </h3>
                          <span className={getPriorityBadge(notification.priority)}>
                            {notification.priority}
                          </span>
                        </div>
                        <p className="notification-message">{notification.message}</p>
                        <div className="notification-footer">
                          <p className="notification-time">{notification.time}</p>
                          <button
                            className="notifications-button ghost danger small"
                            onClick={() => handleDelete(notification.id)}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="notifications-empty-state">
                <div className="notifications-empty-icon">
                  <Bell className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="notifications-empty-title">No Read Notifications</h3>
                <p className="notifications-empty-description">
                  You haven't read any notifications yet.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <div className="notifications-info-card">
          <div className="notifications-info-content">
            <div className="notifications-info-icon">
              <Bell className="notifications-info-icon-svg" />
            </div>
            <div className="notifications-info-text">
              <h3 className="notifications-info-title">Notification Settings</h3>
              <p className="notifications-info-description">
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
        </div>
      </div>
    </PatientLayout>
  );
}