import React, { useState } from 'react'
import Header from '../Components/Header'
import './CSS/About.css'
import Footer from '../Components/Footer'

const About = () => {

    const [showMore , setShowMore]= useState(false)

  return (
    <>
      <Header/>
      <section className="about">
        <div className="about-text">
          <h1>About Our Flower Shop 🌸</h1>
          <p>
            At BloomShop, we believe flowers are more than just gifts — they are emotions.
            We provide fresh, handpicked flowers for every special occasion.
          </p>
          <p>
            From romantic roses to joyful bouquets, we deliver happiness with every order.
          </p>
          <ul>
                <li>✔ Premium Quality Flowers</li>
                <li>✔ Affordable Prices</li>
                <li>✔ 24/7 Customer Support</li>
          </ul>
          {showMore && (
            <div className="extra-data">
              <p>🌷 We source flowers directly from trusted farms.</p>
              <p>💐 We provide wedding & event decoration services.</p>
              <p>🌹 Special discounts on seasonal flowers.</p>
              <p>🚚 Fast and safe delivery across your city.</p>
            </div>
          )}
          <button onClick={()=>setShowMore(!showMore)}>
            {showMore? "Show Less" :"Explore More"}
          </button>
          
        </div>

        <div className="about-img">
          <img
            src="Images/logo2.jpg"
            alt="flowers"
          />
        </div>
      </section>

      
      <section className="features">
        <div className="card">
          <h3>🌼 Fresh Flowers</h3>
          <p>Directly sourced from farms daily.</p>
        </div>

        <div className="card">
          <h3>🚚 Fast Delivery</h3>
          <p>Same-day delivery available.</p>
        </div>

        <div className="card">
          <h3>💐 Custom Bouquets</h3>
          <p>Create your own unique bouquet.</p>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default About