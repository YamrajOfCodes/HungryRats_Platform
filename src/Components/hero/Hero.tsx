"use-client"
import React, { useState } from 'react'
import { Truck, Utensils, MenuSquare, Bike, Store, Building2, ArrowRight, Star, Award, Zap, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Model from "@/Assets/hungryrats_model.png"
import Rider from "@/Assets/Rider.png"
import Partner from "@/Assets/Partner.png"
import Colleague from "@/Assets/Colleague.png"
import Link from 'next/link';

const Hero = () => {
   
  const [clicked,setclicked]=useState<boolean>(false)

  const sections = [
    {
      title: "Become a Delivery Partner",
      icon: <Bike className="w-12 h-12 text-blue-500" />,
      description: "Earn money delivering food from local restaurants! With a bike or bicycle, you can start earning extra income while staying active.",
      buttonText: "Start Earning",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100"
    },
    {
      title: "Partner Your Restaurant",
      icon: <Store className="w-12 h-12 text-green-500" />,
      description: "HungryRats helps restaurants and mess services grow through online ordering. We guarantee noticeable growth within 90 days of joining!",
      buttonText: "Grow Your Business",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100"
    },
    {
      title: "Join Our Team",
      icon: <Building2 className="w-12 h-12 text-purple-500" />,
      description: "Join a dynamic team that's dedicated to building one of the top delivery services in India. Be a part of an exciting journey to revolutionize the food delivery industry!",
      buttonText: "View Openings",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100"
    }
  ];

  const services = [
    {
      icon: <Truck size={28} className="text-blue-600" />,
      title: "Fast Delivery",
      description: "Fast and reliable delivery for customers who need fresh meals quickly, without compromising on quality."
    },
    {
      icon: <Utensils size={28} className="text-blue-600" />,
      title: "Variety of Taste",
      description: "We offer a wide variety of flavors to satisfy every craving, ensuring there's something for everyone to enjoy."
    },
    {
      icon: <MenuSquare size={28} className="text-blue-600" />,
      title: "Updated Menu",
      description: "In the order of food delivery we update menu daily avoid repeatable items"
    }
  ];


  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      text: "India's first affordable food delivery service"
    },
    {
      icon: <Award className="w-6 h-6" />,
      text: "Extensive variety of authentic local cuisines"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      text: "Perfect for both regular customers and out-of-home residents"
    }
  ];

  const deskwork = [{
    image:Rider,
    heading:"As a Rider",
    desc:"Earn money delivering food from local restaurants! With a bike or bicycle, you can start earning extra income while staying active.",
    buttontext:"Ride with us",
    message:"I want to join as a rider"
  },
  {
    image:Partner,
    heading:"As a partner",
    desc:"Hungryrats helps restraunts and mess to growth online ordering, we asure to growth in 70 days to join",
    buttontext:"Partner with us",
    message:"I want to partner with you"
  },
  {
    image:Colleague,
    heading:"As a colleague",
    desc:"Join a dynamic team that's dedicated to building one of the top delivery services in India. Be a part of an exciting journey to revolutionize the food delivery industry!",
    buttontext:"Work with us",
    message:"I want to join you as a colleague"
  },
 
]

  return (
    <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 py-10 space-y-20 md:space-y-32">
     

     
      <div>
      <div className="flex justify-center items-center gap-3 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Amazing
        </h2>
        <div className="relative">
          {/* Background decorative elements */}
          <div
            className="absolute inset-0 bg-blue-600 transform -skew-x-12 translate-x-2 translate-y-1"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-blue-500 transform -skew-x-12"
            aria-hidden="true"
          />
          {/* Main skewed container */}
          <div className="relative transform hover:-skew-x-12 transition-transform duration-300">
            <span className="relative block text-3xl md:text-4xl font-bold text-white px-10 py-1">
              Services
            </span>
            {/* Decorative bottom line */}
            <div
              className="absolute bottom-0 left-0 w-full h-1 bg-white transform -skew-x-12 opacity-50"
              aria-hidden="true"
            />
            {/* Decorative top line */}
            <div
              className="absolute top-0 right-0 w-full h-1 bg-white transform -skew-x-12 opacity-50"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 space-y-5 mt-5 '>
        {services.map((service, index) => (
          <div
            key={index}
            className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" style={{marginTop:"inherit"}}
          >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                {service.icon}
              </div>

              <h4 className="text-xl font-semibold mb-3 md:text-2xl text-gray-800">
                {service.title}
              </h4>

              <p className="text-center text-gray-600 md:text-lg leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
        </div>
      </div>
     

      <div className="relative overflow-hidden py-20">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content Section */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-blue-600 font-medium text-sm tracking-wider uppercase">
                A Reputed Brand
              </span>
              
              <div className="flex items-center gap-4 flex-wrap">
                <h2 className="text-4xl font-bold text-gray-900">Why</h2>
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 transform -skew-x-12" />
                  <h2 className="relative text-4xl font-bold text-white px-8 py-2">
                    Choose Us?
                  </h2>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              Hungryrats is revolutionizing food delivery in India by making it more affordable and accessible than ever. 
              We understand the diverse needs of our customers - from regular food enthusiasts to those living away from home. 
              Our platform brings you a curated selection of flavors that satisfy every craving.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    {feature.icon}
                  </div>
                  <p className="text-gray-700">{feature.text}</p>
                </div>
              ))}
            </div>

           <Link href={"/subscription"} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300">
           <button className='flex justify-center items-center gap-2' onClick={()=>{setclicked(!clicked)}}>
              Subscribe
              <ChevronRight className="w-4 h-4" />
            </button></Link>
          </div>

          {/* Right Image Section */}
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-3xl transform rotate-3" />
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src={Model.src}
                height={200}
                alt="Hungryrats Experience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

      <div className="work mt-10 px-2">
        <div className="flex justify-center items-center gap-3 py-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
            Work with
          </h2>
          <div className="relative">
            {/* Background decorative elements */}
            <div
              className="absolute inset-0 bg-blue-600 transform -skew-x-12 translate-x-2 translate-y-1"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-blue-500 transform -skew-x-12"
              aria-hidden="true"
            />
            {/* Main skewed container */}
            <div className="relative transform hover:-skew-x-12 transition-transform duration-300">
              <span className="relative block text-2xl md:text-4xl font-bold text-white px-10 py-1">
                Hungryrats
              </span>
              {/* Decorative bottom line */}
              <div
                className="absolute bottom-0 left-0 w-full h-1 bg-white transform -skew-x-12 opacity-50"
                aria-hidden="true"
              />
              {/* Decorative top line */}
              <div
                className="absolute top-0 right-0 w-full h-1 bg-white transform -skew-x-12 opacity-50"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <hr className='bg-black' />
        <div className="w-full p-6 space-y-8 lg:hidden">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-102 ${section.bgColor}`}
        >
          <div className="p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center">
                {section.icon}
              </div>
            </div>
            
            <div className="flex-grow space-y-4 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.description}</p>
              
              <Link href={`/contact`}><button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-semibold transition-colors hover:bg-gray-800">
                {section.buttonText}
                <ArrowRight className="w-4 h-4" />
              </button></Link>
            </div>
          </div>
        </div>
      ))}
    </div>

     <div>
      <div className=" hidden lg:flex flex-col justify-center items-center gap-14 ">
     {
      deskwork?.map((element:any,index:number)=>{
        return(
          <div key={index}>
            <hr className='border border-gray-200'/>
        <div className='flex justify-center items-center gap-8'>
       <div className="first">
      <Image src={element?.image} height={300} width={600} alt='bike image'></Image>
     </div>
     <div className="second w-1/2 space-y-5">
      <h4 className='text-2xl font-semibold'>{element?.heading}</h4>
        <p className='text-lg'>{element?.desc}</p>
        <Link href={{ pathname: '/contact', query: { element } }}>
       <div className='mt-5'>
          <button className='px-6 py-2 bg-blue-600 text-white rounded-xl'>{element?.buttontext}</button>
        </div></Link>
     </div>
       </div>
          </div>
        )
      })
     }
      </div>
     
     </div>

      </div>
    </div>
  );
}

export default Hero
