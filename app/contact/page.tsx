'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  weddingDate?: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    story: ''
  });

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
        }
        else if (
          !(
            (cleanedPhone.length === 10 && /^[6-9]\d{9}$/.test(cleanedPhone)) ||
            (cleanedPhone.length === 11 && /^0[6-9]\d{9}$/.test(cleanedPhone)) ||
            (cleanedPhone.length === 12 && /^91[6-9]\d{9}$/.test(cleanedPhone))
          )
        ) {
          newErrors.phone = 'Please enter a valid Indian phone number (e.g., 9876543210 or +91 9876543210)';
        } else {
          delete newErrors.phone;
        }
        break;
      case 'weddingDate':
        const selectedDate = new Date(value);
        const today = new Date();
        if (value && selectedDate < today) {
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
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedValue = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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

    if (isValid) {
      setIsSubmitting(true);
      try {
        const response = await fetch('https://submit-form.com/uHGEhhtdD', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          alert('Something went wrong. Please try again.');
        }
      } catch (error) {
        alert('Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 rounded-lg bg-white shadow-xl"
        >
          <h2 className="text-2xl font-serif text-[#68401b] mb-2">Thank You! 🎉</h2>
          <p className="text-gray-700 mb-4">We've received your message and will get back to you soon.</p>
          <a 
            href="/" 
            className="text-sm text-[#B08E6A] hover:text-[#68401b] transition-colors duration-300 inline-flex items-center gap-1"
          >
            ← Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-[#f8f5f0]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="font-serif text-4xl text-[#68401b] mb-2 text-center">Let's Connect</h1>
        <p className="text-gray-700 mb-8 text-center">We'd love to hear about your special day</p>

        <motion.form
          onSubmit={handleFormSubmit}
          className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="space-y-4">
            {['name', 'email', 'phone', 'weddingDate'].map((field) => (
              <motion.div
                key={field}
                whileFocus={{ scale: 1.02 }}
                className="form-group"
              >
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  {field === 'email' && ' *'}
                </label>
                <input
                  type={field === 'email' ? 'email' : field === 'weddingDate' ? 'date' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleInputChange}
                  required={field === 'email'}
                  className={`w-full px-4 py-2 border ${
                    errors[field as keyof FormErrors] ? 'border-red-500' : 'border-gray-200'
                  } rounded-lg focus:ring-2 focus:ring-[#B08E6A] focus:border-transparent transition-all`}
                  onFocus={() => setFocused(field)}
                  onBlur={() => setFocused(null)}
                />
                {errors[field as keyof FormErrors] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field as keyof FormErrors]}</p>
                )}
              </motion.div>
            ))}

            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="form-group"
            >
              <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
                Tell us more about your story
              </label>
              <textarea
                id="story"
                name="story"
                rows={4}
                value={formData.story}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B08E6A] focus:border-transparent transition-all"
                onFocus={() => setFocused('story')}
                onBlur={() => setFocused(null)}
              />
            </motion.div>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#68401b] hover:bg-[#B08E6A] text-white py-3 px-6 rounded-full 
                      font-medium transition-all duration-300 ease-in-out
                      shadow-[0_4px_14px_0_rgba(198,160,124,0.39)]
                      hover:shadow-[0_6px_20px_rgba(198,160,124,0.45)]
                      disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
} 