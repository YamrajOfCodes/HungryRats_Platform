import React from 'react'

const FeatureCard = ({ icon, title, description }:any) => {
  return (
    <div>
        <div className="flex items-start space-x-4 p-6 rounded-xl bg-white border border-gray-100 hover:border-indigo-100 transition-colors duration-200">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
    </div>
  )
}

export default FeatureCard
