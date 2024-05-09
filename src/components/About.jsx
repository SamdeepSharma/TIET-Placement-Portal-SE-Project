/* eslint-disable no-unused-vars */
import React from 'react';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const PlacementManagement = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:ssharma18_be22@thapar.edu';
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/samdeep_.s/', '_blank');
  };

  const handleLinkedinClick = () => {
    window.open('https://www.linkedin.com/in/samdeep-sharma-20894b283/', '_blank');
  };
  
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="text-center mb-5">
            <h2 className="mb-3">About Placement Management System</h2>
            <p className="lead">Welcome to the Placement Management System, a comprehensive platform designed to streamline the placement process and enhance student recruitment activities. Our goal is to provide a seamless and efficient experience for both students and recruiters, facilitating successful placements and career opportunities.</p>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="feature text-center">
                <h3>Secure Authentication</h3>
                <p>The Placement Management System ensures secure authentication mechanisms, safeguarding user data and account access.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature text-center">
                <h3>Job Placement Support</h3>
                <p>The Placement Management System offers extensive support for job placements, connecting students with leading companies and organizations.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature text-center">
                <h3>Never Miss Any Opportunity</h3>
                <p>Our platform ensures that you never miss any placement opportunity by providing timely updates about job openings and recruitment drives.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <p>Thapar Institute of Engineering and Technology (TIET), commonly known as Thapar University, is a renowned private institute located in Patiala, Punjab, India. Established in 1956, it has a rich history of providing quality education in engineering, technology, management, and other allied fields. TIET offers undergraduate, postgraduate, and doctoral programs across various disciplines, including engineering, computer science, civil engineering, electrical engineering, mechanical engineering, and more.</p>

<p>The institute is known for its academic excellence, innovative research, and strong industry partnerships. It boasts state-of-the-art infrastructure, modern laboratories, and well-equipped facilities to support learning and research activities. TIET places a strong emphasis on holistic development, fostering leadership qualities, teamwork, and ethical values among its students.</p>
          </div>
        </div>
        <div className="connect-with-us text-center mt-5">
          <h2 className='py-3'>Connect With Us</h2>
          <div className="social-icons">
            <button className="btn mx-1" onClick={handleInstagramClick}>
              <FaInstagram size={30} />
            </button>
            <button className="btn mx-1" onClick={handleLinkedinClick}>
              <FaLinkedin size={30} />
            </button>
            <button className="btn mx-1" onClick={handleEmailClick}>
              <FaEnvelope size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlacementManagement;
