'use client';

import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './date-picker.css';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  weddingDate?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  weddingDate: {
    startDate: Date | undefined;
    endDate: Date | undefined;
    key: string;
  };
  story: string;
}

interface SelectedDateDisplay {
  startDate: string;
  endDate: string;
}

const formatDateForInput = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};



export default function ContactPage() {
  const [errors, setErrors] = useState<FormErrors>({});

  const today = new Date();
  const formattedToday = formatDateForInput(today);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    weddingDate: {
      startDate: today,
      endDate: today,
      key: 'selection',
    },
    story: '',
  });

  const [selectedDates, setSelectedDates] = useState<SelectedDateDisplay>({
    startDate: formattedToday,
    endDate: formattedToday,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (name: string, value: string) => {
    const newErrors: FormErrors = { ...errors };

    switch (name) {
      case 'name':
        if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters long';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'phone':
        const cleanedPhone = value.replace(/[^\d]/g, '');

        if (!value) {
          delete newErrors.phone;
        } else if (
          !(
            (cleanedPhone.length === 10 && /^[6-9]\d{9}$/.test(cleanedPhone)) ||
            (cleanedPhone.length === 11 &&
              /^0[6-9]\d{9}$/.test(cleanedPhone)) ||
            (cleanedPhone.length === 12 && /^91[6-9]\d{9}$/.test(cleanedPhone))
          )
        ) {
          newErrors.phone =
            'Please enter a valid Indian phone number (e.g., 9876543210 or +91 9876543210)';
        } else {
          delete newErrors.phone;
        }
        break;
      case 'weddingDate':
        let selectedDate;
        if (typeof value === 'string') {
          selectedDate = new Date(value);
        } else {
          selectedDate = value;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          newErrors.weddingDate = 'Wedding date cannot be in the past';
        } else {
          delete newErrors.weddingDate;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length <= 5) {
      return cleaned;
    } else if (cleaned.length <= 10) {
      return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    } else {
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(
        7
      )}`;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const formattedValue = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    validateForm(name, value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    Object.entries(formData).forEach(([key, value]) => {
      if (!validateForm(key, value)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      // Format the data for Supabase
      const submissionData = {
        couple_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        wedding_start_date: formData.weddingDate.startDate,
        wedding_end_date: formData.weddingDate.endDate,
        story: formData.story
      };

      // Insert data into Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (rangesByKey: RangeKeyDict) => {
    const range = rangesByKey.selection as Range;
    const { startDate, endDate } = range;

    setFormData((prev) => ({
      ...prev,
      weddingDate: {
        startDate: startDate || today,
        endDate: endDate || today,
        key: 'selection',
      },
    }));

    const formatDate = (date: Date | undefined) => {
      if (!date) return '';
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    };

    setSelectedDates({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });

    validateForm('weddingDate', startDate?.toISOString() || '');
  };

  if (isSubmitted) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#f8f5f0] px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center p-8 rounded-lg bg-white shadow-xl w-full max-w-md mx-auto'
        >
          <h2 className='text-2xl sm:text-3xl font-serif text-[#68401b] mb-3'>
            Thank You! 🎉
          </h2>
          <p className='text-gray-700 text-sm sm:text-base mb-6'>
            We&apos;ve received your message and will get back to you soon.
          </p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='inline-block px-4 py-2 text-xs sm:text-sm text-[#68401b] border border-[#68401b]/30 
                     rounded-full hover:bg-[#68401b] hover:text-white transition-all duration-300
                     shadow-sm hover:shadow-md'
          >
            Back to Home
          </motion.a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen py-16 px-4 bg-[#f8f5f0]'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='max-w-2xl mx-auto'
      >
        <h1 className='font-serif text-4xl text-[#68401b] mb-2 text-center'>
          Let&apos;s Connect
        </h1>
        <p className='text-gray-700 mb-8 text-center'>
          We&apos;d love to hear about your special day
        </p>

        <motion.form
          onSubmit={handleFormSubmit}
          className='space-y-6 bg-white p-8 rounded-xl shadow-lg'
        >
          <div className='space-y-4'>
            {['name', 'email', 'phone', 'weddingDate'].map((field) =>
              field === 'weddingDate' ? (
                <motion.div
                  key={field}
                  whileFocus={{ scale: 1.02 }}
                  className='form-group'
                >
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Wedding Event Dates
                  </label>
                  <div className='space-y-3'>
                    <div className='flex flex-col sm:flex-row gap-4 text-sm'>
                      <div className='flex-1'>
                        <label
                          htmlFor='startDate'
                          className='text-gray-600 mb-1 block'
                        >
                          From
                        </label>
                        <input
                          id='startDate'
                          name='startDate'
                          type='text'
                          value={selectedDates.startDate}
                          readOnly
                          className='w-full p-3 border border-gray-200 rounded-lg bg-gray-50 min-h-[42px] cursor-not-allowed'
                          aria-label='Start date'
                        />
                      </div>
                      <div className='flex-1'>
                        <label
                          htmlFor='endDate'
                          className='text-gray-600 mb-1 block'
                        >
                          To
                        </label>
                        <input
                          id='endDate'
                          name='endDate'
                          type='text'
                          value={selectedDates.endDate}
                          readOnly
                          className='w-full p-3 border border-gray-200 rounded-lg bg-gray-50 min-h-[42px] cursor-not-allowed'
                          aria-label='End date'
                        />
                      </div>
                    </div>
                    <div className='border border-gray-200 rounded-lg overflow-hidden calendar-wrapper'>
                      <DateRange
                        editableDateInputs={true}
                        onChange={handleDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={[formData.weddingDate]}
                        minDate={new Date()}
                        maxDate={
                          new Date(
                            new Date().setFullYear(new Date().getFullYear() + 5)
                          )
                        }
                        rangeColors={['#68401b']}
                        color='#68401b'
                        className='text-sm'
                        showMonthAndYearPickers={true}
                        showDateDisplay={false}
                        monthDisplayFormat='MMMM yyyy'
                        weekdayDisplayFormat='EEEEEE'
                        months={1}
                        direction='horizontal'
                        preventSnapRefocus={true}
                        showPreview={false}
                      />
                    </div>
                  </div>
                  {errors.weddingDate && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.weddingDate}
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={field}
                  whileFocus={{ scale: 1.02 }}
                  className='form-group'
                >
                  <label
                    htmlFor={field}
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    {field === 'name' 
                      ? 'Couple Name'
                      : field.charAt(0).toUpperCase() +
                        field.slice(1).replace(/([A-Z])/g, ' $1')}
                    {field === 'email' && ' *'}
                  </label>
                  <input
                    type={
                      field === 'email'
                        ? 'email'
                        : field === 'weddingDate'
                        ? 'date'
                        : 'text'
                    }
                    id={field}
                    name={field}
                    value={
                      typeof formData[field as keyof typeof formData] ===
                      'object'
                        ? ''
                        : formData[field as keyof typeof formData].toString()
                    }
                    onChange={handleInputChange}
                    required={field === 'email'}
                    className={`w-full px-4 py-2 border ${
                      errors[field as keyof FormErrors]
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } rounded-lg focus:ring-2 focus:ring-[#B08E6A] focus:border-transparent transition-all`}
                  />
                  {errors[field as keyof FormErrors] && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors[field as keyof FormErrors]}
                    </p>
                  )}
                </motion.div>
              )
            )}

            <motion.div whileFocus={{ scale: 1.02 }} className='form-group'>
              <label
                htmlFor='story'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Tell us more about your story
              </label>
              <textarea
                id='story'
                name='story'
                rows={4}
                value={formData.story}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B08E6A] focus:border-transparent transition-all'
              />
            </motion.div>
          </div>

          <motion.button
            type='submit'
            disabled={isSubmitting || Object.keys(errors).length > 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='w-full bg-[#68401b] hover:bg-[#B08E6A] text-white py-3 px-6 rounded-full 
                      font-medium transition-all duration-300 ease-in-out
                      shadow-[0_4px_14px_0_rgba(198,160,124,0.39)]
                      hover:shadow-[0_6px_20px_rgba(198,160,124,0.45)]
                      disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
} 