import { useState } from 'react';
import { FileText, Download, Eye, Upload, Calendar, User, Activity, Pill, TestTube, Heart, Filter, Search } from 'lucide-react';
import { Button } from '../UI/button';
import { Card } from '../UI/card';
import { Badge } from '../UI/badge';
import { Input } from '../UI/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../UI/tabs';
import PatientLayout from '../shared/PatientLayout';
import { toast } from 'sonner';

interface HealthRecordsProps {
  onNavigate: (screen: string) => void;
  userProfile: {
    name: string;
    email: string;
    phone: string;
  };
}

const medicalRecords = [
  { id: 1, type: 'Consultation', title: 'General Checkup', doctor: 'Dr. Sarah Johnson', date: 'Oct 15, 2025', category: 'General', status: 'Completed' },
  { id: 2, type: 'Lab Result', title: 'Blood Test - Complete Panel', doctor: 'Dr. Michael Chen', date: 'Oct 10, 2025', category: 'Lab', status: 'Available' },
  { id: 3, type: 'Prescription', title: 'Hypertension Medication', doctor: 'Dr. Sarah Johnson', date: 'Oct 15, 2025', category: 'Prescription', status: 'Active' },
  { id: 4, type: 'Imaging', title: 'Chest X-Ray', doctor: 'Dr. Emily Rodriguez', date: 'Sep 28, 2025', category: 'Imaging', status: 'Completed' },
  { id: 5, type: 'Lab Result', title: 'Cholesterol Panel', doctor: 'Dr. Michael Chen', date: 'Sep 20, 2025', category: 'Lab', status: 'Available' },
];

const prescriptions = [
  { id: 1, medication: 'Lisinopril 10mg', dosage: '1 tablet daily', prescribedBy: 'Dr. Sarah Johnson', startDate: 'Oct 15, 2025', duration: '90 days', status: 'Active', refills: 2 },
  { id: 2, medication: 'Atorvastatin 20mg', dosage: '1 tablet at bedtime', prescribedBy: 'Dr. Michael Chen', startDate: 'Sep 20, 2025', duration: '90 days', status: 'Active', refills: 3 },
  { id: 3, medication: 'Vitamin D3 2000 IU', dosage: '1 tablet daily', prescribedBy: 'Dr. Emily Rodriguez', startDate: 'Aug 10, 2025', duration: '180 days', status: 'Active', refills: 1 },
];

const labResults = [
  { id: 1, test: 'Complete Blood Count', date: 'Oct 10, 2025', status: 'Normal', doctor: 'Dr. Michael Chen' },
  { id: 2, test: 'Lipid Panel', date: 'Oct 10, 2025', status: 'Slightly Elevated', doctor: 'Dr. Michael Chen' },
  { id: 3, test: 'Glucose Level', date: 'Oct 10, 2025', status: 'Normal', doctor: 'Dr. Michael Chen' },
  { id: 4, test: 'Kidney Function', date: 'Sep 20, 2025', status: 'Normal', doctor: 'Dr. Sarah Johnson' },
  { id: 5, test: 'Liver Function', date: 'Sep 20, 2025', status: 'Normal', doctor: 'Dr. Sarah Johnson' },
];

const vitalSigns = [
  { label: 'Blood Pressure', value: '120/80 mmHg', status: 'Normal', icon: Heart, color: 'text-green-600' },
  { label: 'Heart Rate', value: '72 bpm', status: 'Normal', icon: Activity, color: 'text-green-600' },
  { label: 'Blood Type', value: 'A+', status: 'Info', icon: TestTube, color: 'text-blue-600' },
  { label: 'Allergies', value: 'None', status: 'Info', icon: Pill, color: 'text-gray-600' },
];

export default function HealthRecords({ onNavigate, userProfile }: HealthRecordsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || record.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (title: string) => {
    toast.success(`Downloading ${title}...`);
  };

  const handleView = (title: string) => {
    toast.info(`Opening ${title}...`);
  };

  const handleUpload = () => {
    toast.success('File upload initiated');
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      'Completed': 'bg-green-100 text-green-700',
      'Available': 'bg-blue-100 text-blue-700',
      'Active': 'bg-green-100 text-green-700',
      'Normal': 'bg-green-100 text-green-700',
      'Slightly Elevated': 'bg-yellow-100 text-yellow-700',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <PatientLayout onNavigate={onNavigate} activeScreen="records" userProfile={userProfile}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-gray-900 mb-2">Health Records</h1>
            <p className="text-gray-600">View and manage your medical history and documents</p>
          </div>
          <Button 
            onClick={handleUpload}
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            <Upload className="mr-2 w-4 h-4" />
            Upload Document
          </Button>
        </div>

        {/* Vital Signs Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {vitalSigns.map((vital, index) => {
            const Icon = vital.icon;
            return (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${vital.color === 'text-green-600' ? 'bg-green-100' : vital.color === 'text-blue-600' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <Icon className={`w-5 h-5 ${vital.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{vital.label}</p>
                    <p className="text-gray-900 mt-1">{vital.value}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tabs for different record types */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab">Lab Results</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* All Records Tab */}
          <TabsContent value="all" className="space-y-4 mt-6">
            {/* Search and Filter */}
            <Card className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-lg"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48 rounded-lg">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="lab">Lab Results</SelectItem>
                    <SelectItem value="prescription">Prescriptions</SelectItem>
                    <SelectItem value="imaging">Imaging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Records List */}
            <div className="space-y-3">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-gray-900">{record.title}</h3>
                            <p className="text-sm text-gray-600">{record.type}</p>
                          </div>
                          <Badge className={getStatusBadge(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {record.doctor}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {record.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(record.title)}
                        className="rounded-lg"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(record.title)}
                        className="rounded-lg"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Pill className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900">{prescription.medication}</h3>
                        <p className="text-sm text-gray-600 mt-1">{prescription.dosage}</p>
                      </div>
                    </div>
                    <Badge className={getStatusBadge(prescription.status)}>
                      {prescription.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4">
                    <div>
                      <p className="text-xs text-gray-500">Prescribed By</p>
                      <p className="text-sm text-gray-900 mt-1">{prescription.prescribedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="text-sm text-gray-900 mt-1">{prescription.startDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm text-gray-900 mt-1">{prescription.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Refills Left</p>
                      <p className="text-sm text-gray-900 mt-1">{prescription.refills}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="rounded-lg">
                      Request Refill
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownload(prescription.medication)} className="rounded-lg">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lab Results Tab */}
          <TabsContent value="lab" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {labResults.map((result) => (
                <Card key={result.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <TestTube className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900">{result.test}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {result.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {result.doctor}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusBadge(result.status)}>
                        {result.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(result.test)}
                        className="rounded-lg"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(result.test)}
                        className="rounded-lg"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-6">
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-gray-900 mb-2">Upload Your Documents</h3>
                <p className="text-gray-600 mb-6">
                  Upload medical documents, insurance cards, or any health-related files
                </p>
                <Button 
                  onClick={handleUpload}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  <Upload className="mr-2 w-4 h-4" />
                  Choose Files to Upload
                </Button>
                <p className="text-xs text-gray-500 mt-4">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Secure Health Records</h3>
              <p className="text-sm text-gray-600">
                All your health records are encrypted and stored securely. You have full control over who can 
                access your medical information. Download or share records with healthcare providers anytime.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PatientLayout>
  );
}
