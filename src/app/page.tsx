"use client"
import Footer from '@/Components/Footer/Footer';
import Header from '@/Components/Header/Header';
import Hero from '@/Components/hero/Hero';
import Loginpopup from '@/Components/LoginPopup/Loginpopup';
import { trackFallbackParamAccessed } from 'next/dist/server/app-render/dynamic-rendering';
import Image from 'next/image';
import React, { useState } from 'react';
import food from "@/Assets/food.jpg"
import { CheckCircle, ShoppingCart, X, Zap } from 'lucide-react';


const page = () => {

  const [showloginpopup,setloginpopup] = useState(false);
  const [showsignuppopup,setsignuppopup] = useState(false);
  const [popup,setpopup] = useState("signup")
  const [cartsidebar,setcartSidebar] = useState(false);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(true);


  const handlecartSidebar = ()=>{
    setcartSidebar(!cartsidebar)
  }

  const handleLoginpopup = (e:any)=>{
    setpopup("login")
    setloginpopup(true);
      document.body.classList.add('overflow-hidden');
  }

  const handleSignuppopup = ()=>{
    setpopup("signup")
    setsignuppopup(true);
      document.body.classList.add('overflow-hidden');
  }


  const hideLoginpopup = ()=>{
    setloginpopup(false);
    setsignuppopup(false)
      document.body.classList.remove('overflow-hidden');
  }

  return (
    <div className='bg-blue-50'>
   <div className='relative'>
   <Header Showpopup={handleLoginpopup} Showsignup={handleSignuppopup} msg={false} cartsidebar={handlecartSidebar} />
   </div>
    <Hero/>
    <Footer/>
    <div className={`absolute flex justify-center top-0 items-center bg-black/20 backdrop-blur-0 h-screen w-full z-10 ${showsignuppopup?'block':'hidden'}`} onClick={hideLoginpopup}>
    <Loginpopup popup={popup} hideloginpopup={hideLoginpopup} />
    </div>



    <div 
      className={`fixed right-0 top-0 bg-white sidebar h-screen w-[420px] 
        ${cartsidebar ? "translate-x-0" : "translate-x-full"} 
        transition-transform duration-500 ease-in-out z-50 
        border-l-4 border-blue-500 shadow-2xl`}
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <ShoppingCart size={28} />
            <h2 className="text-2xl font-bold">My Cart</h2>
          </div>
          <button
            onClick={() => setcartSidebar(false)}
            className="hover:rotate-90 transition-transform"
          >
            <X size={28} className="text-white/80 hover:text-white" />
          </button>
        </div>
        {isSubscriptionActive && (
          <div className="mt-4 bg-white/20 rounded-lg p-3 flex items-center space-x-2">
            <Zap size={20} className="text-yellow-300" />
            <span className="text-sm font-medium flex-grow">
              Premium Subscription Active
            </span>
            <CheckCircle size={20} className="text-green-300" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <Image
              src={food.src}
              height={100}
              width={100}
              alt="cart image"
              className="rounded-lg shadow-lg object-cover transform hover:scale-105 transition"
            />
            <div>
              <p className="text-lg font-bold text-gray-800">Paneer Tikka</p>
              <div className="flex items-center space-x-2">
                <p className={`text-sm ${isSubscriptionActive ? 'text-gray-400 line-through' : 'text-gray-500'}`}>
                  ₹75
                </p>
                {isSubscriptionActive && (
                  <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs">
                    Free
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              // logic to remove item
            }}
            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 text-center text-gray-600">
        <p className="text-sm bg-blue-50 p-3 rounded-lg">
          Subscription allows one meal delivery at a time
        </p>
      </div>

      {/* Order Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <button 
          className={`w-full px-6 py-4 text-white text-lg font-bold rounded-xl 
            transition-all duration-300 ease-in-out 
            ${isSubscriptionActive 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
              : 'bg-gray-400 cursor-not-allowed'
            }`}
          disabled={!isSubscriptionActive}
        >
          {isSubscriptionActive ? 'Order Now' : 'Activate Subscription'}
        </button>
      </div>
    </div>


  

    </div>
  );
};

export default page;