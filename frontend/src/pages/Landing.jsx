import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../App.css";

 function LandingPage() {

  const router = useNavigate();

  return(

    <div className="landingPageContainer">

      <nav>

      <div className="left-header">
  <h1 style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
    <img style={{ height: "60px" }} src="/logo.png" alt="" />
     <span>Just</span> Chat
  </h1>
</div>
        <div className="right-header">

           
            <p onClick={()=>{
              router("/home")

            }}>Join as Guest</p>
            <Link to="/auth">Register</Link>
          <Link to="/auth" className="primaryBtn">Login</Link>

        </div>

      </nav>


      <div className="landingMainContainer">

        <div className="left-section">

        <h1><span>Connect</span> with your <br /> Loved Ones</h1>
        <h3>Chat, call and collaborate seamlessly with <span>Just Chat !</span></h3>
        {/* <button className="btn btn-hero">Get Started </button> */}

        <Link to="/auth" className="primaryBtn">
  Get Started
</Link>

        </div>

        <div className="right-section">
          <img src="/mobile.png"  alt="" />
        </div>


      </div>

    </div>
  )
}

export default LandingPage;