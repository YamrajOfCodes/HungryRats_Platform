"use client"
import React, { useState } from 'react';
import { 
  Home,
  Users, 
  Settings,
  ShoppingCart,
  BarChart2,
  MessageCircle,
  LogOut
} from 'lucide-react';
import Product from '@/Components/AddProduct/Product';
import Register from '@/Components/UserRegsistration/Register';
import Dashboard from '@/Components/MainDashboard/Dashboard';

const page = () => {

    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '#' },
        { icon: Users, label: 'Add Users', href: '#' },
        { icon: ShoppingCart, label: 'Add Product', href: '#' },
        { icon: Settings, label: 'Settings', href: '#' },
      ];

      const [activeItem,setActiveItem] = useState("Dashboard");

  return (
    <div className='flex gap-5'>
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
          <button className="mt-4 flex items-center text-gray-300 hover:text-white transition-colors duration-200">
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
  )
}

export default page
