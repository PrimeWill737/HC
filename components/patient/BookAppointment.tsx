import { useState } from 'react';
import { Search, Calendar as CalendarIcon, Clock, MapPin, Star, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '../UI/button';
import { Input } from '../UI/input';
import { Card } from '../UI/card';
import { Badge } from '../UI/badge';
import { Calendar } from '../UI/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../UI/popover';
import { RadioGroup, RadioGroupItem } from '../UI/radio-group';
import { Label } from '../UI/label';
import PatientLayout from '../shared/PatientLayout';
import { BookingData } from '../../App';
import { toast } from 'sonner';

interface BookAppointmentProps {
  onNavigate: (screen: string) => void;
  onBookingComplete: (booking: BookingData) => void;
}

const doctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    clinic: 'City Heart Clinic',
    rating: 4.9,
    reviews: 234,
    experience: '15 years',
    fee: 150,
    available: true,
    image: '👩‍⚕️',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'General Physician',
    clinic: 'Central Medical Center',
    rating: 4.8,
    reviews: 189,
    experience: '12 years',
    fee: 100,
    available: true,
    image: '👨‍⚕️',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatologist',
    clinic: 'Skin Care Excellence',
    rating: 4.9,
    reviews: 312,
    experience: '10 years',
    fee: 120,
    available: true,
    image: '👩‍⚕️',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedic',
    clinic: 'Joint & Bone Center',
    rating: 4.7,
    reviews: 156,
    experience: '18 years',
    fee: 180,
    available: false,
    image: '👨‍⚕️',
  },
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

export default function BookAppointment({ onNavigate, onBookingComplete }: BookAppointmentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');

  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.clinic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error('Please select a doctor, date, and time');
      return;
    }

    const booking: BookingData = {
      id: Math.random().toString(36).substr(2, 9),
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      clinic: selectedDoctor.clinic,
      date: selectedDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: selectedTime,
      amount: selectedDoctor.fee,
    };

    onBookingComplete(booking);
  };

  return (
    <PatientLayout onNavigate={onNavigate} activeScreen="book-appointment" userProfile={userProfile}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 mb-2">Book an Appointment</h1>
          <p className="text-gray-600">Find and schedule with top healthcare professionals</p>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by doctor name, specialty, or clinic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-lg"
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctors List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-gray-900">Available Doctors</h2>

            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className={`p-6 cursor-pointer transition-all ${
                  selectedDoctor?.id === doctor.id
                    ? 'border-2 border-blue-600 shadow-lg'
                    : 'border border-gray-200 hover:border-blue-300 hover:shadow-md'
                } ${!doctor.available ? 'opacity-60' : ''}`}
                onClick={() => doctor.available && setSelectedDoctor(doctor)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-5xl">{doctor.image}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                        {!doctor.available && (
                          <Badge variant="secondary">Not Available</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span>{doctor.rating}</span>
                          <span className="text-gray-400">({doctor.reviews})</span>
                        </div>
                        <div>{doctor.experience}</div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        {doctor.clinic}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <span className="text-gray-900">${doctor.fee}</span>
                          <span className="text-sm text-gray-500">consultation fee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Booking Panel */}
          <div className="space-y-4">
            <Card className="p-6 sticky top-24">
              <h2 className="text-gray-900 mb-4">Select Date & Time</h2>

              {selectedDoctor ? (
                <div className="space-y-4">
                  {/* Selected Doctor */}
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-1">Selected Doctor</p>
                    <p className="text-gray-900">{selectedDoctor.name}</p>
                    <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <Label className="mb-2 block">Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left rounded-lg"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            selectedDate.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          ) : (
                            <span className="text-gray-500">Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div>
                      <Label className="mb-2 block">Select Time</Label>
                      <RadioGroup value={selectedTime} onValueChange={setSelectedTime}>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((time) => (
                            <div key={time}>
                              <RadioGroupItem
                                value={time}
                                id={time}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={time}
                                className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-200 p-2 hover:bg-gray-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all text-sm"
                              >
                                <Clock className="w-3 h-3" />
                                {time}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {/* Payment Info */}
                  {selectedTime && (
                    <div className="border-t pt-4 mt-4">
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Consultation Fee</span>
                          <span className="text-gray-900">${selectedDoctor.fee}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>To Clinic (95%)</span>
                          <span>${(selectedDoctor.fee * 0.95).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Platform Fee (5%)</span>
                          <span>${(selectedDoctor.fee * 0.05).toFixed(2)}</span>
                        </div>
                      </div>

                      <Button
                        onClick={handleBookAppointment}
                        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-5"
                      >
                        Proceed to Payment
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Select a doctor to continue</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
