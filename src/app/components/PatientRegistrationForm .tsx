'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const PatientRegistrationForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation schema
  const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    middleName: yup.string(),
    lastName: yup.string().required('Last name is required'),
    dob: yup.date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be in the future'),
    gender: yup.string().required('Gender is required'),
    ethnicity: yup.string().required('Ethnicity is required'),
    maritalStatus: yup.string().required('Marital status is required'),
    street: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    district: yup.string().required('District is required'),
    postalCode: yup.string()
      .required('Postal code is required')
      .matches(/^\d{5}$/, 'Postal code must be 5 digits'),
    phone: yup.string()
      .required('Phone number is required')
      .matches(/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/, 'Enter a valid Sri Lankan phone number'),
    email: yup.string().email('Invalid email format'),
    language: yup.string().required('Preferred language is required'),
    emergencyContactName: yup.string().required('Emergency contact name is required'),
    emergencyContactRelationship: yup.string().required('Relationship is required'),
    emergencyContactPhone: yup.string()
      .required('Emergency contact phone is required')
      .matches(/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/, 'Enter a valid Sri Lankan phone number'),
  });

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      setSubmitSuccess(true);
      reset();
      // Redirect after 3 seconds
      setTimeout(() => router.push('/dashboard'), 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sri Lankan specific options
  const ethnicities = [
    'Sinhalese', 'Sri Lankan Tamil', 'Indian Tamil', 
    'Sri Lankan Moor', 'Burgher', 'Malay', 'Other'
  ];

  const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
    'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
    'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
    'Matale', 'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya',
    'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ];

  const languages = [
    'Sinhala', 'Tamil', 'English'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Patient Registration</h2>
            <p className="text-blue-100 mt-1">
              Sri Lanka Electronic Health Record System
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mx-6 mt-4">
              <p>Registration successful! Redirecting to dashboard...</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...register('firstName')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.firstName ? 'border-red-500' : 'border'
                    } ${
                      watch('firstName') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
                    Middle Name
                  </label>
                  <input
                    id="middleName"
                    type="text"
                    {...register('middleName')}
                    className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      watch('middleName') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                    placeholder="Enter middle name"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...register('lastName')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.lastName ? 'border-red-500' : 'border'
                    } ${
                      watch('lastName') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                    Date of Birth *
                  </label>
                  <input
                    id="dob"
                    type="date"
                    {...register('dob')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.dob ? 'border-red-500' : 'border'
                    } ${
                      watch('dob') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  />
                  {errors.dob && (
                    <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    {...register('gender')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.gender ? 'border-red-500' : 'border'
                    } ${
                      watch('gender') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="ethnicity" className="block text-sm font-medium text-gray-700">
                    Ethnicity *
                  </label>
                  <select
                    id="ethnicity"
                    {...register('ethnicity')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.ethnicity ? 'border-red-500' : 'border'
                    } ${
                      watch('ethnicity') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    <option value="">Select Ethnicity</option>
                    {ethnicities.map((ethnicity) => (
                      <option key={ethnicity} value={ethnicity}>{ethnicity}</option>
                    ))}
                  </select>
                  {errors.ethnicity && (
                    <p className="mt-1 text-sm text-red-600">{errors.ethnicity.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">
                  Marital Status *
                </label>
                <select
                  id="maritalStatus"
                  {...register('maritalStatus')}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    errors.maritalStatus ? 'border-red-500' : 'border'
                  } ${
                    watch('maritalStatus') ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  <option value="">Select Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                  <option value="separated">Separated</option>
                </select>
                {errors.maritalStatus && (
                  <p className="mt-1 text-sm text-red-600">{errors.maritalStatus.message}</p>
                )}
              </div>
            </div>

            {/* Address Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
              
              <div className="mt-4">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Street Address *
                </label>
                <input
                  id="street"
                  type="text"
                  {...register('street')}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    errors.street ? 'border-red-500' : 'border'
                  } ${
                    watch('street') ? 'text-gray-900' : 'text-gray-500'
                  }`}
                  placeholder="Enter street address"
                />
                {errors.street && (
                  <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City *
                  </label>
                  <input
                    id="city"
                    type="text"
                    {...register('city')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.city ? 'border-red-500' : 'border'
                    } ${
                      watch('city') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                    placeholder="Enter city"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                    District *
                  </label>
                  <select
                    id="district"
                    {...register('district')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.district ? 'border-red-500' : 'border'
                    } ${
                      watch('district') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  Postal Code *
                </label>
                <input
                  id="postalCode"
                  type="text"
                  {...register('postalCode')}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    errors.postalCode ? 'border-red-500' : 'border'
                  } ${
                    watch('postalCode') ? 'text-gray-900' : 'text-gray-500'
                  }`}
                  placeholder="e.g., 10100"
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                )}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.phone ? 'border-red-500' : 'border'
                    } ${
                      watch('phone') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                    placeholder="e.g., 0712345678"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.email ? 'border-red-500' : 'border'
                    } ${
                      watch('email') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                    placeholder="optional@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  Preferred Language *
                </label>
                <select
                  id="language"
                  {...register('language')}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    errors.language ? 'border-red-500' : 'border'
                  } ${
                    watch('language') ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  <option value="">Select Language</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
                {errors.language && (
                  <p className="mt-1 text-sm text-red-600">{errors.language.message}</p>
                )}
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    id="emergencyContactName"
                    type="text"
                    {...register('emergencyContactName')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.emergencyContactName ? 'border-red-500' : 'border'
                    } ${
                      watch('emergencyContactName') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.emergencyContactName && (
                    <p className="mt-1 text-sm text-red-600">{errors.emergencyContactName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="emergencyContactRelationship" className="block text-sm font-medium text-gray-700">
                    Relationship *
                  </label>
                  <input
                    id="emergencyContactRelationship"
                    type="text"
                    {...register('emergencyContactRelationship')}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.emergencyContactRelationship ? 'border-red-500' : 'border'
                    } ${
                      watch('emergencyContactRelationship') ? 'text-gray-900' : 'text-gray-500'
                    }`}
                    placeholder="e.g., Spouse, Parent"
                  />
                  {errors.emergencyContactRelationship && (
                    <p className="mt-1 text-sm text-red-600">{errors.emergencyContactRelationship.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  id="emergencyContactPhone"
                  type="tel"
                  {...register('emergencyContactPhone')}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                    errors.emergencyContactPhone ? 'border-red-500' : 'border'
                  } ${
                    watch('emergencyContactPhone') ? 'text-gray-900' : 'text-gray-500'
                  }`}
                  placeholder="e.g., 0712345678"
                />
                {errors.emergencyContactPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.emergencyContactPhone.message}</p>
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
                {isSubmitting ? 'Registering...' : 'Register Patient'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistrationForm;