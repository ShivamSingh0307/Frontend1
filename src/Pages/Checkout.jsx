// import React, { useEffect, useState } from "react";
// import "./CSS/Checkout.css";

// const Checkout = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // check buy now first
//     const buyNowItem = JSON.parse(localStorage.getItem("buyNow"));

//     if (buyNowItem) {
//       setItems([buyNowItem]);
//     } else {
//       const orderItems = JSON.parse(localStorage.getItem("order")) || [];
//       setItems(orderItems);
//     }
//   }, []);

//   const total = items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="checkout-page">

//       {/* LEFT SIDE */}
//       <div className="checkout-left">

//         <h2>Delivery Details</h2>

//         <div className="box">
//           <input type="text" placeholder="Full Name" />
//           <input type="text" placeholder="Mobile Number" />
//           <input type="text" placeholder="Address" />
//           <input type="text" placeholder="Pincode" />
//           <input type="text" placeholder="City" />
//         </div>

//         <h2>Payment Method</h2>

//         <div className="box">
//           <label>
//             <input type="radio" name="payment" defaultChecked />
//             Cash on Delivery
//           </label>

//           <label>
//             <input type="radio" name="payment" />
//             Online Payment
//           </label>
//         </div>

//       </div>

//       {/* RIGHT SIDE */}
//       <div className="checkout-right">

//         <h2>Order Summary</h2>

//         {items.map((item) => (
//           <div className="summary-item" key={item._id}>
//             <img src={item.image} />
//             <div>
//               <p>{item.title}</p>
//               <p>Qty: {item.quantity}</p>
//               <p>₹{item.price * item.quantity}</p>
//             </div>
//           </div>
//         ))}

//         <hr />

//         <div className="price-box">
//           <p>Total Items: {items.length}</p>
//           <p>Total Amount: ₹{total}</p>
//           <p className="save">You Save ₹500</p>
//         </div>

//         <button className="pay-btn">
//           Place Order
//         </button>

//       </div>

//     </div>
//   );
// };

// export default Checkout;