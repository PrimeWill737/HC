import { DollarSign, TrendingUp, Download, Calendar, Building2, Wallet } from 'lucide-react';
import { Button } from '../UI/button';
import { Card } from '../UI/card';
import { Badge } from '../UI/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../UI/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/select';
import AdminLayout from '../shared/AdminLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { toast } from 'sonner';

interface RemittanceProps {
  onNavigate: (screen: string) => void;
}

const monthlyData = [
  { month: 'Jan', clinic: 45600, platform: 2400 },
  { month: 'Feb', clinic: 52250, platform: 2750 },
  { month: 'Mar', clinic: 48450, platform: 2550 },
  { month: 'Apr', clinic: 61750, platform: 3250 },
  { month: 'May', clinic: 68400, platform: 3600 },
  { month: 'Jun', clinic: 71250, platform: 3750 },
];

const remittanceTransactions = [
  { id: 'RM001', clinic: 'City Heart Clinic', totalBookings: 45, grossRevenue: 6750, clinicShare: 6412.50, platformFee: 337.50, status: 'Paid', date: 'Nov 1, 2025' },
  { id: 'RM002', clinic: 'Central Medical Center', totalBookings: 38, grossRevenue: 3800, clinicShare: 3610, platformFee: 190, status: 'Paid', date: 'Nov 1, 2025' },
  { id: 'RM003', clinic: 'Skin Care Excellence', totalBookings: 52, grossRevenue: 6240, clinicShare: 5928, platformFee: 312, status: 'Pending', date: 'Nov 8, 2025' },
  { id: 'RM004', clinic: 'Joint & Bone Center', totalBookings: 31, grossRevenue: 5580, clinicShare: 5301, platformFee: 279, status: 'Pending', date: 'Nov 8, 2025' },
  { id: 'RM005', clinic: 'City Heart Clinic', totalBookings: 42, grossRevenue: 6300, clinicShare: 5985, platformFee: 315, status: 'Processing', date: 'Nov 7, 2025' },
];

export default function Remittance({ onNavigate }: RemittanceProps) {
  const handleExportRemittance = () => {
    toast.success('Remittance report exported successfully');
  };

  const handleProcessPayout = (id: string) => {
    toast.success(`Processing payout for ${id}`);
  };

  const totalGrossRevenue = remittanceTransactions.reduce((sum, t) => sum + t.grossRevenue, 0);
  const totalClinicShare = remittanceTransactions.reduce((sum, t) => sum + t.clinicShare, 0);
  const totalPlatformFee = remittanceTransactions.reduce((sum, t) => sum + t.platformFee, 0);
  const pendingPayouts = remittanceTransactions.filter(t => t.status === 'Pending').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-100 text-green-700">Paid</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case 'Processing':
        return <Badge className="bg-blue-100 text-blue-700">Processing</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout onNavigate={onNavigate} activeScreen="remittance">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-gray-900 mb-2">Remittance Management</h1>
            <p className="text-gray-600">Track revenue distribution and process payouts</p>
          </div>
          <Button 
            onClick={handleExportRemittance}
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            <Download className="mr-2 w-4 h-4" />
            Export Remittance
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-gray-900 mb-1">Total Revenue</h3>
            <p className="text-gray-600">${totalGrossRevenue.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">All transactions</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-gray-900 mb-1">Clinic Share (95%)</h3>
            <p className="text-gray-600">${totalClinicShare.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">To be distributed</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Wallet className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-gray-900 mb-1">Platform Fee (5%)</h3>
            <p className="text-gray-600">${totalPlatformFee.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Platform earnings</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-gray-900 mb-1">Pending Payouts</h3>
            <p className="text-gray-600">{pendingPayouts}</p>
            <p className="text-xs text-gray-500 mt-2">Awaiting processing</p>
          </Card>
        </div>

        {/* Revenue Distribution Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900">Revenue Distribution (95/5 Split)</h2>
              <p className="text-sm text-gray-600">Monthly breakdown of revenue allocation</p>
            </div>
            <Select defaultValue="6months">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="12months">Last 12 months</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="clinic" fill="#007BFF" name="Clinic Revenue (95%)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="platform" fill="#00B894" name="Platform Fee (5%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Remittance Transactions */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900">Remittance Transactions</h2>
            <p className="text-sm text-gray-600">Recent payout records</p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Clinic</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Gross Revenue</TableHead>
                  <TableHead>Clinic Share (95%)</TableHead>
                  <TableHead>Platform Fee (5%)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {remittanceTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="text-gray-900">{transaction.id}</TableCell>
                    <TableCell className="text-gray-900">{transaction.clinic}</TableCell>
                    <TableCell className="text-gray-700">{transaction.totalBookings}</TableCell>
                    <TableCell className="text-gray-900">${transaction.grossRevenue.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600">${transaction.clinicShare.toLocaleString()}</TableCell>
                    <TableCell className="text-blue-600">${transaction.platformFee.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {transaction.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      {transaction.status === 'Pending' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleProcessPayout(transaction.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Process
                        </Button>
                      )}
                      {transaction.status === 'Paid' && (
                        <Button size="sm" variant="outline">View</Button>
                      )}
                      {transaction.status === 'Processing' && (
                        <Button size="sm" variant="ghost" disabled>Processing...</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Revenue Split Information</h3>
              <p className="text-sm text-gray-600">
                The platform operates on a 95/5 revenue split model. 95% of each consultation fee goes directly to the 
                clinic/doctor, while 5% is retained as a platform fee to maintain and improve the Healthcare Base infrastructure.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
