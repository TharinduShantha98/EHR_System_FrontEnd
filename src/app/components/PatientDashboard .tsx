'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const PatientDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('records');
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [nearbyHospitals, setNearbyHospitals] = useState<any>([]);

  // Sample Data
  const medicalRecords = [
    { id: 1, date: '2023-10-15', diagnosis: 'Dengue Fever', doctor: 'Dr. Perera', hospital: 'National Hospital Colombo' },
    { id: 2, date: '2023-07-22', diagnosis: 'Upper Respiratory Infection', doctor: 'Dr. Silva', hospital: 'Asiri Hospital' },
  ];

  const vaccinations = [
    { id: 1, name: 'COVID-19 Booster', date: '2023-09-10', location: 'Colombo Municipal Council' },
    { id: 2, name: 'Influenza Vaccine', date: '2023-04-15', location: 'General Hospital Kandy' },
  ];

  const appointments = [
    { id: 1, doctor: 'Dr. Fernando', date: '2023-11-20', time: '10:30 AM', hospital: 'Nawaloka Hospital' },
  ];


  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getAllHospitals();
  }, []);

  const getAllHospitals = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/location/allLocations`);
    const data = await response.json();
    setNearbyHospitals(data?.data);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'records':
        return (
          <motion.div key="records" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Medical Records</h3>
            <div className="space-y-4">
              {medicalRecords.map((record) => (
                <motion.div
                  key={record.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-md border border-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{record.diagnosis}</h4>
                      <p className="text-sm text-gray-600">{record.date} • {record.hospital}</p>
                    </div>
                    <button
                      onClick={() => router.push(`/records/${record.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'vaccination':
        return (
          <motion.div key="vaccination" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Vaccination History</h3>
            <div className="space-y-4">
              {vaccinations.map((vaccine) => (
                <motion.div
                  key={vaccine.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-md border border-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{vaccine.name}</h4>
                      <p className="text-sm text-gray-600">Received on {vaccine.date} at {vaccine.location}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Completed</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'appointments':
        return (
          <motion.div key="appointments" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h3>
              <button
                onClick={() => router.push('/book-appointment')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Book New Appointment
              </button>
            </div>
            <div className="space-y-4">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-white rounded-lg shadow hover:shadow-md border border-gray-100"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">Consultation with {appointment.doctor}</h4>
                        <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                        <p className="text-sm text-gray-600 mt-1">{appointment.hospital}</p>
                      </div>
                      <button
                        onClick={() => router.push(`/appointments/${appointment.id}`)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 text-center bg-white rounded-lg border border-gray-100"
                >
                  <p className="text-gray-600">No upcoming appointments</p>
                  <button
                    onClick={() => router.push('/book-appointment')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Book Your First Appointment
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      case 'nearby':
        return (
          <motion.div key="nearby" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Nearby Hospitals</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyHospitals.map((hospital: any) => (
                <motion.div
                  key={hospital.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-lg border border-gray-100"
                >
                  <h4 className="font-medium text-gray-900">{hospital.hospitalName}</h4>
                  <p className="text-sm text-gray-600">Distance: {hospital.district}</p>
                  <p className="text-sm text-gray-600 mt-1">{hospital.address}</p>
                  <p className="text-sm text-gray-600 mt-1">📞 {hospital.postalCode}</p>
                  <button
                    onClick={() => window.open(`https://maps.google.com/?q= ${encodeURIComponent(hospital.name)}`, '_blank')}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Get Directions
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">National EHR System</h1>
            <p className="text-sm text-gray-600">Sri Lanka Health Services</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                JP
              </div>
              <span className="ml-2 text-gray-700">John Perera</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800">{greeting}, John</h2>
          <p className="text-gray-600">Welcome to your electronic health record portal</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'records', name: 'Medical Records' },
              { id: 'vaccination', name: 'Vaccination' },
              { id: 'appointments', name: 'Doctor Appointments' },
              { id: 'nearby', name: 'Nearby Hospitals' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h4 className="font-medium text-gray-900 mb-2">Emergency Contacts</h4>
            <p className="text-sm text-gray-600 mb-3">Access emergency numbers and nearby hospitals</p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Contacts
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h4 className="font-medium text-gray-900 mb-2">Prescription Refill</h4>
            <p className="text-sm text-gray-600 mb-3">Request refills for your current medications</p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Request Refill
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h4 className="font-medium text-gray-900 mb-2">Health Tips</h4>
            <p className="text-sm text-gray-600 mb-3">Seasonal health advice from Sri Lankan doctors</p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Read More
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PatientDashboard;