"use client"
import Footer from '@/Components/Footer/Footer';
import Header from '@/Components/Header/Header'
import Loginpopup from '@/Components/LoginPopup/Loginpopup';
import { CheckCircle, ShoppingCart, Star, X, Zap } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import food from "@/Assets/food.jpg"
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';
import { getProductsdata } from '@/Redux/Slices/User/userSlice';
import { useSelector } from 'react-redux';


const Page = () => {

   const [cartsidebar,setcartSidebar] = useState(false);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(true);
  const { getproducts } = useSelector((state:RootState)=>state.User);
  const dispatch = useAppDispatch();


  // console.log(getproducts);

   const menu = getproducts?.[0]?.filter((foodItem:any,index:number)=>{
        if(index > 2){
          return foodItem
        }
   })

   console.log(menu);
   
  

  useEffect(()=>{
    dispatch(getProductsdata())
  },[])

    const menuItems = [
        {
          id: 1,
          name: 'Gourmet Burger',
          description: 'Premium beef, truffle aioli, caramelized onions',
          originalPrice: 18.99,
          price: 14.99,
          rating: 4.7,
          image: 'https://img.freepik.com/free-photo/front-view-burger-stand_141793-15542.jpg'
        },
        {
          id: 2,
          name: 'Artisan Pizza',
          description: 'San Marzano tomatoes, fresh mozzarella, basil',
          originalPrice: 22.50,
          price: 16.50,
          rating: 4.8,
          image: 'https://img.freepik.com/free-photo/pizza-pizza-filled-with-various-ingredients_141793-2589.jpg'
        },
        {
          id: 3,
          name: 'Salmon Poke Bowl',
          description: 'Fresh salmon, quinoa, avocado, sesame dressing',
          originalPrice: 24.99,
          price: 18.99,
          rating: 4.6,
          image: 'https://img.freepik.com/free-photo/hawaiian-poke-bowl-with-salmon_1150-42773.jpg'
        }
      ];
    
      const [showloginpopup,setloginpopup] = useState(false);
      const [showsignuppopup,setsignuppopup] = useState(false);
      const [popup,setpopup] = useState("")
    
      const handleLoginpopup = (e:any)=>{
        setpopup("login")
        setloginpopup(true);
          document.body.classList.add('overflow-hidden');
      }
    
      const handleSignuppopup = (e:any)=>{
        setpopup("signup")
        setsignuppopup(true);
          document.body.classList.add('overflow-hidden');
      }
    
    
      const hideLoginpopup = (e:any)=>{
        setloginpopup(false);
        setsignuppopup(false)
          document.body.classList.remove('overflow-hidden');
      }

      const handlecartSidebar = ()=>{
        setcartSidebar(true)
      }
    
  return (
    <>
    <Header Showpopup={handleLoginpopup} Showsignup={handleSignuppopup} msg={true} cartsidebar={handlecartSidebar}/>
    <div className='min-h-screen w-full'>
    <div className="menu  h-auto mb-2 lg:h-[80vh] flex justify-center items-center">
    <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          {/* <div>
            <p className="text-blue-600 mt-2">Exquisite Flavors, Delivered Fresh</p>
          </div> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
          {menu?.map((item:any) => (
            <div 
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-blue-100"
            >
              <div className="relative">
                <img 
                  src={item.productimage} 
                  alt={item.productname}
                  className="w-full  h-48 md:h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2 flex items-center">
                  <Star className="text-yellow-500 mr-1" fill="currentColor" size={20} />
                  <span className="text-blue-900 font-semibold">{item.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className=" text-lg md:text-2xl font-bold text-blue-900 mb-3">{item.productname}</h2>
                <p className="text-sm md:text-lg text-blue-700 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <span className=" text-lg md:text-xl animate-pulse font-extrabold text-blue-600 mr-3">${item.price}</span>
                    <span className="text-sm md:text-lg text-gray-400 line-through">${item.subprice}</span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
</div>



<div className={`absolute flex justify-center top-0 items-center bg-black/20 backdrop-blur-0 h-screen w-full z-10 ${showloginpopup || showsignuppopup?'block':'hidden'}`} onClick={hideLoginpopup}>
<Loginpopup popup={popup} />
</div>


  {/* CartSidebar */}

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

<Footer/>

</>
  )
}

export default Page
