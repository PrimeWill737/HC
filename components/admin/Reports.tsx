import { useState } from 'react';
import { Download, FileText, TrendingUp, Calendar as CalendarIcon, Users, DollarSign } from 'lucide-react';
import { Button } from '../UI/button';
import { Card } from '../UI/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../UI/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/select';
import { Calendar } from '../UI/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../UI/popover';
import AdminLayout from '../shared/AdminLayout';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { toast } from 'sonner';

interface ReportsProps {
  onNavigate: (screen: string) => void;
}

const transactionData = [
  { id: 'TXN001', date: 'Nov 8, 2025', patient: 'John Smith', doctor: 'Dr. Sarah Johnson', amount: 150, clinicShare: 142.5, platformFee: 7.5, status: 'Completed' },
  { id: 'TXN002', date: 'Nov 8, 2025', patient: 'Emma Wilson', doctor: 'Dr. Michael Chen', amount: 100, clinicShare: 95, platformFee: 5, status: 'Completed' },
  { id: 'TXN003', date: 'Nov 7, 2025', patient: 'Michael Brown', doctor: 'Dr. Emily Rodriguez', amount: 120, clinicShare: 114, platformFee: 6, status: 'Completed' },
  { id: 'TXN004', date: 'Nov 7, 2025', patient: 'Sarah Davis', doctor: 'Dr. James Wilson', amount: 180, clinicShare: 171, platformFee: 9, status: 'Completed' },
  { id: 'TXN005', date: 'Nov 6, 2025', patient: 'David Miller', doctor: 'Dr. Sarah Johnson', amount: 150, clinicShare: 142.5, platformFee: 7.5, status: 'Completed' },
];

const monthlyGrowthData = [
  { month: 'Jun', patients: 320, bookings: 450, revenue: 45000 },
  { month: 'Jul', patients: 380, bookings: 520, revenue: 52000 },
  { month: 'Aug', patients: 410, bookings: 490, revenue: 48000 },
  { month: 'Sep', patients: 520, bookings: 650, revenue: 65000 },
  { month: 'Oct', patients: 590, bookings: 720, revenue: 72000 },
  { month: 'Nov', patients: 640, bookings: 750, revenue: 75000 },
];

const patientActivityData = [
  { date: 'Nov 1', newPatients: 12, appointments: 45 },
  { date: 'Nov 2', newPatients: 15, appointments: 52 },
  { date: 'Nov 3', newPatients: 10, appointments: 48 },
  { date: 'Nov 4', newPatients: 18, appointments: 61 },
  { date: 'Nov 5', newPatients: 14, appointments: 55 },
  { date: 'Nov 6', newPatients: 11, appointments: 38 },
  { date: 'Nov 7', newPatients: 9, appointments: 28 },
];

export default function Reports({ onNavigate }: ReportsProps) {
  const [reportType, setReportType] = useState('transactions');
  const [dateRange, setDateRange] = useState('7days');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleExportPDF = () => {
    toast.success('Exporting report as PDF...');
  };

  const handleExportCSV = () => {
    toast.success('Exporting report as CSV...');
  };

  const handleExportExcel = () => {
    toast.success('Exporting report as Excel...');
  };

  return (
    <AdminLayout onNavigate={onNavigate} activeScreen="reports">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Generate and export comprehensive platform reports</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={handleExportPDF}
              variant="outline"
              className="border-blue-600 text-blue-700 hover:bg-blue-50"
            >
              <Download className="mr-2 w-4 h-4" />
              Export PDF
            </Button>
            <Button 
              onClick={handleExportCSV}
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50"
            >
              <Download className="mr-2 w-4 h-4" />
              Export CSV
            </Button>
            <Button 
              onClick={handleExportExcel}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="mr-2 w-4 h-4" />
              Export Excel
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Report Type */}
            <div className="flex-1">
              <label className="text-sm text-gray-600 mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="rounded-lg">
                  <FileText className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transactions">Transaction Report</SelectItem>
                  <SelectItem value="bookings">Booking Logs</SelectItem>
                  <SelectItem value="patients">Patient Activity</SelectItem>
                  <SelectItem value="revenue">Revenue Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="flex-1">
              <label className="text-sm text-gray-600 mb-2 block">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="rounded-lg">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Date Range */}
            {dateRange === 'custom' && (
              <>
                <div className="flex-1">
                  <label className="text-sm text-gray-600 mb-2 block">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left rounded-lg"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? startDate.toLocaleDateString() : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex-1">
                  <label className="text-sm text-gray-600 mb-2 block">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left rounded-lg"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? endDate.toLocaleDateString() : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => startDate ? date < startDate : false}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-gray-900 mb-1">Total Revenue</h3>
            <p className="text-gray-600">$75,000</p>
            <p className="text-xs text-gray-500 mt-2">Selected period</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-gray-900 mb-1">Total Transactions</h3>
            <p className="text-gray-600">1,249</p>
            <p className="text-xs text-gray-500 mt-2">Completed bookings</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-gray-900 mb-1">Active Patients</h3>
            <p className="text-gray-600">2,847</p>
            <p className="text-xs text-gray-500 mt-2">Registered users</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-gray-900 mb-1">Growth Rate</h3>
            <p className="text-gray-600">+12.5%</p>
            <p className="text-xs text-gray-500 mt-2">Month over month</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Growth */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-gray-900">Monthly Growth Trend</h2>
              <p className="text-sm text-gray-600">Patients, bookings, and revenue over time</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyGrowthData}>
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
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="#007BFF" 
                  strokeWidth={2}
                  name="Patients"
                  dot={{ fill: '#007BFF', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#00B894" 
                  strokeWidth={2}
                  name="Bookings"
                  dot={{ fill: '#00B894', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Patient Activity */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-gray-900">Patient Activity</h2>
              <p className="text-sm text-gray-600">Daily new patients and appointments</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patientActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
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
                <Bar dataKey="newPatients" fill="#007BFF" name="New Patients" radius={[8, 8, 0, 0]} />
                <Bar dataKey="appointments" fill="#00B894" name="Appointments" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Transaction Table */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900">Transaction Report</h2>
            <p className="text-sm text-gray-600">Detailed transaction history with revenue split</p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Clinic Share (95%)</TableHead>
                  <TableHead>Platform Fee (5%)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionData.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="text-gray-900">{transaction.id}</TableCell>
                    <TableCell className="text-gray-600">{transaction.date}</TableCell>
                    <TableCell className="text-gray-900">{transaction.patient}</TableCell>
                    <TableCell className="text-gray-700">{transaction.doctor}</TableCell>
                    <TableCell className="text-gray-900">${transaction.amount}</TableCell>
                    <TableCell className="text-green-600">${transaction.clinicShare}</TableCell>
                    <TableCell className="text-blue-600">${transaction.platformFee}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Export Info */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Export Options</h3>
              <p className="text-sm text-gray-600">
                You can export reports in multiple formats: PDF for presentations, CSV for data analysis, 
                and Excel for detailed financial reviews. All exports include the complete data set based 
                on your selected filters and date range.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
