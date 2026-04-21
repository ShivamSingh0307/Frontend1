import React, { useState, useEffect } from "react";
import "./CSS/AddToCart.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {

 const API_URL = import.meta.env.VITE_APi_Url
  
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  // ✅ Safe localStorage parse
  const [cart, setCart] = useState(() => {
    try {
      const cartData = localStorage.getItem("cart");
      return cartData ? JSON.parse(cartData) : [];
    } catch {
      return [];
    }
  });

  // Sync cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  // Total price
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Remove item
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // Increase quantity
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
  };

  // Save for later
  const saveForLater = (id) => {
    const savedItem = cart.find((item) => item._id === id);
    const saved = JSON.parse(localStorage.getItem("saved")) || [];

    localStorage.setItem("saved", JSON.stringify([...saved, savedItem]));
    setCart(cart.filter((item) => item._id !== id));
  };

  // Buy now
  const buyNow = (item) => {
    localStorage.setItem("buyNow", JSON.stringify(item));
    navigate("/checkout"); // ✅ fixed
  };

  // ✅ Place Order
  const handlePlaceOrder = async () => {
    try {
      if (cart.length === 0) {
        alert("Cart is empty!");
        return;
      }

      if (!name || !contact || !address) {
        alert("Please fill all details!");
        return;
      }

      // API call
      const res = await axios.post(`${APi_Url}/api/order`, {
        cart,
        address,
        name,
        contact,
      });

      console.log(res.data);

      // Save order
      localStorage.setItem("lastOrder", JSON.stringify(cart));

      alert("Order placed successfully 🎉");

      // Clear cart + form
      setCart([]);
      localStorage.removeItem("cart");
      setName("");
      setContact("");
      setAddress("");

      navigate("/product");

    } catch (error) {
      console.error(error);
      alert("Order failed ❌");
    }
  };

  return (
    <>
      <Header />

      <div className="cart-page">

        {/* LEFT SIDE */}
        <div className="cart-left">
          {cart.length === 0 ? (
            <h2>Cart is empty 😢</h2>
          ) : (
            cart.map((item) => (
              <div className="product-card" key={item._id}>
                <img src={item.image} alt={item.title} />

                <div className="product-details">
                  <h3>{item.title}</h3>
                  <p className="rating">⭐ 4.2 (1,058)</p>

                  <div className="price">
                    <span className="discount">72% OFF</span>
                    <span>₹{item.price}</span>
                  </div>

                  <div className="qty">
                    <button onClick={() => decreaseQty(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item._id)}>+</button>
                  </div>

                  <p className="delivery">Delivery by Apr 18</p>

                  <div className="actions">
                    <button onClick={() => saveForLater(item._id)}>
                      Save for later
                    </button>

                    <button onClick={() => removeFromCart(item._id)}>
                      Remove
                    </button>

                    <button onClick={() => buyNow(item)}>
                      Buy this now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="cart-right-address">
          <label>Name:-</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
          />

          <label>Phone:-</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter your phone..."
          />

          <label>Address:-</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address..."
          />
        </div>

        {/* PRICE BOX */}
        <div className="cart-right">
          <h3>Price Details</h3>
          <hr />

          <p>MRP: ₹{total + 500}</p>
          <p>Fees: ₹7</p>
          <p>Discount: -₹500</p>

          <h2>Total Amount: ₹{total}</h2>

          <div className="save-msg">
            You’ll save ₹500 on this order!
          </div>

          <button className="place-order" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AddToCart;