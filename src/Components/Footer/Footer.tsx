import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12 space-y-4">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
            Hungryrats
          </h3>
          <p className="text-sm text-center max-w-md text-gray-400">
            Delivering happiness to your doorstep, one meal at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Our Menu', 'Special Offers', 'Restaurants', 'Track Order'].map((link) => (
                <li key={link} className="group">
                  <a href="#" className="inline-flex items-center hover:text-white transition-colors">
                    <span className="transform group-hover:translate-x-2 transition-transform">
                      {link}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
            </h4>
            <div className="space-y-4">
              {[
                { icon: Phone, text: '+1 (555) 123-4567' },
                { icon: Mail, text: 'support@foodieexpress.com' },
                { icon: MapPin, text: '123 Delivery Street, Food City' }
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center space-x-3 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-orange-500 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Connect */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white relative inline-block">
              Connect With Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
            </h4>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, color: 'hover:bg-blue-600' },
                { icon: Twitter, color: 'hover:bg-blue-400' },
                { icon: Instagram, color: 'hover:bg-pink-600' },
                { icon: Youtube, color: 'hover:bg-red-600' }
              ].map(({ icon: Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`p-3 bg-gray-800 rounded-lg transition-all hover:-translate-y-1 ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
            </h4>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">Get updates on special offers and more!</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">© 2025 Hungryrats. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((text) => (
                <a
                  key={text}
                  href="#"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;