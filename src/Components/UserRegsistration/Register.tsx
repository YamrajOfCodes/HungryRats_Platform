"use client"
import { useAppDispatch } from '@/hooks';
import React from 'react'
import { useState, ChangeEvent, FormEvent } from 'react';
import { Login, Register as Registration } from '@/Redux/Slices/User/userSlice'
import toast from 'react-hot-toast';

interface UserFormData {
    Firstname: string;
    Lastname: string;
    email: string;
    mobile: string;
    address: string;
    password: string;
    confirmpassword: string;
  }
  
  interface FormErrors {
    [key: string]: string;
  }

const Register = () => {

        const [formData, setFormData] = useState<UserFormData>({
          Firstname: '',
          Lastname: '',
          email: '',
          mobile: '',
          address: '',
          password: '',
          confirmpassword: ''
        });
      
        const [errors, setErrors] = useState<FormErrors>({});
        const [showPassword, setShowPassword] = useState(false);
        const dispatch = useAppDispatch();
      
        const validateForm = (): boolean => {
          const newErrors: FormErrors = {};
      
          // First Name validation
          if (!formData.Firstname.trim()) {
            newErrors.firstName = 'First name is required';
          }
      
          // Last Name validation
          if (!formData.Lastname.trim()) {
            newErrors.lastName = 'Last name is required';
          }
      
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = 'Valid email is required';
          }
      
          // Phone validation
          const phoneRegex = /^\+?[\d\s-]{10,}$/;
          if (!formData.mobile.trim() || !phoneRegex.test(formData.mobile)) {
            newErrors.phone = 'Valid phone number is required';
          }
      
          // Address validation
          if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
          }
      
          // Password validation
          if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
          }
      
          // Confirm Password validation
          if (formData.password !== formData.confirmpassword) {
            newErrors.confirmPassword = 'Passwords do not match';
          }
      
          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
        };
      
        const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setFormData(prev => ({
            ...prev,
            [name]: value
          }));
        };
      
        const handleSubmit = async (e: FormEvent) => {
          e.preventDefault();
          if (validateForm()) {
            try {
              // Handle form submission logic here
              console.log('Form submitted:', formData);


              dispatch(Registration(formData)).then((res:any)=>{
                if(res.payload){
                  setFormData({...formData,Firstname:"",Lastname:"",email:"",mobile:"",password:"",confirmpassword:"",address:""});
                  toast.success("Registration is successfull")
                }
               })


            } catch (error) {
              console.error('Error submitting form:', error);
            }
          }
        };

  return (
    <div>
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">User Registration</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="Firstname"
                  value={formData.Firstname}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="Lastname"
                  value={formData.Lastname}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.Lastname ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* <div>
              <input type="file" />
            </div> */}

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                placeholder="Enter address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                    placeholder="Enter password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Register User
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register
