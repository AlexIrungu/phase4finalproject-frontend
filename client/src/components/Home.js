import React from 'react'
import MainCarousel from "./MainCarousel";
import BookList from "./BookList";
import Navbar from './Navbar';
import BookDetails from './BookDetails';
import Footer from './Footer';
import '../index.css'



const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <MainCarousel />
      <BookList />
      <BookDetails />
      <Footer />
      
    </div>
  );
};

export default Home;