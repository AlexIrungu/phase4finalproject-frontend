import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css';
// import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <React.Fragment>
      {/* Hero unit */}
      <div className="hero-unit">
        <div className="background-image"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1 className="display-3">Welcome to our Book Library</h1>
              <p className="lead">
                Discover new books or find your next favorite. Browse our selection of titles, authors and genres.
              </p>
            </div>
            <div className="col-md-4 text-right">
              <div className="text-center">
               <NavLink exact to="/home"><button className="btn btn-primary mr-md-2 my-2 my-md-0">Browse Books</button></NavLink> 
              <NavLink exact to="/login"><button className="btn btn-outline-primary mx-md-2 my-2 my-md-0">Login</button></NavLink>  
                <button className="btn btn-outline-secondary ml-md-2 my-2 my-md-0">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End hero unit */}

      {/* Footer */}
      <footer className="bg-light p-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <h6 className="font-weight-bold text-uppercase mb-4">Book Library</h6>
              <p className="text-muted">A simple web app for book lovers.</p>
            </div>
          </div>
        </div>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
//   <Link to="/home">Go to Home</Link>

}

export default LandingPage;
