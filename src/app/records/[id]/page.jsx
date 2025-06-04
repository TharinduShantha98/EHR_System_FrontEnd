// app/records/[id]/page.jsx
'use client';
import { notFound } from 'next/navigation';

// Sample data
const records = [
  {
    id: 1,
    diagnosis: 'Dengue Fever',
    date: '2023-10-15',
    doctor: 'Dr. Perera',
    hospital: 'National Hospital Colombo',
    symptoms: ['High fever', 'Joint pain', 'Fatigue'],
    treatment: 'Rest, hydration, paracetamol for fever',
    prescription: [
      { name: 'Paracetamol', dosage: '500mg every 6 hours' },
      { name: 'ORS Pack', dosage: 'As needed' },
    ],
    notes: 'Recovered after 7 days of treatment.',
    documents: [
      { id: 1, title: 'Chest X-Ray - Oct 2023', type: 'X-Ray', url: '/documents/xray_dengue.pdf' },
      { id: 2, title: 'Blood Test Report', type: 'Lab Report', url: '/images/blood_test.png' },
    ],
  },
  {
    id: 2,
    diagnosis: 'Upper Respiratory Infection',
    date: '2023-07-22',
    doctor: 'Dr. Silva',
    hospital: 'Asiri Hospital',
    symptoms: ['Cough', 'Sore throat', 'Mild fever'],
    treatment: 'Antibiotics and rest',
    prescription: [
      { name: 'Amoxicillin', dosage: '500mg every 8 hours' },
      { name: 'Cough Syrup', dosage: '10ml twice daily' },
    ],
    notes: 'Completed full course of antibiotics.',
    documents: [
      { id: 1, title: 'CT Scan - July 2023', type: 'Scan', url: '/documents/ct_scan.pdf' },
    ],
  },
];

export default function MedicalRecordDetail({ params }) {
  const { id } = params;

  // Find the record by ID
  const record = records.find((r) => r.id === parseInt(id));

  if (!record) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Medical Record Details</h1>

      {/* Main Info Card */}
      <div className="bg-white shadow rounded-lg p-6 space-y-5 border border-gray-200 mb-8">
        <h2 className="text-2xl font-semibold text-blue-700">{record.diagnosis}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <p className='text-gray-800'><strong>Date:</strong> {record.date}</p>
          <p className='text-gray-800'><strong>Hospital:</strong> {record.hospital}</p>
          <p className='text-gray-800'><strong>Doctor:</strong> {record.doctor}</p>
        </div>

        {/* Symptoms */}
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Symptoms</h3>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            {record.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>

        {/* Treatment */}
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Treatment</h3>
          <p>{record.treatment}</p>
        </div>

        {/* Prescription */}
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Prescription</h3>
          <ul className="space-y-2">
            {record.prescription.map((med, index) => (
              <li key={index} className="bg-gray-50 p-3 rounded border border-gray-100">
                <strong>{med.name}</strong> – {med.dosage}
              </li>
            ))}
          </ul>
        </div>

        {/* Notes */}
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Notes</h3>
          <p className="italic text-gray-600">{record.notes}</p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Records
        </button>
      </div>

      {/* Documents Section */}
      {record.documents && record.documents.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Attached Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {record.documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 bg-gray-50 rounded border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{doc.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">Type: {doc.type}</p>
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View / Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}