"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Rocket, 
  Utensils, 
  MapPin, 
  Bike, 
  Clock, 
  Star,
  IndianRupee, 
  CreditCard,
  Medal,
  LeafyGreen,
  CheckCircle,
  Truck,
  Gift,
  User
} from 'lucide-react';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import Loginpopup from '@/Components/LoginPopup/Loginpopup';
import food from "@/Assets/food.jpg"
import {  ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/App/store';
import { CheckSubscription, getCart, getProductsdata, userVerify } from '@/Redux/Slices/User/userSlice';
import { useAppDispatch } from '@/hooks';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';


interface User{
  _id: string;
  name?: string; // Add other user properties as needed
  email?: string;
}

type Users = User[][];

 interface Carts{
  productimage: string;
  productname: string;
  price: number;
 }

const page = () => {
  const [selectedPlan, setSelectedPlan] = useState('1 Month');
    const [activeSection, setActiveSection] = useState('explore');
    const plansss = ['1 Month', '2 Months', '3 Months'];
    const [expandedSection, setExpandedSection] = useState(null);
      const [cartsidebar,setcartSidebar] = useState(false);
       const [isSubscriptionActive, setIsSubscriptionActive] = useState(true);
       const {userverify} = useSelector((state:RootState)=>state.User) as { userverify : Users };
       const {subscription} = useSelector((state:RootState)=>state.User);
       console.log(subscription);
       
       const dispatch = useAppDispatch();

       console.log("userverify",userverify);

       const [response,setResponse] = useState<any>();
       const [err,setError] = useState<any>()
       

    const [plan,setplan] = useState({
      name: 'Starter Plan',
      price: 4299,
      meals: 20,
      savings: 25,
      icon: <Zap className="w-10 h-10 text-cyan-400" />
    })

   const handleclick = (value:string)=>{
       if(value == "1 Month"){
          setplan({
            name: 'Starter Plan',
            price: 4299,
            meals: 28,
            savings: 25,
            icon: <Zap className="w-6 h-6 text-cyan-400" />
          })
          
       }else if(value == "2 Months"){
        setplan({
          name: 'Pro Plan',
          price: 4299 * 2,
            meals: 56,
           savings: 35,
          icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />
       })

       }else{
        setplan(  {
          name: 'Ultimate Plan',
          price: 4299 * 3 - 100,
          meals: 84,
          savings: 45,
          icon: <Rocket className="w-6 h-6 text-indigo-400" />
        })
       }
   }
   const handleClick = (plan:any) => {
    setSelectedPlan(plan);
  };


  const handleSubscription = (price:any)=>{
     if(userverify?.[0] == undefined){
      handleSignuppopup();
     }else{

      let userid = userverify?.[0]?.[0]?._id
      dispatch(CheckSubscription(userid)).then((res)=>{
        console.log(res);
        
        if(res.payload == "not subscribed"){
          handlePayment(price);
        }else{
          toast.error("Subscription is already active!!");
        }
      })
      
     }
  }

  const handlePayment = async (price:any) => {
   let orderId = Math. floor(Math. random() * (9999999999 - 100000000 + 1)) + 1000000000
    const apiUrl = 'http://localhost:4000/user/api/payment';
    const postData = {
        customer_mobile: '8956903018',
        user_token: '31b8e247b5b4bdc8cc6769cb32db3cd3',
        amount: price || "1",
        order_id: orderId,
        redirect_url: 'http://localhost:3000/success-premium',
        remark1: 'testremark',
        remark2: 'testremark2'
    };

    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        const data = await res.json();
        setResponse(data);
        setError(null);
        
        if (data.result && data.result.payment_url) {
            window.location.href = data.result.payment_url; // Redirect to payment page
        }
    } catch (err) {
        setResponse(null);
    }
};

   

    const sections:any = {
      explore: {
        icon: <Utensils className="w-10 h-10 text-cyan-400" />,
        title: "Explore Cuisines",
        description: "Discover restaurants near you with diverse culinary options."
      },
      track: {
        icon: <MapPin className="w-10 h-10 text-emerald-400" />,
        title: "Real-Time Tracking",
        description: "Follow your meal's journey from kitchen to doorstep."
      },
      speed: {
        icon: <Bike className="w-10 h-10 text-indigo-400" />,
        title: "Lightning Fast",
        description: "Guaranteed delivery within 30 minutes or it's free."
      }
    };
  
    const plans = [
      {
        name: 'Starter Plan',
        price: 4299,
        meals: 28,
        savings: 25,
        icon: <Zap className="w-10 h-10 text-cyan-400" />
      },
      {
        name: 'Pro Plan',
        price: 4299 * 2,
        meals: 56,
        savings: 35,
        icon: <ShieldCheck className="w-10 h-10 text-emerald-400" />
      },
      {
        name: 'Ultimate Plan',
        price: 4299 * 3 - 100,
        meals: 240,
        savings: 45,
        icon: <Rocket className="w-10 h-10 text-indigo-400" />
      }
    ];
  
    const toggleSection = (section:any) => {
      setExpandedSection(expandedSection === section ? null : section);
    };

      const [showloginpopup,setloginpopup] = useState(false);
          const [showsignuppopup,setsignuppopup] = useState(false);
          const [popup,setpopup] = useState("")
        
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

       
          const planss = [
            { 
              name: 'Starter Plan', 
              price: 99, 
              meals: 20, 
              savings: 10,
              icon: <Truck className="mx-auto w-12 h-12 text-cyan-600 mb-4" />
            },
            { 
              name: 'Popular Plan', 
              price: 179, 
              meals: 40, 
              savings: 15,
              icon: <CreditCard className="mx-auto w-12 h-12 text-cyan-600 mb-4" />
            },
            { 
              name: 'Best Value Plan', 
              price: 249, 
              meals: 60, 
              savings: 20,
              icon: <Truck className="mx-auto w-12 h-12 text-cyan-600 mb-4" />
            }
          ];

          const handlecartSidebar = ()=>{
            setcartSidebar(true)
          }



          const { getcart } = useSelector((state:RootState)=>state.User) as { getcart : Carts[] };
          console.log(getcart);


const getData = ()=>{
      let datas = userverify?.[0]?.[0]?._id
      console.log(datas);

      if(userverify?.[0] == undefined){
         setIsSubscriptionActive(false)
      }else{
        setIsSubscriptionActive(true)
      }
      
      dispatch(getCart(datas))  
      
    
    }
     
     
  

    useEffect(()=>{
      dispatch(userVerify())
    },[])
  
    useEffect(()=>{
     getData();
    },[userverify])

 
  
  return (
     <>
  
       <Header Showpopup={handleLoginpopup} Showsignup={handleSignuppopup} msg={true} cartsidebar={handlecartSidebar} />

    
      {/* Mobile devices */}
     <div className="min-h-screen bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 flex flex-col items-center justify-center sm:hidden">
      <div className="w-[90%] max-w-md overflow-hidden">

        {/* Subscription Plan Selector */}
        <div className="p-4 bg-white/0">
        <div className="flex justify-center mb-6">
      {plansss.map((plan) => (
        <button
          key={plan}
          onClick={() => {
            handleClick(plan),
            handleclick(plan)
          }}
          className={`px-5 py-2 mx-2 rounded-lg text-sm font-medium transition-all 
            ${
              selectedPlan === plan
                ? 'bg-blue-500 text-white shadow-md scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
            }
          `}
        >
          {plan}
        </button>
      ))}
    </div>
        </div>

        {/* Mobile Expandable Sections */}
        <div className="p-4 space-y-4">
          {Object.keys(sections).map((key) => (
            <div 
              key={key} 
              className="bg-blue-700 rounded-lg overflow-hidden"
            >
              <button 
                onClick={() => toggleSection(key)}
                className={`w-full flex items-center justify-between p-4 bg-white ${
                  expandedSection === key ? 'bg-white text-indigo-600' : 'text-black'
                }`}
              >
                <div className="flex items-center">
                  {sections?.[key].icon}
                  <span className="ml-3 font-bold">{sections[key].title}</span>
                </div>
                <span>{expandedSection === key ? '−' : '+'}</span>
              </button>
              
              {expandedSection === key && (
                <div className="p-4 text-white/80 bg-zinc-600">
                  <p>{sections[key].description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Subscription Plans */}
        <div className="p-4 space-y-4 ">
            <div 
              key={plan.name} 
              className="bg-blue-50 rounded-xl  p-6 text-center border border-zinc-600 hover:border-cyan-500 transition-all"
            >
              {plan.icon}
              <h2 className="text-xl font-bold mt-4 mb-2 text-black">{plan.name}</h2>
              <p className="text-2xl font-extrabold text-cyan-400 mb-4 flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 mr-1" />
                  {plan.price}
                </p>
              <ul className="space-y-2 mb-6 text-white/70">
                <li className='text-black'>{plan.meals} Prepared Meals</li>
                <li className='text-black'>Save {plan.savings}%</li>
                <li className='text-black'>Free Delivery</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-full hover:opacity-90 transition" onClick={()=>{handleSubscription(plan.price)}}>
                Choose Plan
              </button>
            </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg flex items-center">
            <Clock className="mr-2 text-cyan-400" />
            <div>
              <h4 className="font-bold text-black">30 min</h4>
              <p className="text-xs text-black">Delivery Time</p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg flex items-center">
            <Star className="mr-2 text-green-400" />
            <div>
              <h4 className="font-bold text-black">4.8</h4>
              <p className="text-xs text-black">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>

     {/* Desktop screens */}
    <div 
      className="w-full   bg-white  shadow-lg overflow-hidden hidden sm:flex gap-2 flex-col lg:flex-row lg:h-[85vh]"
    >
      {/* Left Section */}
      <div className="bg-gradient-to-br from-blue-700 to-indigo-800 p-12 flex flex-col justify-between relative text-white w-full lg:w-1/2 ">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-60 h-60 bg-white/10 rounded-full -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-80 h-80 bg-white/5 rounded-full -bottom-20 -right-20 animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold mb-4">Hungryrats</h1>
          <p className="text-xl font-light mb-6">Revolutionizing Meal Experiences</p>
          
          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <div className="flex items-center mb-2">
              <Gift className="mr-3 text-yellow-300" />
              <h3 className="font-semibold">Exclusive Offer</h3>
            </div>
            <p className="text-sm">New subscribers get 30% off first month + free nutritionist consultation</p>
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          <button
            onClick={() => setActiveSection('meals')}
            className={`
              w-full flex items-center p-4 rounded-lg transition duration-300
              ${
                activeSection === 'meals'
                  ? "bg-white text-indigo-700"
                  : "bg-transparent text-white hover:bg-white/10"
              }
            `}
          >
            <Utensils className="w-8 h-8" />
            <div className="ml-4 text-left">
              <h3 className="text-xl font-semibold">Personalized Nutrition</h3>
              <p className="text-sm font-light opacity-80">
                Chef-curated meals tailored to your lifestyle
              </p>
              {activeSection === 'meals' && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-xs">
                    <CheckCircle className="mr-2 w-4 h-4 text-green-400" />
                    Macro-balanced recipes
                  </div>
                  <div className="flex items-center text-xs">
                    <LeafyGreen className="mr-2 w-4 h-4 text-green-400" />
                    Multiple dietary preferences
                  </div>
                  <div className="flex items-center text-xs">
                    <Medal className="mr-2 w-4 h-4 text-green-400" />
                    Nutritionist-approved meals
                  </div>
                </div>
              )}
            </div>
          </button>

          <button
            onClick={() => setActiveSection('delivery')}
            className={`
              w-full flex items-center p-4 rounded-lg transition duration-300
              ${
                activeSection === 'delivery'
                  ? "bg-white text-indigo-700"
                  : "bg-transparent text-white hover:bg-white/10"
              }
            `}
          >
            <Truck className="w-8 h-8" />
            <div className="ml-4 text-left">
              <h3 className="text-xl font-semibold">Smart Delivery</h3>
              <p className="text-sm font-light opacity-80">
                Convenient, contactless meal solutions
              </p>
              {activeSection === 'delivery' && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-xs">
                    <CheckCircle className="mr-2 w-4 h-4 text-green-400" />
                    30-minute precise delivery
                  </div>
                  <div className="flex items-center text-xs">
                    <LeafyGreen className="mr-2 w-4 h-4 text-green-400" />
                    Eco-friendly packaging
                  </div>
                  <div className="flex items-center text-xs">
                    <Medal className="mr-2 w-4 h-4 text-green-400" />
                    Nationwide coverage
                  </div>
                </div>
              )}
            </div>
          </button>

          <button
            onClick={() => setActiveSection('quality')}
            className={`
              w-full flex items-center p-4 rounded-lg transition duration-300
              ${
                activeSection === 'quality'
                  ? "bg-white text-indigo-700"
                  : "bg-transparent text-white hover:bg-white/10"
              }
            `}
          >
            <ShieldCheck className="w-8 h-8" />
            <div className="ml-4 text-left">
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="text-sm font-light opacity-80">
                Ethically sourced, carefully prepared
              </p>
              {activeSection === 'quality' && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-xs">
                    <CheckCircle className="mr-2 w-4 h-4 text-green-400" />
                    Local farm partnerships
                  </div>
                  <div className="flex items-center text-xs">
                    <LeafyGreen className="mr-2 w-4 h-4 text-green-400" />
                    Organic ingredient priority
                  </div>
                  <div className="flex items-center text-xs">
                    <Medal className="mr-2 w-4 h-4 text-green-400" />
                    No artificial preservatives
                  </div>
                </div>
              )}
            </div>
          </button>
        </div>

        <div className="relative z-10 mt-8 text-sm font-light opacity-70 flex justify-between items-center">
          <p>© 2024 Hungryrats</p>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-white/70">Privacy</a>
            <a href="#" className="hover:text-white/70">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="p-12 bg-gray-50 flex flex-col justify-between overflow-y-auto w-full">
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Choose Your Subscription</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-all"
              >
                {plan.icon}
                <h2 className="text-xl font-bold mt-4 text-gray-800">
                  {plan.name}
                </h2>
                <p className="text-3xl font-extrabold text-cyan-600 my-4">
                  ${plan.price}
                  <span className="text-sm text-gray-500 ml-2">/ sub</span>
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>{plan.meals} Prepared Meals</li>
                  <li>Save {plan.savings}%</li>
                  <li>Free Delivery</li>
                  <li>Nutrition Consultation</li>
                </ul>
                <button className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition"onClick={()=>{handleSubscription(plan.price)}}>
                  Select Plan
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-cyan-50 p-4 rounded-lg flex items-center shadow-sm">
              <Clock className="mr-3 text-cyan-500" />
              <div>
                <h4 className="font-semibold">30 min</h4>
                <p className="text-sm text-gray-600">Delivery Time</p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg flex items-center shadow-sm">
              <Star className="mr-3 text-green-500" />
              <div>
                <h4 className="font-semibold">4.8</h4>
                <p className="text-sm text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>

    <Footer/>




              {/* Sidebars and Popups */}

  
    <div className={`absolute flex justify-center top-0 items-center bg-black/20 backdrop-blur-0 h-screen w-full z-10 ${showsignuppopup?'block':'hidden'}`} onClick={hideLoginpopup}>
    <Loginpopup hideloginpopup={hideLoginpopup} popup={popup} />
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
           isSubscriptionActive &&  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between shadow-sm">
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
             <X size={20} />
           </button>
         </div>
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
           >
             {isSubscriptionActive ? 'Order Now' : 'Activate Subscription'}
           </button>
         </div>
       </div>
     </>
  );
};

export default page;