import React from 'react'
import Footer from '../Components/Footer'
import './CSS/Home.css'
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  return (
    <>
      <Header />

      <div className="home">

        {/* Hero Section */}
        <div className="hero">
          <h1>🌸 Welcome to Bloom Flower Shop</h1>
          <p>Fresh flowers, beautiful moments, delivered with love 💐</p>
          <button onClick={() => navigate('/product')}>
            Shop Now
          </button>
        </div>

        {/* Features Section */}
        <div className="features">

          <div className="card">
            <h2>🌹 Fresh Flowers</h2>
            <p>Hand-picked fresh flowers for every occasion.</p>
          </div>

          <div className="card">
            <h2>🎁 Special Gifts</h2>
            <p>Surprise your loved ones with beautiful bouquets.</p>
          </div>

          <div className="card">
            <h2>🚚 Fast Delivery</h2>
            <p>Quick and reliable same-day delivery service.</p>
          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Home