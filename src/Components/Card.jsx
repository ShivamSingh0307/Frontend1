import React, { useEffect, useState } from 'react'
import './CSS/Card.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Card = () => {

  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const [cart, setCart] = useState(() => {
    const cartData = localStorage.getItem("cart")
    return cartData && cartData !== "" ? JSON.parse(cartData) : []
  })

  // Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cartUpdated"))
  }, [cart])

  // Fetch products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/get-all")
        setProducts(res.data.product)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  }, [])

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id)

    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }

    toast("Added to Cart 🛒")
  }

  // Place Order
  const handleOrder = (e) => {
    e.preventDefault()

    const orderData = {
      ...selectedProduct,
      quantity,
      total: selectedProduct.price * quantity
    }

    console.log(orderData)

    toast("Order Placed Successfully ✅")
    setShowModal(false)
  }

  return (
    <>
      {/* PRODUCTS */}
      <div className="card-container">
        {products.map((item) => (
          <div className="card" key={item._id}>

            <img src={item.image} alt="" className='card-img' />

            <h3>{item.title}</h3>
            <p className='price'>₹ {item.price}</p>

            <div className="card-buttons">
              <button className="cart-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>

              <button
                className="buy-btn"
                onClick={() => {
                  const productWithQty = { ...item, quantity: 1 }
                  localStorage.setItem("buyNow", JSON.stringify(productWithQty))

                  setSelectedProduct(productWithQty)
                  setQuantity(1)
                  setShowModal(true)
                }}
              >
                Buy Now
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-box flipkart-style">

            <span className="close-btn" onClick={() => setShowModal(false)}>✖</span>

            {/* LEFT */}
            <div className="left-section">
              <h2>Checkout</h2>

              <form onSubmit={handleOrder}>
                <input type="text" placeholder="Full Name" required />
                <input type="text" placeholder="Phone Number" required />
                <textarea placeholder="Address" required></textarea>

                <button type="submit" className="place-btn">
                  Place Order
                </button>
              </form>
            </div>

            {/* RIGHT */}
            <div className="right-section">

              <img src={selectedProduct.image} alt="" className="product-img" />

              <h3>{selectedProduct.title}</h3>

              <hr />

              <div className="price-details">
                <p>Price: ₹ {selectedProduct.price}</p>
                <p>Quantity: {quantity}</p>
                <p>Delivery: Free</p>
                <h4>Total: ₹ {selectedProduct.price * quantity}</h4>
              </div>

              {/* QTY BUTTONS */}
              <div className="qty-box">
                <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                  -
                </button>

                <span>{quantity}</span>

                <button onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default Card