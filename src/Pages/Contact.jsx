import React, { useState } from "react";
import './CSS/Contact.css'
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully 🌸");
    console.log(formData);
    
    setFormData({ name: "", email: "", message: "" });
  };
  
  

  return (
    <>
      <Header />

      <section className="contact">
        <h1>Contact Us 🌸</h1>

        <div className="contact-container">

        
          <form className="contact-form" >
            <input 
              type="text" 
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input 
              type="email" 
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea 
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button onClick={handleSubmit} type="submit">Send Message</button>
          </form>

          
          <div className="contact-info">
            <h2>Get in Touch 💐</h2>
            <p>We’d love to hear from you! Reach out for orders, queries, or feedback.</p>

            <p><strong>📍 Address:</strong> Lucknow, India</p>
            <p><strong>📞 Phone:</strong> +91 98765 43210</p>
            <p><strong>📧 Email:</strong> bloomshop@gmail.com</p>
          </div>

        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Contact;