import React from 'react'
import MainCarousel from "./MainCarousel";
import BookList from "./BookList";



const Home = () => {
  return (
    <div className="home">
      <MainCarousel />
      <BookList />
      
    </div>
  );
};

export default Home;