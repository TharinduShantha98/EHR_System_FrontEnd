'use client'
import { useState } from 'react';

type Location = {
  locationId: number;
  hospitalName: string;
  address: string;
  postalCode: string;
  district: string;
};

type Doctor = {
  id: number;
  userName: string;
  specialization: string;
  bio: string;
  available: boolean;
  hospitalAddress: string;
  hospitalName: string;
};

type TimeSlot = {
  startTime: string;
  endTime: string;
  fixed: boolean;
};

type DaySchedule = {
  timeSlots: TimeSlot[];
  startDate: string;
};

type AppointmentData = {
  providerId: number;
  customerId: number;
  serviceId: number;
  notes: string;
  startTime: string;
  timeslot: number;
};

const AppointmentSystem = () => {
  // State management
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [timeSlots, setTimeSlots] = useState<DaySchedule[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    startDate: string;
    timeSlots: TimeSlot[];
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock API calls (replace with real API calls)
  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/location/allLocations`);
      const mockData = await response.json();

      if (mockData.statusCode === "002") {
        setLocations(mockData.data);
      } else {
        setError('Failed to load locations');
      }
    } catch (err) {
      setError('Error fetching locations');
    } finally {
      setLoading(false);
    }
  };

  const searchDoctors = async () => {
    if (!selectedLocation) {
      setError('Please select a location first');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/user/getServiceProvide`);
      // const mockData = await response.json();

      let dataToSend = {
        name: "Dr. John Smith",
        locationId: 1
      };

      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/user/getServiceProvide`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const mockData = await response.json();

      if (mockData.statusCode === "001") {
        setDoctors(mockData.data.filter((doctor: any) =>
          doctor.userName.toLowerCase().includes(searchQuery.toLowerCase())
        ));
        setStep(2);
      } else {
        setError('Failed to search doctors');
      }
    } catch (err) {
      setError('Error searching doctors');
    } finally {
      setLoading(false);
    }
  };

  const fetchTimeSlots = async (doctorId: number) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // const mockData = {
      //   statusCode: "001",
      //   message: "Success",
      //   data: [
      //     {
      //       timeSlots: [
      //         { startTime: "09:00:00", endTime: "12:00:00", fixed: false }
      //       ],
      //       startDate: new Date(Date.now() + 86400000 * 2).toISOString() // 2 days from now
      //     },
      //     {
      //       timeSlots: [
      //         { startTime: "08:30:00", endTime: "16:30:00", fixed: false }
      //       ],
      //       startDate: new Date(Date.now() + 86400000 * 3).toISOString() // 3 days from now
      //     },
      //     {
      //       timeSlots: [
      //         { startTime: "10:00:00", endTime: "12:00:00", fixed: false },
      //         { startTime: "14:00:00", endTime: "16:00:00", fixed: false }
      //       ],
      //       startDate: new Date(Date.now() + 86400000 * 5).toISOString() // 5 days from now
      //     }
      //   ]
      // };

      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/schedule/getTimeSlot?providerId=2`);
      const mockData = await response.json();

      if (mockData.statusCode === "001") {
        setTimeSlots(mockData.data);
        setStep(3);
      } else {
        setError('Failed to load time slots');
      }
    } catch (err) {
      setError('Error fetching time slots');
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async () => {
    if (!selectedDoctor || !selectedTimeSlot) {
      setError('Please select a doctor and time slot');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockData = {
        statusCode: "002",
        message: "Success",
        data: null
      };

      if (mockData.statusCode === "002") {
        setSuccess(true);
        setStep(4);
      } else {
        setError('Failed to book appointment');
      }
    } catch (err) {
      setError('Error booking appointment');
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time for display (remove seconds)
  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedLocation(null);
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
    setNotes('');
    setSearchQuery('');
    setSuccess(false);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-extrabold text-center text-blue-800 my-10 underline">ONLINE APPOINTMENTS</h1>

      {/* Progress indicator */}
      <div className="flex justify-between items-center mb-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {stepNumber}
            </div>
            <span className="text-xs mt-1 text-gray-600">
              {stepNumber === 1 && 'Location'}
              {stepNumber === 2 && 'Doctor'}
              {stepNumber === 3 && 'Time'}
              {stepNumber === 4 && 'Confirm'}
            </span>
          </div>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
          <p>Appointment booked successfully!</p>
        </div>
      )}

      {/* Step 1: Location Selection */}
      {step === 1 && (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              <span className="text-blue-600">1.</span> Select Hospital Location
            </h2>
            <p className="text-gray-500 mt-2">Choose a hospital near you to find available doctors</p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={fetchLocations}
                disabled={loading}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${loading
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5 shadow-md'
                  } text-white flex items-center justify-center space-x-2`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {locations.length ? 'Refreshing...' : 'Loading...'}
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    {locations.length ? 'Refresh Locations' : 'Load Locations'}
                  </>
                )}
              </button>

              {locations.length > 0 && (
                <div className="flex-1 relative">
                  <select
                    value={selectedLocation?.locationId || ''}
                    onChange={(e) => {
                      const loc = locations.find(l => l.locationId === Number(e.target.value));
                      setSelectedLocation(loc || null);
                    }}
                    className="w-full pl-4 pr-10 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a hospital location</option>
                    {locations.map(location => (
                      <option key={location.locationId} value={location.locationId}>
                        {location.hospitalName} - {location.district}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {selectedLocation && (
              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 transition-all duration-300 hover:shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-blue-800">{selectedLocation.hospitalName}</h3>
                    <p className="text-gray-700 mt-1">{selectedLocation.address}</p>
                    <p className="text-gray-600 mt-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {selectedLocation.district}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedLocation && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all transform hover:-translate-y-0.5 shadow-md flex items-center space-x-2"
                >
                  <span>Next: Find Doctor</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Doctor Selection */}
      {step === 2 && (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                <span className="text-blue-600">2.</span> Find a Doctor
              </h2>
              <p className="text-gray-500 mt-1">Search and select a doctor for your appointment</p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-3 sm:mt-0 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Change Location
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by doctor name or specialization"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={searchDoctors}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${loading
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5 shadow-md'
                } text-white flex items-center justify-center space-x-2`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  Search Doctors
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            {doctors.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-700">No doctors found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              doctors.map(doctor => (
                <div
                  key={doctor.id}
                  className={`p-6 rounded-xl border transition-all cursor-pointer ${selectedDoctor?.id === doctor.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    fetchTimeSlots(doctor.id);
                  }}
                >
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                        {doctor.userName.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-xl font-semibold text-gray-800">{doctor.userName}</h3>
                        <span className={`inline-flex items-center mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${doctor.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {doctor.available ? 'Available Today' : 'Not Available'}
                        </span>
                      </div>
                      <p className="mt-1 text-blue-600 font-medium">{doctor.specialization}</p>
                      <p className="mt-2 text-gray-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {doctor.hospitalName}
                      </p>
                      {selectedDoctor?.id === doctor.id && timeSlots.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Available Time Slots:</h4>
                          <div className="flex flex-wrap gap-2">
                            {timeSlots.map((slot, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-full text-sm hover:bg-blue-50 transition-colors"
                              >
                                {/* {slot} */}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedDoctor && (
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDoctor}
                className={`px-8 py-3 text-white font-medium rounded-lg transition-all transform hover:-translate-y-0.5 shadow-md flex items-center space-x-2 ${selectedDoctor ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
                  }`}
              >
                <span>Next: Confirm Appointment</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Time Slot Selection */}
      {step === 3 && selectedDoctor && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-blue-700">3. Select Appointment Time</h2>
            <button
              onClick={() => setStep(2)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              ← Change Doctor
            </button>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                {selectedDoctor.userName.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium">{selectedDoctor.userName}</h3>
                <p className="text-blue-600">{selectedDoctor.specialization}</p>
                <p className="text-gray-600">{selectedDoctor.hospitalName}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-medium text-lg">Available Time Slots</h3>

            {timeSlots.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No available time slots found for this doctor.
              </div>
            ) : (
              <div className="grid gap-6">
                {timeSlots.map((slot, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-medium">{formatDate(slot.startDate)}</h4>
                    </div>
                    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                      {slot.timeSlots.map((time, idx) => (
                        <button
                          key={idx}
                          className={`py-2 px-3 rounded-md text-center ${selectedTimeSlot?.startDate === slot.startDate &&
                            selectedTimeSlot?.timeSlots[0].startTime === time.startTime
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          onClick={() => setSelectedTimeSlot({
                            ...slot,
                            timeSlots: [time]
                          })}
                        >
                          {formatTime(time.startTime)} - {formatTime(time.endTime)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedTimeSlot && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg space-y-4">
              <h3 className="font-medium text-lg">Appointment Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(selectedTimeSlot.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">
                    {formatTime(selectedTimeSlot.timeSlots[0].startTime)} - {formatTime(selectedTimeSlot.timeSlots[0].endTime)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium">{selectedDoctor.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Specialization</p>
                  <p className="font-medium">{selectedDoctor.specialization}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any special notes for your appointment..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={bookAppointment}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="text-center space-y-6 py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">Appointment Confirmed!</h2>

          <div className="max-w-md mx-auto bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium">{selectedDoctor?.userName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Specialization</p>
                <p className="font-medium">{selectedDoctor?.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {selectedTimeSlot && formatDate(selectedTimeSlot.startDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">
                  {selectedTimeSlot && `${formatTime(selectedTimeSlot.timeSlots[0].startTime)} - ${formatTime(selectedTimeSlot.timeSlots[0].endTime)}`}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hospital</p>
                <p className="font-medium">{selectedDoctor?.hospitalName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{selectedLocation?.district}</p>
              </div>
            </div>

            {notes && (
              <div>
                <p className="text-sm text-gray-500">Notes</p>
                <p className="font-medium">{notes}</p>
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={resetForm}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentSystem;