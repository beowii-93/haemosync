'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, AlertTriangle, Send } from 'lucide-react';

const requestSchema = z.object({
  hospitalName: z.string().min(2, 'Hospital name is required'),
  contactPerson: z.string().min(2, 'Contact person is required'),
  contactNumber: z.string().min(10, 'Invalid contact number'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  unitsRequired: z.number().min(1, 'At least 1 unit is required'),
  urgency: z.enum(['Normal', 'High', 'Critical']),
  address: z.string().min(5, 'Hospital address is required'),
  patientDetails: z.string().optional(),
});

type RequestData = z.infer<typeof requestSchema>;

export default function RequestPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestData>({
    resolver: zodResolver(requestSchema),
  });

  const onSubmit = (data: RequestData) => {
    // Simulate API call and WhatsApp notification trigger
    console.log('Request Data:', data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-slate-900">Emergency Request Sent!</h1>
        <p className="mb-8 text-lg text-slate-600">
          Your request for blood has been broadcasted to nearby eligible donors via WhatsApp. You will be notified as soon as donors accept the request.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="rounded-lg bg-rose-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-rose-700"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Request Blood</h1>
        <p className="mt-2 text-slate-600">Hospitals and blood banks can broadcast emergency requests to nearby donors.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-6 flex items-start gap-4 rounded-xl bg-amber-50 p-4 text-amber-800">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">
            <strong>Note:</strong> Critical requests will immediately trigger WhatsApp notifications to all eligible donors within a 10km radius. Please use this feature responsibly.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Hospital/Clinic Name</label>
              <input {...register('hospitalName')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
              {errors.hospitalName && <p className="mt-1 text-xs text-red-500">{errors.hospitalName.message}</p>}
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Contact Person</label>
              <input {...register('contactPerson')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
              {errors.contactPerson && <p className="mt-1 text-xs text-red-500">{errors.contactPerson.message}</p>}
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Contact Number</label>
              <input {...register('contactNumber')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
              {errors.contactNumber && <p className="mt-1 text-xs text-red-500">{errors.contactNumber.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Required Blood Group</label>
              <select {...register('bloodGroup')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500">
                <option value="">Select...</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
              {errors.bloodGroup && <p className="mt-1 text-xs text-red-500">{errors.bloodGroup.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Units Required</label>
              <input type="number" {...register('unitsRequired', { valueAsNumber: true })} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
              {errors.unitsRequired && <p className="mt-1 text-xs text-red-500">{errors.unitsRequired.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Urgency Level</label>
              <div className="grid grid-cols-3 gap-4">
                {['Normal', 'High', 'Critical'].map((level) => (
                  <label key={level} className="relative flex cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50 has-[:checked]:border-rose-600 has-[:checked]:bg-rose-50 has-[:checked]:ring-1 has-[:checked]:ring-rose-600">
                    <input type="radio" value={level} {...register('urgency')} className="sr-only" />
                    <span className="text-sm font-medium text-slate-900">{level}</span>
                  </label>
                ))}
              </div>
              {errors.urgency && <p className="mt-1 text-xs text-red-500">{errors.urgency.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Hospital Address</label>
              <textarea {...register('address')} rows={3} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
              {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Patient Details (Optional)</label>
              <textarea {...register('patientDetails')} rows={2} placeholder="Any specific requirements or patient info..." className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-rose-600 py-3 font-semibold text-white transition-colors hover:bg-rose-700"
          >
            <Send className="h-5 w-5" />
            Broadcast Request via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
