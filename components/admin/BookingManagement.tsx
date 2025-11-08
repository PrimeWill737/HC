import { useState } from 'react';
import { Search, Filter, Calendar, Clock, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import { Button } from '../UI/button';
import { Input } from '../UI/input';
import { Card } from '../UI/card';
import { Badge } from '../UI/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../UI/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../UI/dropdown-menu';
import AdminLayout from '../shared/AdminLayout';
import { toast } from 'sonner';

interface BookingManagementProps {
  onNavigate: (screen: string) => void;
}

const bookings = [
  { id: 'BK001', patient: 'John Smith', doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: 'Nov 10, 2025', time: '10:30 AM', amount: 150, status: 'Confirmed' },
  { id: 'BK002', patient: 'Emma Wilson', doctor: 'Dr. Michael Chen', specialty: 'General Physician', date: 'Nov 10, 2025', time: '11:00 AM', amount: 100, status: 'Pending' },
  { id: 'BK003', patient: 'Michael Brown', doctor: 'Dr. Emily Rodriguez', specialty: 'Dermatologist', date: 'Nov 11, 2025', time: '09:00 AM', amount: 120, status: 'Confirmed' },
  { id: 'BK004', patient: 'Sarah Davis', doctor: 'Dr. James Wilson', specialty: 'Orthopedic', date: 'Nov 11, 2025', time: '02:00 PM', amount: 180, status: 'Pending' },
  { id: 'BK005', patient: 'David Miller', doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: 'Nov 12, 2025', time: '03:30 PM', amount: 150, status: 'Confirmed' },
  { id: 'BK006', patient: 'Lisa Anderson', doctor: 'Dr. Michael Chen', specialty: 'General Physician', date: 'Nov 12, 2025', time: '04:00 PM', amount: 100, status: 'Cancelled' },
  { id: 'BK007', patient: 'Robert Taylor', doctor: 'Dr. Emily Rodriguez', specialty: 'Dermatologist', date: 'Nov 13, 2025', time: '10:00 AM', amount: 120, status: 'Confirmed' },
  { id: 'BK008', patient: 'Jennifer Lee', doctor: 'Dr. James Wilson', specialty: 'Orthopedic', date: 'Nov 13, 2025', time: '11:30 AM', amount: 180, status: 'Pending' },
];

export default function BookingManagement({ onNavigate }: BookingManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (bookingId: string) => {
    toast.success(`Booking ${bookingId} approved`);
  };

  const handleCancel = (bookingId: string) => {
    toast.error(`Booking ${bookingId} cancelled`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <Badge className="bg-green-100 text-green-700">Confirmed</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout onNavigate={onNavigate} activeScreen="booking-management">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 mb-2">Booking Management</h1>
          <p className="text-gray-600">View and manage all patient appointments</p>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by patient, doctor, or booking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 rounded-lg">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
            <p className="text-gray-900">{bookings.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Confirmed</p>
            <p className="text-green-600">{bookings.filter(b => b.status === 'Confirmed').length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-yellow-600">{bookings.filter(b => b.status === 'Pending').length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Cancelled</p>
            <p className="text-red-600">{bookings.filter(b => b.status === 'Cancelled').length}</p>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="text-gray-900">{booking.id}</TableCell>
                    <TableCell className="text-gray-900">{booking.patient}</TableCell>
                    <TableCell className="text-gray-700">{booking.doctor}</TableCell>
                    <TableCell className="text-gray-600">{booking.specialty}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                          <Calendar className="w-3 h-3" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-3 h-3" />
                          {booking.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900">${booking.amount}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleApprove(booking.id)}>
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCancel(booking.id)}>
                            <XCircle className="w-4 h-4 mr-2 text-red-600" />
                            Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No bookings found</p>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
