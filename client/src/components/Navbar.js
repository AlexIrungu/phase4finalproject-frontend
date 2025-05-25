import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {
  SearchOutlined,
} from "@mui/icons-material";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";

import { useNavigate } from "react-router-dom";
import { shades } from "../theme";
import { setIsCartOpen, resetCart } from "./state";
import { useState } from "react";
import BookList from "./BookList";
import '../index.css'

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());

    // reset cart state
    dispatch(resetCart()); 
  };
  
  const [allValue, setAllValue] = useState("all");
  const [allCategories, setAllCategories] = useState(false);

  return (
    <nav className="bg-amber-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <button
              className="text-xl font-bold text-amber-800 hover:text-amber-900 transition-colors duration-200"
              onClick={() => navigate("/")}
            >
              InkWell Library
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Login/Logout Button */}
            <div className="flex items-center">
              <IconButton
                sx={{ color: shades.primary }}
                onClick={() => navigate("/login")}
                className="hover:bg-amber-100 transition-colors duration-200"
              >
                {user ? (
                  <LogoutSharpIcon fontSize="large" />
                ) : (
                  <LoginSharpIcon fontSize="large" />
                )}
              </IconButton>
            </div>

            {/* Featured Books Dropdown */}
            <div className="relative group">
              <button className="text-amber-800 hover:text-amber-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                Featured Books
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transition-all duration-200">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition-colors duration-200"
                  onClick={() => setAllValue("all")}
                >
                  All Books
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition-colors duration-200"
                  onClick={() => setAllValue("categories")}
                >
                  All Categories
                </button>
              </div>
            </div>

            {/* Search Form */}
            <div className="flex items-center">
              <div className="relative">
                <input
                  className="w-64 px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  type="search"
                  placeholder="Search books..."
                  aria-label="Search"
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors duration-200"
                  type="submit"
                >
                  <SearchOutlined />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-amber-800 hover:text-amber-900 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-colors duration-200"
              aria-expanded="false"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-amber-100 rounded-lg mt-2">
            {/* Mobile Login/Logout */}
            <div className="flex items-center justify-center py-2">
              <IconButton
                sx={{ color: shades.primary }}
                onClick={() => navigate("/login")}
                className="hover:bg-amber-200 transition-colors duration-200"
              >
                {user ? (
                  <LogoutSharpIcon fontSize="large" />
                ) : (
                  <LoginSharpIcon fontSize="large" />
                )}
              </IconButton>
            </div>

            {/* Mobile Dropdown Items */}
            <button
              className="block w-full text-left px-3 py-2 text-amber-800 hover:text-amber-900 hover:bg-amber-200 rounded-md transition-colors duration-200"
              onClick={() => setAllValue("all")}
            >
              All Books
            </button>
            <button
              className="block w-full text-left px-3 py-2 text-amber-800 hover:text-amber-900 hover:bg-amber-200 rounded-md transition-colors duration-200"
              onClick={() => setAllValue("categories")}
            >
              All Categories
            </button>

            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <input
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  type="search"
                  placeholder="Search books..."
                  aria-label="Search"
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors duration-200"
                  type="submit"
                >
                  <SearchOutlined />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;