"use client"
import React, { useEffect } from 'react'
import { CheckCircle, Star, Zap, Clock, Gift } from 'lucide-react';
import FeatureCard from '@/Components/FeatureCard/FeatureCard';
import Link from 'next/link';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';
import { Subscribe, userVerify } from '@/Redux/Slices/User/userSlice';
import { useSelector } from 'react-redux';


interface Users{
    _id:string,
    Firstname:string
  }
  
  type User = Users[][];
  

const page = () => {

    const {userverify} = useSelector((state:RootState)=>state.User as {userverify:User});
    const dispatch = useAppDispatch();

    useEffect(()=>{
     dispatch(userVerify())
    },[])

    const SubscribePlan = ()=>{
        let data = {
            userid:userverify?.[0]?.[0]?._id,
            username:userverify?.[0]?.[0]?.Firstname,
            days:58
        }

        dispatch(Subscribe(data))
    }

    useEffect(()=>{
     SubscribePlan();
    },[userverify])

    

  return (
    <div>
       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto pt-16 px-4">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-white/80">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome to Premium!
            </h1>
            <p className="text-lg text-gray-600">
              Your subscription has been successfully activated
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <FeatureCard 
              icon={<Star className="w-6 h-6 text-purple-600" />}
              title="Premium Content"
              description="Access all premium articles and resources"
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-yellow-600" />}
              title="Fast Support"
              description="Priority customer support response"
            />
            <FeatureCard 
              icon={<Clock className="w-6 h-6 text-blue-600" />}
              title="Early Access"
              description="Be first to try new features"
            />
            <FeatureCard 
              icon={<Gift className="w-6 h-6 text-red-600" />}
              title="Special Perks"
              description="Exclusive member benefits and rewards"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/"}>
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-lg shadow-indigo-600/20">
              Go to Home
            </button>
            </Link>
           <Link href={"/menu"}>
           <button className="px-8 py-3 bg-white text-gray-700 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
             Order Food
            </button>
           </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help? {' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>


    
    </div>
  )

  
}

export default page
