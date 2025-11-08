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
      'Completed': 'badge-completed',
      'Available': 'badge-available',
      'Active': 'badge-active',
      'Normal': 'badge-normal',
      'Slightly Elevated': 'badge-elevated',
    };
    return statusColors[status] || 'badge-secondary';
  };

  return (
    <PatientLayout onNavigate={onNavigate} activeScreen="records" userProfile={userProfile}>
      <div className="health-records-container">
        {/* Header */}
        <div className="records-header">
          <div>
            <h1 className="records-title">Health Records</h1>
            <p className="records-subtitle">View and manage your medical history and documents</p>
          </div>
          <Button 
            onClick={handleUpload}
            className="upload-button"
          >
            <Upload className="upload-icon" />
            Upload Document
          </Button>
        </div>

        {/* Vital Signs Summary */}
        <div className="vital-signs-grid">
          {vitalSigns.map((vital, index) => {
            const Icon = vital.icon;
            return (
              <Card key={index} className="vital-card">
                <div className="vital-card-content">
                  <div className={`vital-icon-container ${
                    vital.color === 'text-green-600' ? 'vital-icon-green' : 
                    vital.color === 'text-blue-600' ? 'vital-icon-blue' : 'vital-icon-gray'
                  }`}>
                    <Icon className={`vital-icon ${
                      vital.color === 'text-green-600' ? 'vital-icon-green-color' : 
                      vital.color === 'text-blue-600' ? 'vital-icon-blue-color' : 'vital-icon-gray-color'
                    }`} />
                  </div>
                  <div className="vital-info">
                    <p className="vital-label">{vital.label}</p>
                    <p className="vital-value">{vital.value}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tabs for different record types */}
        <Tabs defaultValue="all" className="tabs-container">
          <TabsList className="tabs-list">
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab">Lab Results</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* All Records Tab */}
          <TabsContent value="all" className="tabs-content">
            {/* Search and Filter */}
            <Card className="search-filter-card">
              <div className="search-filter-container">
                <div className="search-container-records">
                  <Search className="search-icon-records" />
                  <Input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input-records"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="filter-select-records">
                    <Filter className="filter-icon-records" />
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
            <div className="records-list">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="record-card">
                  <div className="record-card-content">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="record-icon-container">
                        <FileText className="record-icon" />
                      </div>
                      <div className="record-details">
                        <div className="record-header">
                          <div>
                            <h3 className="record-title">{record.title}</h3>
                            <p className="record-type">{record.type}</p>
                          </div>
                          <Badge className={getStatusBadge(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                        <div className="record-meta">
                          <div className="record-meta-item">
                            <User className="record-meta-icon" />
                            {record.doctor}
                          </div>
                          <div className="record-meta-item">
                            <Calendar className="record-meta-icon" />
                            {record.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="record-actions">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(record.title)}
                        className="button-sm button-outline"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(record.title)}
                        className="button-sm button-outline"
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
          <TabsContent value="prescriptions" className="tabs-content">
            <div className="prescriptions-grid">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="prescription-card">
                  <div className="prescription-header">
                    <div className="flex items-start gap-4">
                      <div className="prescription-icon-container">
                        <Pill className="prescription-icon" />
                      </div>
                      <div className="prescription-info">
                        <h3 className="prescription-name">{prescription.medication}</h3>
                        <p className="prescription-dosage">{prescription.dosage}</p>
                      </div>
                    </div>
                    <Badge className={getStatusBadge(prescription.status)}>
                      {prescription.status}
                    </Badge>
                  </div>
                  
                  <div className="prescription-details">
                    <div className="prescription-detail-item">
                      <p className="prescription-detail-label">Prescribed By</p>
                      <p className="prescription-detail-value">{prescription.prescribedBy}</p>
                    </div>
                    <div className="prescription-detail-item">
                      <p className="prescription-detail-label">Start Date</p>
                      <p className="prescription-detail-value">{prescription.startDate}</p>
                    </div>
                    <div className="prescription-detail-item">
                      <p className="prescription-detail-label">Duration</p>
                      <p className="prescription-detail-value">{prescription.duration}</p>
                    </div>
                    <div className="prescription-detail-item">
                      <p className="prescription-detail-label">Refills Left</p>
                      <p className="prescription-detail-value">{prescription.refills}</p>
                    </div>
                  </div>

                  <div className="prescription-actions">
                    <Button size="sm" variant="outline" className="button-sm button-outline">
                      Request Refill
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownload(prescription.medication)} className="button-sm button-outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lab Results Tab */}
          <TabsContent value="lab" className="tabs-content">
            <div className="lab-results-grid">
              {labResults.map((result) => (
                <Card key={result.id} className="lab-result-card">
                  <div className="lab-result-content">
                    <div className="lab-result-main">
                      <div className="lab-result-icon-container">
                        <TestTube className="lab-result-icon" />
                      </div>
                      <div className="lab-result-info">
                        <h3 className="lab-result-name">{result.test}</h3>
                        <div className="lab-result-meta">
                          <div className="record-meta-item">
                            <Calendar className="record-meta-icon" />
                            {result.date}
                          </div>
                          <div className="record-meta-item">
                            <User className="record-meta-icon" />
                            {result.doctor}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusBadge(result.status)}>
                        {result.status}
                      </Badge>
                    </div>
                    <div className="lab-result-actions">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(result.test)}
                        className="button-sm button-outline"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(result.test)}
                        className="button-sm button-outline"
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
          <TabsContent value="documents" className="tabs-content">
            <Card className="documents-upload-card">
              <div className="documents-upload-content">
                <div className="upload-placeholder">
                  <Upload className="upload-placeholder-icon" />
                </div>
                <h3 className="upload-title">Upload Your Documents</h3>
                <p className="upload-description">
                  Upload medical documents, insurance cards, or any health-related files
                </p>
                <Button 
                  onClick={handleUpload}
                  className="upload-primary-button"
                >
                  <Upload className="upload-icon" />
                  Choose Files to Upload
                </Button>
                <p className="upload-note">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="records-info-card">
          <div className="records-info-content">
            <div className="records-info-icon">
              <FileText className="records-info-icon-svg" />
            </div>
            <div className="records-info-text">
              <h3 className="records-info-title">Secure Health Records</h3>
              <p className="records-info-description">
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