"use client"
import React, { useState, useEffect } from 'react';
import {
  User,
  CreditCard,
  ArrowRight,
  Utensils,
  Check,
  Smile,
  Star,
  Heart,
  CheckCircle,
  Zap,
  X,
  ShoppingCart
} from 'lucide-react';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import Loginpopup from '@/Components/LoginPopup/Loginpopup';
import Image from 'next/image';
import food from "@/Assets/food.jpg"
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/App/store';
import { useAppDispatch } from '@/hooks';
import { CheckSubscription, deleteCart, getCart, PostOrder, userVerify } from '@/Redux/Slices/User/userSlice';
import toast from 'react-hot-toast';
import Loader from '@/Components/Loader/Loader';



interface User {
  _id: string;
  name?: string; // Add other user properties as needed
  email?: string;
  Firstname?:string;
  mobile?:string;
}

type UserVerifyResponse = User[][]


interface Cart{
  productname:string,
  productimage:string,
  price:string,
  _id:string
}

const SubscriptionFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loader,setloader] = useState(true);
  const [animated, setAnimated] = useState(false);
  const [showloginpopup, setloginpopup] = useState(false);
  const [showsignuppopup, setsignuppopup] = useState(false);
  const [popup, setpopup] = useState("")
  const [cartsidebar, setcartSidebar] = useState(false);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(true);
  const { userverify } = useSelector((state: RootState) => state.User) as { userverify : UserVerifyResponse };
  const dispatch = useAppDispatch();

  const handleLoginpopup = (e: any) => {
    setpopup("login")
    setloginpopup(true);
    document.body.classList.add('overflow-hidden');
  }

  const handleSignuppopup = (e: any) => {
    setpopup("signup")
    setsignuppopup(true);
    document.body.classList.add('overflow-hidden');
  }


  const placedOrder = ()=>{


    if(getcart?.[0] == null){
     return toast.error("Cart is empty");
    }

   let Firstname =  userverify?.[0]?.[0]?.Firstname;
   let mobile =  userverify?.[0]?.[0]?.mobile;
   let productname = getcart?.[0]?.productname;
   let price = getcart?.[0]?.price;
   let id = userverify?.[0]?.[0]?._id;

   const data = {
     id,
     Firstname,
     mobile,
     productname,
     price
   }
  //  console.log(data);
   

   dispatch(PostOrder(data)).then((res)=>{
     if(res.payload){
       dispatch(getCart(getcart?.[0]?._id))
     }else{
       toast.error("Order is already placed")
       
     }
   }).catch((error)=>{
    
     
   })
   
  }


        
      const DeleteCart = (id:any)=>{
        dispatch(deleteCart(id))
      }


  const hideLoginpopup = () => {
    setloginpopup(false);
    setsignuppopup(false)
    document.body.classList.remove('overflow-hidden');
  }

  const handlecartSidebar = () => {
    setcartSidebar(true)
  }


  const { getcart } = useSelector((state: RootState) => state.User) as { getcart : Cart[] };

        const getData = ()=>{
         let datas = userverify?.[0]?.[0]?._id
        //  console.log(datas);
         dispatch(CheckSubscription(datas)).then((res)=>{
          // console.log(res);
           
        })

         if(userverify?.[0] == undefined  ){
         setIsSubscriptionActive(false)
      }else{
        let userid = userverify?.[0]?.[0]?._id
        dispatch(CheckSubscription(userid)).then((res)=>{
          // console.log(res);
          
          if(res.payload === "Not Subscribed" || res.payload == undefined){
           setIsSubscriptionActive(false);
          }else{
            setIsSubscriptionActive(true);
          }
        }).catch((data)=>{  
        })
      }
      
      dispatch(getCart(datas))  
      
    
    }
      



  useEffect(() => {
    dispatch(userVerify())
    setTimeout(() => {
      setloader(false);
    }, 2000);
  }, [])

  useEffect(() => {
    getData();
  }, [userverify])




  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header Showpopup={handleLoginpopup} Showsignup={handleSignuppopup} msg={true} cartsidebar={handlecartSidebar} />

     {
      loader?<Loader/> :  <div className="min-h-screen bg-gray-50 flex items-center justify-center  ">
      <div className="w-full min-h-screen  md:max-w-none   md:rounded-none overflow-hidden">
        {currentStep === 1 && (
          <div className="flex flex-col h-[750px] md:h-screen">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 flex flex-col justify-center p-8 md:p-16 text-white">
              <p className="text-lg md:text-xl mb-6">Your Personalized Meal Journey Begins</p>

              <div className="space-y-4 md:space-y-6">
                {[
                  {
                    icon: Smile,
                    color: 'text-yellow-400',
                    title: 'Personalized',
                    description: 'Tailored meals for your unique taste'
                  },
                  {
                    icon: Star,
                    color: 'text-cyan-400',
                    title: 'Flexible',
                    description: 'Adapt your meals to your lifestyle'
                  },
                  {
                    icon: Heart,
                    color: 'text-red-400',
                    title: 'Healthy',
                    description: 'Nutritionist-approved nutrition'
                  }
                ].map((feature) => (
                  <div key={feature.title} className="flex items-center space-x-4 py-1.5">
                    <feature.icon className={`w-6 h-6 md:w-8 md:h-8 ${feature.color}`} />
                    <div>
                      <h3 className="font-semibold text-sm md:text-lg">{feature.title}</h3>
                      <p className="text-xs md:text-base opacity-80">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center p-6 md:p-16 md:flex-grow mt-10 md:mt-0">
              <div className="w-4/5 max-w-md space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">Login to Hungryrats</h2>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 md:p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 md:p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-cyan-500 text-white py-3 md:py-4 rounded-xl hover:bg-cyan-600 transition flex items-center justify-center text-base md:text-lg font-semibold"
                >
                  Start Your Journey <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
                </button>
                <p className="text-center text-xs md:text-sm text-gray-500">Forgot password?</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="p-6 md:p-16 md:min-h-screen w-5/6 md:w-auto mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-16">Choose Your Meal Plan</h1>
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 md:max-w-6xl md:mx-auto">
              {[
                { name: 'Starter', price: 4999, meals: 56, highlight: false },
                { name: 'Pro', price: 8999, meals: 106, highlight: true },
                { name: 'Ultimate', price: 12999, meals: 214, highlight: false }
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`
                  rounded-2xl p-6 md:p-8 text-center border-2 
                  ${plan.highlight
                      ? 'border-cyan-500 bg-cyan-50'
                      : 'border-gray-200 hover:border-cyan-300'}
                `}
                >
                  <CreditCard className="mx-auto w-12 h-12 md:w-16 md:h-16 mb-4 text-cyan-500" />
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-2xl md:text-3xl font-extrabold mb-4 text-cyan-600">Rs{plan.price}</p>
                  <p className="mb-4 text-gray-600 md:text-lg">{plan.meals} Meals per Month</p>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className={`
                    w-full py-3 md:py-4 rounded-xl transition md:text-lg
                    ${plan.highlight
                        ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  `}
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="p-6 md:p-16 md:min-h-screen w-5/6 mx-auto md:w-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-16">Select Your Daily Meal</h1>
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 md:max-w-6xl md:mx-auto">
              {[
                { name: 'palak paneer', type: 'High Protein', color: 'bg-green-50', icon: 'text-orange-500' },
                { name: 'Veggie Delight', type: 'Vegetarian', color: 'bg-blue-50', icon: 'text-green-500' },
                { name: 'Mutter Paneer', type: 'Balanced Nutrition', color: 'bg-orange-50', icon: 'text-blue-500' }
              ].map((meal) => (
                <div
                  key={meal.name}
                  className={`
                  rounded-2xl p-6 md:p-8 text-center border-2 ${meal.color}
                `}
                >
                  <Utensils className={`mx-auto w-12 h-12 md:w-16 md:h-16 mb-4 ${meal.icon}`} />
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{meal.name}</h3>
                  <p className="text-base md:text-lg mb-4 text-gray-600">{meal.type}</p>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className={`
                    w-full py-3 md:py-4 rounded-xl transition md:text-lg
                    bg-white text-blue-600 hover:bg-blue-50 border border-blue-200
                  `}
                  >
                    Order Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="p-8 md:p-16 text-center md:min-h-screen md:flex md:flex-col md:justify-center w-5/6 mx-auto md:w-auto">
            <Check className="mx-auto w-24 h-24 md:w-32 md:h-32 text-green-500 mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
            <p className="text-base md:text-xl mb-6 text-gray-600">Your culinary adventure begins now</p>
            <div className="flex flex-col space-y-4 md:max-w-md md:mx-auto">
              <Link href={"/"} className="bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition md:text-lg">
                <button >
                  Track Order
                </button>
              </Link>
              <Link href={"/"} className="border-2 border-gray-300 text-gray-700 py-3 md:py-4 rounded-xl hover:bg-gray-100 transition md:text-lg"><button>
                Back to Home
              </button></Link>
            </div>
          </div>
        )}
      </div>
    </div>

     }





      <Footer />



      <div className={`absolute flex justify-center -top-4 items-center bg-black/20 backdrop-blur-0 h-screen w-full z-10 ${showsignuppopup ? 'block' : 'hidden'}`} onClick={hideLoginpopup}>
        <Loginpopup popup={popup} hideloginpopup={hideLoginpopup} />
      </div>

      {/* CartSidebar */}
     <div 
          className={`fixed right-0 top-0 bg-white sidebar h-screen w-[420px] 
            ${cartsidebar ? "translate-x-4" : "translate-x-full"} 
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
            {isSubscriptionActive? (
              <div className="mt-4 bg-white/20 rounded-lg p-3 flex items-center space-x-2">
                <Zap size={20} className="text-yellow-300" />
                <span className="text-sm font-medium flex-grow">
                  Premium Subscription Active
                </span>
                <CheckCircle size={20} className="text-green-300" />
              </div> 
            )
      :       
      <div className="mt-4 bg-white/20 rounded-lg p-3 flex items-center space-x-2">
      <Zap size={20} className="text-red-500" />
      <span className="text-sm font-medium flex-grow">
        Premium Subscription is Not activated
      </span>
      <X size={20} className="text-red-400" />
    </div>  
          } 
          </div>
    
          {/* Content Section */}
          <div className="p-6">
           {
            getcart?.[0] !== null && isSubscriptionActive? <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4 h-full">
              <img src={getcart?.[0]?.productimage} className='h-40' ></img>
              <div>
                <p className="text-lg font-bold text-gray-800">{getcart?.[0]?.productname}</p>
                <div className="flex items-center space-x-2">
                  <p className={`text-sm ${isSubscriptionActive ? 'text-gray-400 line-through' : 'text-gray-500'}`}>
                    ₹{getcart?.[0]?.price}
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
              <X size={20} onClick={()=>{DeleteCart(getcart?.[0]?._id)}}/>
            </button>
          </div> : ""
           }
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
              onClick={placedOrder}
            >
              {isSubscriptionActive ? 'Order Now' : 'Activate Subscription'}
            </button>
          </div>
        </div>


    </>
  );
};

export default SubscriptionFlow;