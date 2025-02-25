"use client"
import React, { useEffect, useState } from 'react';
import { Search, ShoppingCart, ArrowRight, HamIcon, Hammer, AlignJustify, X, User, UserPlus, LogIn, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import MobileSidebar from '../MobileSidebar/MobileSidebar';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/App/store';
import { useAppDispatch } from '@/hooks';
import { getCart, getProductsdata, Logout, userVerify } from '@/Redux/Slices/User/userSlice';
import Image from 'next/image';

interface Functions{
  Showpopup:(e:any)=>void,
  Showsignup:any,
  msg:boolean,
  cartsidebar:()=>void
}

interface Users{
  _id:string
}

type User = Users[][];


interface Product {
  _id: string;
  productname: string;
  productimage: string;
  price: number;
  description?: string; // Optional field
  category?: string; // Optional field
}

type GetProductResponse = Product[][];


const Header:React.FC<Functions>  = ({Showpopup,Showsignup,msg,cartsidebar}) => {

  const { login } = useSelector((state:RootState)=>state.User);

  // console.log(login);

  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => setSidebar(!sidebar);
 

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { logout } = useSelector((state:RootState) => state.User);
  const { userverify } = useSelector((state:RootState) => state.User) as  { userverify : User};
  // console.log(logout);
 
  // console.log(userverify?.[0]?.[0]?._id);

   const { getproducts } = useSelector((state:RootState)=>state.User) as {  getproducts : GetProductResponse };
  // console.log(getproducts);

 const {getcart} = useSelector((state:RootState)=>state.User);
 const {addtocart} = useSelector((state:RootState)=>state.User);
  // console.log(getcart);

   


   let data = getproducts?.[0]?.filter((element,index)=>{
        if(index < 2){
          return element
        }
   })

  //  console.log(data);

  const getData = ()=>{
    let datas = userverify?.[0]?.[0]?._id
    // console.log(datas);
    
    dispatch(getCart(datas))  
    
  
  }
   
  
    useEffect(()=>{
      dispatch(userVerify())
      dispatch(getProductsdata())
    },[])
    
    useEffect(()=>{
      getData();
    },[userverify])

    useEffect(()=>{
    getData();
    },[addtocart])

  


  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const handleLogout = (e:any)=>{
     e.preventDefault();
     setIsDropdownOpen(false)
     dispatch(Logout())
  }


  useEffect(()=>{
    dispatch(userVerify())
  },[login,logout])


  useEffect(() => {
    if (isDropdownOpen) {
      // Save current scroll position and lock scroll
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isDropdownOpen]);

  return (
   <>

   <nav className={`w-full flex justify-between bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 items-center px-6 sm:px-12 py-4 border-b border-blue-400/20 backdrop-blur-sm ${msg == false && 'hidden'} z-10 relative`}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 group">
          <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-white rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg rotate-45 flex items-center justify-center">
                <span className="text-white font-bold text-xl -rotate-45">h</span>
              </div>
              </div>
           <Link href={"/"}> <h1 className="text-2xl font-bold text-white">
              hungry<span className="text-yellow-400 animate-bounce inline-block">rats</span>
            </h1></Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <Link href={"/subscription"} className="text-white/90 hover:text-white hover:cursor-pointer  transition-colors text-sm hover:scale-105 transform">Subscription</Link>
            <Link href={"/works"} className="text-white/90 hover:text-white  hover:cursor-pointer transition-colors text-sm hover:scale-105 transform">How it Works</Link>
            <Link href={"/contact"} className="text-white/90 hover:text-white  hover:cursor-pointer transition-colors text-sm hover:scale-105 transform">Contact Us</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-blue-800/40 rounded-full px-4 py-2 hover:bg-blue-800/60 transition-colors">
            <Search className="h-4 w-4 text-white/70" />
            <input 
              placeholder="Search for food..."
              className="bg-transparent border-none text-white placeholder-white/70 text-sm focus:outline-none px-3 w-48  hover:cursor-progress"
              disabled
            />
          </div>
          
          <button className="p-2 relative group">
            <ShoppingCart className="h-5 w-5 text-white group-hover:scale-110 transition-transform" onClick={cartsidebar} />
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
              {getcart?.[0] == undefined? "0" : "1"}
            </span>
          </button>
          
         
          <div className="relative lg:block hidden">
          <button 
            onClick={toggleDropdown}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <User className="h-5 w-5 text-white" />
          </button>
          
          {isDropdownOpen && (
        <>
          {/* Full height overlay with scroll lock */}
          <div 
            className="fixed inset-0 h-screen w-screen bg-black/20 backdrop-blur-sm z-40 overflow-hidden"
            onClick={toggleDropdown}
          />
          
          {/* Dropdown menu */}
          <div 
            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-800">Account</h3>
              <p className="text-xs text-gray-500 mt-1">Manage your account settings</p>
            </div>
            
            <div className="py-2">
              <button
                onClick={() => {
                  toggleDropdown();
                  Showsignup();
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors ${userverify?.[0]? 'hidden ' : "block"}`}
              >
                <UserPlus className="h-4 w-4 text-blue-500" />
                <span>Sign up</span>
              </button>
              
              <button
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors ${userverify?.[0]? 'block ' : "hidden"}`} onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 text-red-500 font-semibold" />
                <span className='text-red-500'>Log out</span>
              </button>
              
            </div>
            
          </div>
        </>
      )}
        </div>
          <AlignJustify className='text-white lg:hidden hover:cursor-pointer' onClick={handleSidebar} />
        </div>
      </nav>


      <header className={`relative w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 overflow-hidden h-[60vh] md:h-[70vh] ${msg == false? 'block' : 'hidden'} `}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute h-32 w-32 -left-16 -top-16 bg-white rounded-full animate-pulse"></div>
        <div className="absolute h-24 w-24 right-10 top-32 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute h-16 w-16 left-1/4 bottom-20 bg-blue-300 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Navigation Bar */}
   
      <nav className={`w-full flex justify-between bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 items-center px-6 sm:px-12 py-4 border-b border-blue-400/20 backdrop-blur-sm z-10 relative`}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 group">
          <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-white rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg rotate-45 flex items-center justify-center">
                <span className="text-white font-bold text-xl -rotate-45">h</span>
              </div>
              </div>
           <Link href={"/"}> <h1 className="text-2xl font-bold text-white">
              hungry<span className="text-yellow-400 animate-bounce inline-block">rats</span>
            </h1></Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <Link href={"/subscription"} className="text-white/90 hover:text-white hover:cursor-pointer  transition-colors text-sm hover:scale-105 transform">Subscription</Link>
            <Link href={"/works"} className="text-white/90 hover:text-white  hover:cursor-pointer transition-colors text-sm hover:scale-105 transform">How it Works</Link>
            <Link href={"/contact"} className="text-white/90 hover:text-white  hover:cursor-pointer transition-colors text-sm hover:scale-105 transform">Contact Us</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-blue-800/40 rounded-full px-4 py-2 hover:bg-blue-800/60 transition-colors">
            <Search className="h-4 w-4 text-white/70" />
            <input 
              placeholder="Search for food..."
              className="bg-transparent border-none text-white placeholder-white/70 text-sm focus:outline-none px-3 w-48 hover:cursor-progress"
              disabled
            />
          </div>
          
          <button className="p-2 relative group">
            <ShoppingCart className="h-5 w-5 text-white group-hover:scale-110 transition-transform" onClick={cartsidebar} />
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
            {getcart?.[0] == undefined? "0" : "1"}
            </span>
          </button>
          
         
          <div className="relative lg:block hidden">
          <button 
            onClick={toggleDropdown}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <User className="h-5 w-5 text-white" />
          </button>
          
          {isDropdownOpen && (
        <>
          {/* Full height overlay with scroll lock */}
          <div 
            className="fixed inset-0 h-screen w-screen bg-black/20 backdrop-blur-sm z-40 overflow-hidden"
            onClick={toggleDropdown}
          />
          
          {/* Dropdown menu */}
          <div 
            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-800">Account</h3>
              <p className="text-xs text-gray-500 mt-1">Manage your account settings</p>
            </div>
            
            {/* Menu items */}
            <div className="py-2">
              <button
                onClick={() => {
                  toggleDropdown();
                  Showsignup();
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors ${userverify?.[0]? 'hidden ' : "block"}`}
              >
                <UserPlus className="h-4 w-4 text-blue-500" />
                <span>Sign up</span>
              </button>
              
              <button
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors ${userverify?.[0]? 'block ' : "hidden"}`} onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 text-red-500 font-semibold" />
                <span className='text-red-500'>Log out</span>
              </button>
              
            </div>
            
           
          </div>
        </>
      )}
        </div>
          <AlignJustify className='text-white lg:hidden hover:cursor-pointer' onClick={handleSidebar} />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 sm:px-12 py-12 sm:py-20 flex flex-col sm:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="w-full sm:w-1/2 z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            <span className="block transform hover:scale-105 transition-transform">Delicious Food</span>
            <span className="block text-yellow-400 transform hover:scale-105 transition-transform delay-100">Delivered Fast</span>
            <span className="block transform hover:scale-105 transition-transform delay-200">To Your Door</span>
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-md animate-fade-in">
            Experience quick, reliable food delivery from your favorite local restaurants. Perfect for busy hostel life!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
           <Link href={"/menu"}>
           <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-all hover:scale-105 flex items-center justify-center gap-2 group">
              Order Now
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
           </Link>
           <Link href={"/menu"}><button className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all hover:scale-105">
              Browse Menu
            </button></Link>
          </div>
        </div>

        {/* Animated Right Section */}
        <div className="hidden sm:block w-1/2 relative h-96">
        <div className="flex-1 relative">
            {/* Main Plate */}
            <svg viewBox="0 0 400 400" className="w-full max-w-lg mx-auto animate-float">
              {/* Plate */}
              <circle cx="200" cy="200" r="180" fill="#FFF" className="filter drop-shadow-xl" />
              <circle cx="200" cy="200" r="160" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="4 4" />
              
              {/* Food Items */}
              <g className="animate-spin-slow">
                {/* Pizza Slice */}
                <path d="M200 200 L320 120 A160 160 0 0 1 340 180 Z" fill="#FBBF24" />
                <path d="M220 180 L240 170 M260 160 L280 150" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
                
                {/* Burger */}
                <g transform="translate(180, 280)">
                  <path d="M0 0 Q30 -20 60 0" fill="#92400E" />
                  <rect x="5" y="-8" width="50" height="8" fill="#EF4444" rx="2" />
                  <rect x="5" y="-12" width="50" height="4" fill="#22C55E" />
                </g>
                
                {/* Salad */}
                <g transform="translate(100, 180)">
                  <path d="M0 0 Q20 -20 40 0" fill="#22C55E" className="animate-bounce-gentle" />
                  <path d="M10 -5 Q30 -25 50 -5" fill="#15803D" className="animate-bounce-gentle" />
                </g>
              </g>
              
              {/* Flying Elements */}
              <g className="animate-bounce-gentle">
                <circle cx="320" cy="100" r="15" fill="#EF4444" />
                <circle cx="100" cy="120" r="10" fill="#22C55E" />
                <circle cx="280" cy="280" r="12" fill="#FBBF24" />
              </g>
            </svg>

            {/* Floating Order Cards */}
            <div className="absolute top-1/4 -left-12 bg-white p-4 rounded-xl shadow-xl animate-float delay-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg">
                  <img src={data?.[0]?.productimage} alt="product" className='h-full'/>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{data?.[0]?.productname}</div>
                  <div className="text-sm text-gray-500">Rs {data?.[0]?.price}</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/4 -right-8 bg-white p-4 rounded-xl shadow-xl animate-float delay-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg">
                <img src={data?.[1]?.productimage} alt="product" className='h-full'/>
                </div>
                <div>
                <div className="font-medium text-gray-900">{data?.[1]?.productname}</div>
                <div className="text-sm text-gray-500">Rs {data?.[1]?.price}</div>
                </div>
              </div>
            </div>
          </div>



       

       </div>
       <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
       </div>

     
    </header>

    <MobileSidebar 
      sidebar={sidebar} 
      handleSidebar={handleSidebar}
      showsignup={Showsignup}
    />
   </>
  )
}

export default Header
