'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Droplet, CheckCircle2, AlertCircle } from 'lucide-react';
import { differenceInDays, addDays, format } from 'date-fns';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'Invalid mobile number'),
  aadhar: z.string().length(12, 'Aadhar must be 12 digits'),
  address: z.string().min(5, 'Address is required'),
  occupation: z.string().min(2, 'Occupation is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  age: z.number().min(18, 'Must be at least 18 years old').max(65, 'Must be under 65 years old'),
  gender: z.enum(['Male', 'Female', 'Other']),
  weight: z.number().min(45, 'Weight must be at least 45kg'),
  height: z.number().min(100, 'Height is required (cm)'),
  hivPositive: z.enum(['Yes', 'No']),
  lastDonation: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [eligibilityResult, setEligibilityResult] = useState<{ eligible: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    // Calculate BMI
    const heightInMeters = data.height / 100;
    const bmi = data.weight / (heightInMeters * heightInMeters);

    // Check Eligibility
    let isEligible = true;
    let message = 'You are eligible to donate blood!';

    if (data.hivPositive === 'Yes') {
      isEligible = false;
      message = 'You are not eligible to donate blood due to health history (HIV Positive).';
    } else if (data.age < 18 || data.age > 65) {
      isEligible = false;
      message = 'Age must be between 18 and 65 years.';
    } else if (data.weight < 45) {
      isEligible = false;
      message = 'Weight must be at least 45kg to donate.';
    } else if (data.lastDonation) {
      const lastDonationDate = new Date(data.lastDonation);
      const daysSinceLastDonation = differenceInDays(new Date(), lastDonationDate);
      if (daysSinceLastDonation < 90) {
        isEligible = false;
        const nextEligibleDate = addDays(lastDonationDate, 90);
        const formattedDate = format(nextEligibleDate, 'MMMM do, yyyy');
        message = `You must wait 90 days between donations. You will be eligible to donate again on ${formattedDate}.`;
      }
    }

    setEligibilityResult({ eligible: isEligible, message });
    setStep(3); // Result step
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Donor Registration & Screening</h1>
        <p className="mt-2 text-slate-600">Complete your profile and health screening to join the network.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        {/* Progress Bar */}
        <div className="mb-8 flex items-center justify-between">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-rose-600' : 'text-slate-400'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 1 ? 'border-rose-600 bg-rose-50' : 'border-slate-300'}`}>1</div>
            <span className="mt-2 text-xs font-medium">Personal Info</span>
          </div>
          <div className={`h-1 flex-1 ${step >= 2 ? 'bg-rose-600' : 'bg-slate-200'} mx-4 rounded-full`} />
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-rose-600' : 'text-slate-400'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 2 ? 'border-rose-600 bg-rose-50' : 'border-slate-300'}`}>2</div>
            <span className="mt-2 text-xs font-medium">Health Screening</span>
          </div>
          <div className={`h-1 flex-1 ${step >= 3 ? 'bg-rose-600' : 'bg-slate-200'} mx-4 rounded-full`} />
          <div className={`flex flex-col items-center ${step >= 3 ? 'text-rose-600' : 'text-slate-400'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 3 ? 'border-rose-600 bg-rose-50' : 'border-slate-300'}`}>3</div>
            <span className="mt-2 text-xs font-medium">Result</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                  <input {...register('fullName')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
                  {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                  <input type="email" {...register('email')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Mobile Number</label>
                  <input {...register('mobile')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
                  {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Aadhar Number</label>
                  <input {...register('aadhar')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
                  {errors.aadhar && <p className="mt-1 text-xs text-red-500">{errors.aadhar.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
                  <input {...register('address')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
                  {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-700">Occupation</label>
                  <input {...register('occupation')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
                  {errors.occupation && <p className="mt-1 text-xs text-red-500">{errors.occupation.message}</p>}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-6 w-full rounded-lg bg-slate-900 py-3 font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Continue to Health Screening
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Blood Group</label>
                  <select {...register('bloodGroup')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500">
                    <option value="">Select...</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                  {errors.bloodGroup && <p className="mt-1 text-xs text-red-500">{errors.bloodGroup.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Gender</label>
                  <select {...register('gender')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500">
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Age</label>
                  <input type="number" {...register('age', { valueAsNumber: true })} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
                  {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Weight (kg)</label>
                  <input type="number" {...register('weight', { valueAsNumber: true })} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
                  {errors.weight && <p className="mt-1 text-xs text-red-500">{errors.weight.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Height (cm)</label>
                  <input type="number" {...register('height', { valueAsNumber: true })} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
                  {errors.height && <p className="mt-1 text-xs text-red-500">{errors.height.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">HIV Positive?</label>
                  <select {...register('hivPositive')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500">
                    <option value="">Select...</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                  {errors.hivPositive && <p className="mt-1 text-xs text-red-500">{errors.hivPositive.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-700">Last Donation Date (if any)</label>
                  <input type="date" {...register('lastDonation')} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 rounded-lg border border-slate-300 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 rounded-lg bg-rose-600 py-3 font-semibold text-white transition-colors hover:bg-rose-700"
                >
                  Submit & Check Eligibility
                </button>
              </div>
            </div>
          )}

          {step === 3 && eligibilityResult && (
            <div className="flex flex-col items-center justify-center space-y-6 py-8 text-center animate-in zoom-in-95">
              {eligibilityResult.eligible ? (
                <>
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Registration Successful!</h2>
                  <p className="text-lg text-slate-600">{eligibilityResult.message}</p>
                  <div className="w-full rounded-xl bg-slate-50 p-6 text-left">
                    <h3 className="mb-4 font-semibold text-slate-900">Next Steps:</h3>
                    <ul className="list-inside list-disc space-y-2 text-slate-600">
                      <li>Your profile has been added to our secure database.</li>
                      <li>You will receive WhatsApp notifications for emergencies near you.</li>
                      <li>Keep your location updated for better matching.</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
                    <AlertCircle className="h-12 w-12 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Not Eligible</h2>
                  <p className="text-lg text-slate-600">{eligibilityResult.message}</p>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-4 rounded-lg border border-slate-300 px-6 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Go Back
                  </button>
                </>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
