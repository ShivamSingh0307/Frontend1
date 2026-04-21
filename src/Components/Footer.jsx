import React from 'react'
import  './CSS/Footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>

      <div className="footer">
          <div className="first-footer">
            <div className="footer-logo">
              <img src="Images/logo.jpg" alt="" />
              <p>Bloom Flower</p>
              <p>Email:- bloomshop@gmail.com</p>
              <p>Contact:- 567898765</p>
            </div>
          </div>
          <div className="second-footer">
            <h3>Short Link</h3>
            <ul> 
              <li>
              <Link to="/">Home</Link>
              </li>
              <li>
              <Link to="/product">Product</Link>
              </li>
              <li>
              <Link to="/about">About</Link>
              </li>
              <li>
              <Link to="/contact">Contact</Link>
              </li>
              
            </ul>
              
          </div>
          <div className="third-footer">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557
            .9637082831696!2d80.94701827401843!3d26.904646860439712!2m3!1f0!2f0!3f0
            !3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd90f852511b%3A0xea3004cdf494e
            cbb!2sDigiCoders%20Technologies%20Private%20Limited%2C%20Best%20Software%2F
            Website%2FMobile%20App%20Development%20Company%20in%20Lucknow!5e0!3m2!1sen
            !2sin!4v1774516881838!5m2!1sen!2sin" ></iframe>
          </div>
      </div>


    </>
  )
}

export default Footer