"use client"
import React, { useEffect, useState } from 'react';
import { 
  Home,
  Users, 
  Settings,
  ShoppingCart,
  BarChart2,
  MessageCircle,
  LogOut,
  Lock,
  Unlock
} from 'lucide-react';
import Product from '@/Components/AddProduct/Product';
import Register from '@/Components/UserRegsistration/Register';
import Dashboard from '@/Components/MainDashboard/Dashboard';
import toast from 'react-hot-toast';

const page = () => {

    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '#' },
        { icon: Users, label: 'Add Users', href: '#' },
        { icon: ShoppingCart, label: 'Add Product', href: '#' },
        { icon: Settings, label: 'Settings', href: '#' },
      ];

      useEffect(()=>{
        const data =  localStorage.getItem("admin");
        if(data){
          setadmin(true)
        }
      },[])

       const [activeItem,setActiveItem] = useState("Dashboard");
       const [admin,setadmin] = useState(false)
       const [isFocused, setIsFocused] = useState(false);
       const [code, setCode] = useState('')

       const handlesubmitcode = ()=>{
        if(code === ""){
         toast.error("Enter a code first")
        }else if(code == "12345"){
          setadmin(true)
          localStorage.setItem("admin","admin@kk");
         }else{
          toast.error("Wrong code Provided");
          setCode("");
         }
       }

       const handlelogout = ()=>{
        localStorage.removeItem("admin")
        setadmin(false)
       }

  return (

   <>
    <div className={`h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 ${admin? 'hidden' : 'flex'}`}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-96 transform transition-transform duration-300 hover:scale-105">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          {isFocused ? 
            <Unlock className="w-8 h-8 text-blue-600 animate-bounce" /> :
            <Lock className="w-8 h-8 text-blue-600" />
          }
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Secret Code
          </h2>
        </div>

        {/* Input Field */}
        <div className="relative mb-6">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full h-16 px-4 text-lg rounded-xl border-2 border-blue-100 focus:border-blue-500 outline-none transition-all duration-300 bg-blue-50/30"
            placeholder="Enter your secret code"
          />
          <div className={`absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-300 ${isFocused ? 'w-full' : 'w-0'}`} />
        </div>

        {/* Submit Button */}
        <button 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-1"
          onClick={handlesubmitcode}
        >
          Submit Code
        </button>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 blur-xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 blur-xl" />
      </div>
    </div>





    <div className={`flex gap-5 ${admin? 'flex' : 'hidden'}`}>
       <div className="flex h-screen">
      <div className="flex flex-col w-64 bg-gray-900 text-white">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <span className="text-xl font-semibold">Admin Panel</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-4">
            {menuItems.map((item, index) => (
              <li key={index} onClick={()=>{setActiveItem(item.label)}}>
                <a
                  href={item.href}
                  className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-sm">KP</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Kundan Patil</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
          <button className="mt-4 flex items-center text-gray-300 hover:text-white transition-colors duration-200" onClick={handlelogout}>
            <LogOut className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
    <div className="side_content w-full bg-blue-200">
        {
            activeItem === "Dashboard"? <Dashboard/> :
            activeItem === "Add Users"? <Register/> :
            activeItem === "Add Product"? <Product/> :null
        }
    </div>
    </div>
   </>

   
  )
}

export default page
