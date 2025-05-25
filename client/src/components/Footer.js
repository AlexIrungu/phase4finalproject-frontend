import React from "react";
import { Typography } from "@mui/material";
import { shades } from "../theme";

function Footer() {
  return (
    <footer className="mt-16 py-10 bg-neutral-100">
      <div className="w-4/5 mx-auto">
        <div className="flex flex-wrap justify-between gap-8 lg:gap-10">
          {/* InkWell Library Column */}
          <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] xl:w-[calc(30%-1.5rem)]">
            <Typography 
              variant="h4" 
              className="font-bold mb-8 text-gray-800"
            >
              InkWell-Library
            </Typography>
            <Typography 
              variant="body1" 
              className="text-gray-600 leading-relaxed"
              style={{ color: shades.secondary[500] }}
            >
              Inkwell Library is a book app designed to cater to book lovers who
              want to explore different genres and authors. The app offers an
              extensive collection of books ranging from classic literature to
              modern-day bestsellers. With Inkwell Library, users can easily
              search for books by author, title, or genre, and save their favorite
              titles to personalized reading lists. The app also features book
              recommendations and reviews from other readers, providing a
              community-driven experience. With a simple and user-friendly
              interface, Inkwell Library makes reading and discovering new books
              easy and accessible. Whether you're a casual reader or a bookworm,
              Inkwell Library has something for everyone.
            </Typography>
          </div>

          {/* About Us Column */}
          <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] xl:w-[calc(20%-1.5rem)]">
            <Typography 
              variant="h4" 
              className="font-bold mb-8 text-gray-800"
            >
              About Us
            </Typography>
            <div className="space-y-6">
              <Typography 
                variant="body1" 
                className="cursor-pointer text-gray-700 hover:text-amber-700 hover:underline transition-all duration-200"
              >
                Careers
              </Typography>
              <Typography 
                variant="body1" 
                className="cursor-pointer text-gray-700 hover:text-amber-700 hover:underline transition-all duration-200"
              >
                Our Stores
              </Typography>
              <Typography 
                variant="body1" 
                className="cursor-pointer text-gray-700 hover:text-amber-700 hover:underline transition-all duration-200"
              >
                Terms & Conditions
              </Typography>
              <Typography 
                variant="body1" 
                className="cursor-pointer text-gray-700 hover:text-amber-700 hover:underline transition-all duration-200"
              >
                Privacy Policy
              </Typography>
            </div>
          </div>

          {/* Customer Care Column */}
          <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] xl:w-[calc(25%-1.5rem)]">
            <Typography 
              variant="h4" 
              className="font-bold mb-8 text-gray-800"
            >
              Customer Care
            </Typography>
            <div className="space-y-6">
              <Typography 
                variant="body1" 
                className="cursor-pointer text-gray-700 hover:text-amber-700 hover:underline transition-all duration-200"
              >
                Help Center
              </Typography>
              <Typography 
                variant="body1" 
                className="cursor-pointer text-gray-700 hover:text-amber-700 hover:underline transition-all duration-200"
              >
                Frequently Asked Questions
              </Typography>
              <Typography 
                variant="body1" 
                className="cursor-pointer text-gray-700 hover:text-amber-700 hover:underline transition-all duration-200"
              >
                Complaints
              </Typography>
              <Typography 
                variant="body1" 
                className="cursor-pointer text-gray-700 hover:text-amber-700 hover:underline transition-all duration-200"
              >
                Track Your Order
              </Typography>
              <Typography 
                variant="body1" 
                className="cursor-pointer text-gray-700 hover:text-amber-700 hover:underline transition-all duration-200"
              >
                Corporate & Bulk Purchasing
              </Typography>
              <Typography 
                variant="body1" 
                className="cursor-pointer text-gray-700 hover:text-amber-700 hover:underline transition-all duration-200"
              >
                Partner With Us
              </Typography>
              <Typography 
                variant="body1" 
                className="cursor-pointer text-gray-700 hover:text-amber-700 hover:underline transition-all duration-200"
              >
                Returns & Refunds
              </Typography>
            </div>
          </div>

          {/* Contact Us Column */}
          <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] xl:w-[calc(25%-1.5rem)]">
            <Typography 
              variant="h4" 
              className="font-bold mb-8 text-gray-800"
            >
              Contact Us
            </Typography>
            <div className="space-y-6">
              <Typography 
                variant="body1" 
                className="text-gray-600"
                style={{ color: shades.secondary[500] }}
              >
                Office Address: Ngong Lane Plaza, Ngong Road
              </Typography>
              <Typography 
                variant="body1" 
                className="text-gray-600 break-words"
                style={{ color: shades.secondary[500] }}
              >
                Email: support@inkwell.com
              </Typography>
              <Typography 
                variant="body1" 
                className="text-gray-600"
                style={{ color: shades.secondary[500] }}
              >
                +254-712-345-678
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;