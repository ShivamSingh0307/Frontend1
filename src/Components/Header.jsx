import React, { useEffect, useState } from "react";
import "./CSS/Header.css";
import { Link } from "react-router-dom";
import { BsCartDash } from "react-icons/bs";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      try {
        const cartData = localStorage.getItem("cart");
        const cart = cartData && cartData !== "" ? JSON.parse(cartData) : [];
        const totalQty = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
        setCartCount(totalQty);
      } catch (error) {
        console.error("Error reading cart from localStorage:", error);
        setCartCount(0);
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        updateCount();
      }
    };
    updateCount();

    window.addEventListener("cartUpdated", updateCount);

    
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);



  return (
    <>
      <div className="nav">

        {/* LEFT */}
        <div className="nav-left">
          <h2>
            Bloom <span style={{ color: "red" }}>Shop</span>
          </h2>
        </div>

        {/* CENTER */}
        <div className="nav-center">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/product">Product</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="nav-right">

          <button className="btn" onClick={() => setShowLogin(true)}>Login</button>


          <Link to="/cart" className="cart-icon">
            <BsCartDash size={22} />

            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>

      </div>

      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>

          <div className="split-login-modal" onClick={(e) => e.stopPropagation()}>

            {/* LEFT SIDE */}
            <div className="login-left">
              <h2>Welcome to Login</h2>
              <p>Get access to your orders, wishlist & offers</p>

              <img
                src="https://img.freepik.com/premium-vector/secure-login-form-page-with-password-computer-
                padlock-3d-vector-icon-cartoon-minimal-style_365941-1119.jpg?semt=ais_hybrid&w=740&q=80"
                alt="login"
              />
            </div>

            {/* RIGHT SIDE (OTP LOGIN) */}
            <div className="login-right">

              <span className="close-btn" onClick={() => setShowLogin(false)}>
                ✖
              </span>

              <h2>Login with OTP</h2>

              <input type="text" placeholder="Enter Mobile Number" />

              <button className="otp-btn">
                Send OTP
              </button>

              <input type="text" placeholder="Enter OTP" />

              <button className="login-btn">
                Verify & Login
              </button>
              <p>
                Don't have an account? <Link to='/user-register'>Register Now</Link>
              </p>

            </div>

          </div>

        </div>
      )}

    </>
  );
};

export default Header;