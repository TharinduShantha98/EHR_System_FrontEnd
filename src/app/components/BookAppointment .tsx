'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const BookAppointment = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation schema
  const schema = yup.object().shape({
    patientId: yup.string().required('Patient ID is required'),
    doctorId: yup.string().required('Doctor selection is required'),
    appointmentDate: yup.date()
      .required('Appointment date is required')
      .min(new Date(), 'Appointment date cannot be in the past'),
    appointmentTime: yup.string().required('Appointment time is required'),
    reason: yup.string().required('Reason for visit is required'),
    preferredLanguage: yup.string().required('Preferred language is required'),
    symptoms: yup.string(),
    priority: yup.string().required('Priority level is required'),
  });

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Appointment booked:', data);
      setSubmitSuccess(true);
      reset();
      // Redirect after 3 seconds
      setTimeout(() => router.push('/appointments'), 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sample data - replace with your actual data
  const doctors = [
    { id: 'doc1', name: 'Dr. Perera (Cardiologist)', specialty: 'Cardiology' },
    { id: 'doc2', name: 'Dr. Silva (Pediatrician)', specialty: 'Pediatrics' },
    { id: 'doc3', name: 'Dr. Fernando (General Physician)', specialty: 'General Medicine' },
  ];

  const availableTimes = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const languages = ['Sinhala', 'Tamil', 'English'];
  const priorities = ['Routine', 'Urgent', 'Emergency'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Book New Appointment</h2>
            <p className="text-blue-100 mt-1">
              Sri Lanka Electronic Health Record System
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mx-6 mt-4">
              <p>Appointment booked successfully! Redirecting to appointments...</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Patient Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h3>
              
              <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
                  Patient ID *
                </label>
                <input
                  id="patientId"
                  type="text"
                  {...register('patientId')}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    errors.patientId ? 'border-red-500' : 'border'
                  } ${
                    watch('patientId') ? 'text-gray-900' : 'text-gray-500'
                  }`}
                  placeholder="Enter patient ID"
                />
                {errors.patientId && (
                  <p className="mt-1 text-sm text-red-600">{errors.patientId.message}</p>
                )}
              </div>
            </div>

            {/* Appointment Details */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">
                    Select Doctor *
                  </label>
                  <select
                    id="doctorId"
                    {...register('doctorId')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.doctorId ? 'border-red-500' : 'border'
                    } ${
                      watch('doctorId') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </select>
                  {errors.doctorId && (
                    <p className="mt-1 text-sm text-red-600">{errors.doctorId.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                    Priority Level *
                  </label>
                  <select
                    id="priority"
                    {...register('priority')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.priority ? 'border-red-500' : 'border'
                    } ${
                      watch('priority') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    <option value="">Select priority</option>
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                  {errors.priority && (
                    <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
                    Appointment Date *
                  </label>
                  <input
                    id="appointmentDate"
                    type="date"
                    {...register('appointmentDate')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.appointmentDate ? 'border-red-500' : 'border'
                    } ${
                      watch('appointmentDate') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.appointmentDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.appointmentDate.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">
                    Appointment Time *
                  </label>
                  <select
                    id="appointmentTime"
                    {...register('appointmentTime')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.appointmentTime ? 'border-red-500' : 'border'
                    } ${
                      watch('appointmentTime') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    <option value="">Select time slot</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.appointmentTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.appointmentTime.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Visit Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Visit Information</h3>
              
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Reason for Visit *
                </label>
                <input
                  id="reason"
                  type="text"
                  {...register('reason')}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    errors.reason ? 'border-red-500' : 'border'
                  } ${
                    watch('reason') ? 'text-gray-900' : 'text-gray-500'
                  }`}
                  placeholder="Briefly describe the reason for visit"
                />
                {errors.reason && (
                  <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
                )}
              </div>

              <div className="mt-4">
                <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
                  Symptoms (Optional)
                </label>
                <textarea
                  id="symptoms"
                  rows={3}
                  {...register('symptoms')}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    watch('symptoms') ? 'text-gray-900' : 'text-gray-500'
                  }`}
                  placeholder="Describe any symptoms you're experiencing"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700">
                  Preferred Language for Consultation *
                </label>
                <select
                  id="preferredLanguage"
                  {...register('preferredLanguage')}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    errors.preferredLanguage ? 'border-red-500' : 'border'
                  } ${
                    watch('preferredLanguage') ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  <option value="">Select language</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
                {errors.preferredLanguage && (
                  <p className="mt-1 text-sm text-red-600">{errors.preferredLanguage.message}</p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;