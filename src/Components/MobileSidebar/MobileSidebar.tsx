"use client"
import React, { useEffect, useState } from 'react';
import { X, Home, CreditCard, HelpCircle, MessageCircle, ChevronRight, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/App/store';
import { Logout, userVerify } from '@/Redux/Slices/User/userSlice';
import { useAppDispatch } from '@/hooks';

interface Sidebar {
    sidebar: boolean;
    handleSidebar: () => void;
    showsignup:any
}

const MobileSidebar: React.FC<Sidebar> = ({ sidebar,handleSidebar,showsignup }) => {

  const dispatch = useAppDispatch();

  const menuItems = [
    { icon: Home, label: 'Home', badge: null },
    { icon: CreditCard, label: 'Subscription', badge: 'New' },
    { icon: HelpCircle, label: 'How it works', badge: null },
    { icon: MessageCircle, label: 'Contact us', badge: '3' },
  ];

    const [token,setToken] = useState(false)

    const { login } = useSelector((state:RootState)=>state.User);
    const { logout } = useSelector((state:RootState)=>state.User);
    const { userverify } = useSelector((state:RootState)=>state.User);
          console.log(login);

      console.log(userverify);


       const handleLogout = ()=>{
           handleSidebar()
           dispatch(Logout())
        }

      const userLoggedIn = ()=>{
         dispatch(userVerify())
      }


      const handleSubmit = (data:any)=>{
        if(data=="logout"){
          handleLogout()
        }else{
          showsignup();
        }
      }


    useEffect(()=>{
     userLoggedIn() 
    },[login,logout])


  return (
    <div
      className={`
        fixed inset-y-0 right-0 w-80 bg-white shadow-2xl rounded-md
        transform ${sidebar ? "translate-x-0" : "translate-x-full"}
        transition-transform duration-300 ease-in-out
        lg:hidden z-50
      `}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
        <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Menu
        </span>
        <button
          onClick={handleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="py-4">
        {/* Home */}
        <div className="group relative">
          <Link
            href="/"
            onClick={handleSidebar}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600 transition-colors" />
            <span className="font-medium group-hover:text-blue-600 transition-colors">Home</span>
            <ChevronRight className="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <div className="absolute left-0 w-1 inset-y-0 bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
        </div>

        {/* Subscription */}
        <div className="group relative">
          <Link
            href="/subscription"
            onClick={handleSidebar}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <CreditCard className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600 transition-colors" />
            <span className="font-medium group-hover:text-blue-600 transition-colors">Subscription</span>
            <span
              className="ml-auto px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600"
            >
              New
            </span>
            <ChevronRight className="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <div className="absolute left-0 w-1 inset-y-0 bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
        </div>

        {/* How it works */}
        <div className="group relative">
          <Link
            href="/works"
            onClick={handleSidebar}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <HelpCircle className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600 transition-colors" />
            <span className="font-medium group-hover:text-blue-600 transition-colors">How it works</span>
            <ChevronRight className="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <div className="absolute left-0 w-1 inset-y-0 bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
        </div>

        {/* Contact us */}
        <div className="group relative">
          <Link
            href="/contact"
            onClick={handleSidebar}
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600 transition-colors" />
            <span className="font-medium group-hover:text-blue-600 transition-colors">Contact us</span>
            <span
              className="ml-auto px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
            >
              3
            </span>
            <ChevronRight className="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <div className="absolute left-0 w-1 inset-y-0 bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
        {/* Login Button */}
        <Link
          href="#"
          onClick={()=>{
            handleSidebar()
            // showsignup()
          }}
          className="flex items-center justify-center w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <LogIn className="w-5 h-5 mr-2" />
          {/* <span className={`font-medium`}>{userverify?.[0]?.length > 0 ? "Logout" : "Login"}</span>
          <span className={`font-medium`}>{userverify?.[0]?.length > 0 ? "Logout" : "Login"}</span> */}
          <span className={`font-medium  ${userverify?.[0]? 'block ' : "hidden"}`} onClick={()=>{handleSubmit("logout")}}>Logout</span>
          <span className={`font-medium  ${userverify?.[0]? 'hidden ' : "block"}`} onClick={()=>{handleSubmit("login")}}>Login</span>
        </Link>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>
          <p className="text-sm text-gray-600 mb-3">Contact our support team anytime</p>
          <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            Get Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;