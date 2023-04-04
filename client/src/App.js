import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import BookDetails from "./components/BookDetails";
import Confirmation from "./components/Confirmation";
import Navbar from "./components/Navbar";
import CartMenu from "./components/CartMenu";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import PrivateRoutes from "./components/PrivateRoutes";


// starts each page you navigate to at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login user
    fetch("/me", {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        res
          .json()
          .then((user) => {
            sessionStorage.setItem("user", user);
            setUser(user);
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleRegister = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <div className="app">
      
      <Navbar user={user} onLogout={handleLogout} />
      <ScrollToTop />
      <Routes>
        {/* <Route exact element={<PrivateRoutes user={user} />}>
          <Route exact path="/checkout/success" element={<Confirmation />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Route> */}

        <Route
          exact
          path="/login"
          element={
            !user ? (
              <Login setUser onLogin={handleLogin} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          exact
          path="/register"
          element={
            !user ? (
              <Register onRegister={handleRegister} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          exact
          path="/"
          element={<Home user={user} />}
        />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/checkout/success" element={<Confirmation />} />
        <Route exact path="book/:bookId" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CartMenu user={user} />
      <Footer />
     
    </div>
  );
}

export default App;