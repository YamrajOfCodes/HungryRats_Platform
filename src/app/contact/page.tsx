"use client"
import Footer from '@/Components/Footer/Footer';
import Header from '@/Components/Header/Header'
import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ChevronRight, ArrowUpRight, X, CheckCircle, Zap, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Loginpopup from '@/Components/LoginPopup/Loginpopup';
import food from "@/Assets/food.jpg"
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/App/store';
import { useAppDispatch } from '@/hooks';
import { CheckSubscription, Contact, deleteCart, getCart, PostOrder, userVerify } from '@/Redux/Slices/User/userSlice';
import toast from 'react-hot-toast';
import Loader from '@/Components/Loader/Loader';



interface CartItem {
  productimage: string;
  productname: string;
  price: number;
  _id:string;
}


interface User {
  _id: string;
  name?: string; // Add other user properties as needed
  email?: string;
  Firstname?:string;
  mobile?:string;
}

type UserVerifyResponse = User[][]// Array containing arrays of User objects


 const page  = () => {
  
      const router = useRouter();
 
      const [showloginpopup,setloginpopup] = useState(false);
      const [loader,setloader] = useState(true)
      const [showsignuppopup,setsignuppopup] = useState(false);
      const [popup,setpopup] = useState<string>("")
      const [cartsidebar,setcartSidebar] = useState(false);
      const [isSubscriptionActive, setIsSubscriptionActive] = useState(true);
      const { userverify } = useSelector((state: RootState) => state.User) as { userverify: UserVerifyResponse };
      const dispatch = useAppDispatch();

    
      const [name,setname] = useState("");
      const [email,setemail] = useState("");
      const [subject,setsubject] = useState("");
      const [message,setmessage] = useState("");

            
          const DeleteCart = (id:any)=>{
            dispatch(deleteCart(id))
          }

   
      const handleChange = (label:string,value:string)=>{
        if(label == "email"){
          setemail(value)
        }else if(label == "name"){
          setname(value);
        }else{
          setsubject(value)
        }
      }

      const handleContactsubmit = (e:any)=>{
        e.preventDefault();

        if(name === ""){
         return toast.error("name is required");
        }else if(email === ""){
        return  toast.error("Email is required");
        }else if(!email.includes("@")){
         return toast.error("please enter valid email");
        }else if(subject === ""){
         return toast.error("subject is required")
        }else if(message === ""){
         return toast.error("Kindly enter your message")
        }else{
          // console.log(name,email,subject,message);
          const data = {
            name,
            email,
            subject,
            message
          }
          dispatch(Contact(data)).then((res)=>{
            if(res.payload){
              setname("");
              setemail("");
              setsubject("");
              setmessage("");
            }
          })

        }
        
      }



      const { getcart } = useSelector((state: RootState) => state.User) as { getcart: CartItem[] };
      
                       const getData = ()=>{
                        let datas = userverify?.[0]?.[0]?._id
                        // console.log(datas);
                        dispatch(CheckSubscription(datas)).then((res)=>{
                        //  console.log(res);
                                     
                       })
               
                        if(userverify?.[0] == undefined  ){
                        setIsSubscriptionActive(false)
                     }else{
                       let userid = userverify?.[0]?.[0]?._id
                       dispatch(CheckSubscription(userid)).then((res)=>{
                        //  console.log(res);
                     
                         
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
                      
                     
            
                    useEffect(()=>{
                      dispatch(userVerify())
                      setTimeout(() => {
                        setloader(false)
                      }, 2000);
                    },[])
                  
                    useEffect(()=>{
                     getData();
                    },[userverify])
                


    
      //  console.log(dataa);
       
      
    
    
      const handlecartSidebar = ()=>{
        setcartSidebar(true)
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
       console.log(data);
       
   
       dispatch(PostOrder(data)).then((res)=>{
         if(res.payload){
           dispatch(getCart(getcart?.[0]?._id))
         }else{
           toast.error("Order is already placed")
           
         }
       }).catch((error)=>{
        
         
       })
       
      }
   

      

    

      const contactInfo = [
        {
          icon: Phone,
          title: 'Phone',
          lines: ['+91 9960322509', '+91 9404403018'],
          gradient: 'from-[#4facfe] to-[#00f2fe]',
          darkGradient: 'from-[#0072ff] to-[#00c6ff]',
          shadow: 'shadow-[#4facfe]/20'
        },
        {
          icon: Mail,
          title: 'Email',
          lines: ['officialhungryrats@gmail.com'],
          gradient: 'from-[#fa709a] to-[#fee140]',
          darkGradient: 'from-[#f83600] to-[#f9d423]',
          shadow: 'shadow-[#fa709a]/20'
        },
        {
          icon: MapPin,
          title: 'Address',
          lines: ['123 Food Street', 'Cuisine City, FC 12345'],
          gradient: 'from-[#30cfd0] to-[#330867]',
          darkGradient: 'from-[#5ee7df] to-[#b490ca]',
          shadow: 'shadow-[#30cfd0]/20'
        },
        {
          icon: Clock,
          title: 'Hours',
          lines: ['Mon-Fri: 9:00 AM - 10:00 PM', 'Sat-Sun: 10:00 AM - 11:00 PM'],
          gradient: 'from-[#ff0844] to-[#ffb199]',
          darkGradient: 'from-[#ff0844] to-[#ff8177]',
          shadow: 'shadow-[#ff0844]/20'
        }
      ];

      

      
      const [focusedInput, setFocusedInput] = useState<null | string>(null);
     const [hoveredCard, setHoveredCard] = useState<any>(null);

  return (
   <>
   <Header Showpopup={handleLoginpopup} Showsignup={handleSignuppopup} msg={true} cartsidebar={handlecartSidebar}  />
    {
      loader? <Loader/> :
      <div className="contact min-h-screen">
    <div className=" bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6 md:p-12">
      {/* Decorative Elements */}
      <div className="fixed inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className=" text-3xl md:text-5xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-lg md:text-2xl max-w-2xl mx-auto font-light">
            We're here to help make your food delivery experience exceptional
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-2xl border border-gray-100">
            <form className="space-y-8">
              <div className="space-y-6">
                {['name', 'email', 'subject'].map((label) => (
                  <div key={label} className="relative group">
                    <input
                      type={label === 'email' ? 'email' : 'text'}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border-2 border-gray-100 focus:border-blue-500 outline-none transition-all duration-300 peer"
                      placeholder=" "
                      onFocus={() => setFocusedInput(label)}
                      onBlur={() => setFocusedInput(null)}
                      name={label}
                      value={label === "email" ? email : label === "name"?   name  : subject}
                      onChange={(e)=>{handleChange(label,e.target.value)}}
                    />
                    <label className={`absolute left-5 transition-all duration-300 pointer-events-none
                      ${focusedInput === label ? 
                        'text-sm text-blue-600 -translate-y-7 translate-x-2' : 
                        'text-gray-500 top-4 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:-translate-y-7 peer-focus:translate-x-2'
                      }`}>
                      {label}
                    </label>
                  </div>
                ))}
                <div className="relative group">
                  <textarea
                    className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border-2 border-gray-100 focus:border-blue-500 outline-none transition-all duration-300 h-40 peer"
                    placeholder=" "
                    onFocus={() => setFocusedInput('Message')}
                    onBlur={() => setFocusedInput(null)}
                    value={message}
                    onChange={(e)=>{setmessage(e.target.value)}}
                  />
                  <label className={`absolute left-5 transition-all duration-300 pointer-events-none
                    ${message === '' ? 
                      'text-gray-500 top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:-translate-y-7 peer-focus:translate-x-2':
                      'text-sm text-blue-600 -translate-y-7 translate-x-2'  
                    }`}>
                    {"Message"}
                  </label>
                </div>
              </div>
              <button className="group w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-medium tracking-wide transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg flex items-center justify-center gap-3" onClick={handleContactsubmit}>
                Send Message
                <Send className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>

          {/* Enhanced Contact Information */}
          <div className="grid gap-8 md:grid-cols-1">
      {contactInfo.map((item, index) => (
        <div
          key={item.title}
          className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ${item.shadow} shadow-md hover:shadow-2xl`}
          onMouseEnter={() => setHoveredCard(item.title)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            animationDelay: `${index * 150}ms`,
            animation: 'fade-slide-up 0.8s ease-out forwards'
          }}
        >
          {/* Animated Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10 group-hover:opacity-15 transition-opacity duration-500`} />
          
          {/* Main Content Container */}
          <div className="relative bg-white/90 backdrop-blur-lg p-6 transition-transform duration-500 group-hover:translate-y-[-2px]">
            <div className="flex items-start gap-6">
              {/* Animated Icon Container */}
              <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${item.gradient} 
                transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <item.icon className="w-6 h-6 text-white" />
                <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              {/* Content Area */}
              <div className="flex-1 space-y-3">
                {/* Title with Animation */}
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${item.darkGradient} bg-clip-text text-transparent
                    transform transition-all duration-500 group-hover:translate-x-2`}>
                    {item.title}
                  </h3>
                  <ArrowUpRight 
                    className={`w-5 h-5 transform transition-all duration-500 ${item.darkGradient} 
                    ${hoveredCard === item.title ? 'opacity-100 rotate-0 translate-x-0' : 'opacity-0 -rotate-45 -translate-x-4'}`} 
                  />
                </div>

                {/* Information Lines with Hover Effects */}
                <div className="space-y-2">
                  {item.lines.map((line, i) => (
                    <p 
                      key={i} 
                      className={`text-gray-600 transform transition-all duration-500 delay-[${i * 100}ms]
                        ${hoveredCard === item.title ? 'translate-x-2' : ''}`}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* Interactive Border */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.gradient} transition-all duration-500
                  ${hoveredCard === item.title ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
        </div>
      </div>
    </div>
    </div>
    }
   <Footer/>









              {/* Sidebars and Popups */}

  
              <div className={`fixed flex justify-center -top-4 items-center bg-black/20 backdrop-blur-0 h-screen w-full z-10 ${showsignuppopup?'block':'hidden'}`} onClick={hideLoginpopup}>
              <Loginpopup popup={popup} hideloginpopup={hideLoginpopup}  />
              </div>


    {/* CartSidebar */}
  <div 
       className={`fixed right-0 top-0 bg-white sidebar h-screen w-[420px] 
         ${cartsidebar ? "translate-x-6" : "translate-x-full"} 
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
  )
}

export default page
