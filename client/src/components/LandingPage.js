import React from 'react';
import { NavLink } from 'react-router-dom';

function LandingPage() {
  return (
    <React.Fragment>
      {/* Hero unit */}
      <div className="relative min-h-screen flex items-center">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2086&q=80)'
          }}
        ></div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Welcome to our Book Library
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                Discover new books or find your next favorite. Browse our selection of titles, authors and genres.
              </p>
            </div>
            <div className="lg:col-span-1 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
              <NavLink to="/home" className="w-full sm:w-auto">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                  Browse Books
                </button>
              </NavLink>
              <NavLink to="/login" className="w-full sm:w-auto">
                <button className="w-full bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                  Login
                </button>
              </NavLink>
              <button className="w-full sm:w-auto bg-transparent border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900 font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End hero unit */}

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <h6 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
                Book Library
              </h6>
              <p className="text-gray-600 text-base leading-relaxed max-w-md">
                A simple web app for book lovers to discover, explore, and manage their favorite reads.
              </p>
            </div>
            <div>
              <h6 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                Quick Links
              </h6>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">Browse Books</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">Categories</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">Authors</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                Account
              </h6>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">Login</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">Sign Up</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">My Library</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8">
            <p className="text-center text-gray-500 text-sm">
              &copy; 2025 Book Library. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default LandingPage;