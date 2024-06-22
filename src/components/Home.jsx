/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useRef, useEffect } from 'react'
import tiet_logo from './assets/tiet_logo.png'
import closelogo from './assets/closelogo.svg'
import amazonlogo from './assets/amazonlogo.png'
import Deloittelogo from './assets/Deloittelogo.png'
import hitachilogo from './assets/hitachilogo.png'
import microsoftlogo from './assets/microsoftlogo.png'
import sandisklogo from './assets/sandisklogo.png'
import tcslogo from './assets/tcslogo.png'
import insta from './assets/insta.svg'
import fb from './assets/fb.svg'
import twitter from './assets/twitter.svg'
import linkedin from './assets/linkedin.svg'
import youtube from './assets/youtube.svg'
import Source from './assets/TIET LOGO 1.png'
import CampusCarouselIMG1 from './assets/CampusCarouselIMG1.jpg';
import CampusCarouselIMG2 from './assets/CampusCarouselIMG2.jpg';
import CampusCarouselIMG3 from './assets/CampusCarouselIMG3.jpg';
import './Home.css'
import Carousel from './Carousel'
function Home() {

  const HandleClickLogin = (e) => {
    document.querySelector(".LoginBox").style.left = "0px";
    document.querySelector(".LoginHeading").innerHTML = "Login";

    let tietlogo = document.querySelector(".logo");
    tietlogo.style.opacity = "0%";

    let maincontainer = document.querySelector(".maincontainer");
    maincontainer.style.right = "8vw";
  }

  const HandleCloseLogin = (e) => {
    document.querySelector(".LoginBox").style.left = "-400px";

    let tietlogo = document.querySelector(".logo");
    tietlogo.style.opacity = "100%";

    let maincontainer = document.querySelector(".maincontainer");
    maincontainer.style.right = "20vw";
  }

  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      const container = entry.target;
      if (entry.isIntersecting) {
        container.style.opacity = 1;  // Animate in
        container.style.transform = 'translateY(-40px)';  // Remove any initial transform
      } else {
        container.style.opacity = 0;
        container.style.transform = 'translateY(30px)';
      }
    });
  };


  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(containerRef1.current);
    observer.observe(containerRef2.current);
    observer.observe(containerRef3.current);

    return () => observer.disconnect();
  }, []);


  return (
    <div className='bgcolor'>
      <div className="firstsection">

        <div className="navbar">
          <div className="logo">
            <img className="tietlogo" src={Source} alt="" width="70px" />
            <div>
              <h5 style={{ color: 'brown', fontSize: '17px' }}>Initiate, Innovate, Inspire</h5>
              <h5 style={{ color: 'brown', fontSize: '17px' }}>and Implement</h5>
            </div>
          </div>
          <ul>
            {/* <li><a style={{ color: 'brown', textDecoration: 'none', fontSize: '20px' }} href="#">About Us</a></li> */}
            {/* <li><a style={{ color: 'brown', textDecoration: 'none', fontSize: '20px' }} href="#">Admission</a></li> */}
            {/* <li><a style={{ color: 'brown', textDecoration: 'none', fontSize: '20px' }} href="#">Contact Us</a></li> */}
            {/* <li className="Loginbtn">
              <span>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle LoginButton" onClick={e => { HandleClickLogin(e) }} style={{ border: 'none', backgroundColor: 'brown' }} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Login
                  </button>
                </div>
              </span>
            </li> */}
          </ul>
        </div>



        <div className="LoginBox">
          <div className="login-container">
            <button onClick={e => { HandleCloseLogin(e) }} className="closelogin"><img src={closelogo} alt="" /></button>
            <div><img src={tiet_logo} alt="" /></div>
            <h1 className="LoginHeading"></h1>
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
              </div>
              <div className="form-group">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>




        <div className="maincontainer">
          <h1 className="mainheading">
            Welcome to Thapar University's Placement Management System
          </h1>
          <div className="maincontent">
            At Thapar University, we are dedicated to fostering your professional growth and connecting you with rewarding
            career opportunities. Our Placement Management System streamlines the recruitment process, empowering students
            to secure coveted positions and helping recruiters find top talent efficiently.
          </div>
        </div>
      </div >

      <div className="secondpage">
        <div ref={containerRef1} className="secondsectioncontent">
          <h1>Our Top Recruiters</h1>
          <div className="companylogos">
            <div className="card1"><img src={amazonlogo} alt="" /></div>
            <div className="card1"><img src={Deloittelogo} alt="" /></div>
            <div className="card1"><img src={hitachilogo} alt="" /></div>
            <div className="card1"><img src={microsoftlogo} alt="" /></div>
            <div className="card1"><img src={sandisklogo} alt="" /></div>
            <div className="card1"><img src={tcslogo} alt="" /></div>
          </div>
        </div>
      </div>

      <div className="thirdpage">
        <div ref={containerRef2} className="thirdsectioncontent" id="animated-container">
          <h1>Campus Life</h1>
          <div className="CampusCarousel">
            <div className="carousel-inner">
              <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
                <div className="carousel-item active">
                  <img src={CampusCarouselIMG1} style={{ width: "100%", height: "100%" }} className="d-block" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={CampusCarouselIMG2} style={{ width: "100%", height: "100%" }} className="d-block" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={CampusCarouselIMG3} style={{ width: "100%", height: "100%" }} className="d-block" alt="..." />
                </div>
              </div>
              <button className="carousel-control-prev campuscarouselprev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next campuscarouselnext" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fourthpage">
        <div ref={containerRef3} className="fourthsectioncontent">
          <h1>Our Alumni</h1>
          <div className="AlumniCarousel">
            <Carousel />
          </div>
        </div>
      </div >

      <div className="footer">
        <div className="headings">
          <h1>Quick Links</h1>
          <div className="sociallinks">
            <a href="https://www.instagram.com/tietofficial/" target="_blank"><img src={insta} alt="instagram" /></a>
            <a href="https://www.facebook.com/officialTIET" target="_blank"><img src={fb} alt="facebook" /></a>
            <a href="https://twitter.com/TIETofficial" target="_blank"><img src={twitter} alt="twitter" /></a>
            <a href="https://www.linkedin.com/school/tietofficial/" target="_blank"><img src={linkedin} alt="linkedin" /></a>
            <a href="https://www.youtube.com/c/TIETOfficial" target="_blank"><img src={youtube} alt="youtube" /></a>
          </div>
        </div>
        <div className="links">
          <a href="https://www.thapar.edu/">Official Website</a>
          <a href="https://www.thapar.edu/students/pages/webkiosk">Webkiosk</a>
          <a href="https://lms.thapar.edu/moodle/">Learning Management System</a>
          <a href="https://eticket.thapar.edu/index.php">Online Support System</a>
        </div>
        <div className="address">
          <h4>Thapar Institute of Engineering & Technology</h4>
          <h4>P.O. Box 32, Bhadson Road,</h4>
          <h4>Patiala, Punjab,</h4>
          <h4>Pin -147004, India</h4>
        </div>
      </div>
    </div>
  )
}

export default Home
