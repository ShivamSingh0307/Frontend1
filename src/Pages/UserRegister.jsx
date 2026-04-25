import React, { useState } from "react";
import "./CSS/UserRegister.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast'

const UserRegister = () => {

    const API_URL = import.meta.env.VITE_APi_Url

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        ` ${API_URL}/api/user-register`,
        form
      );

      console.log(res.data);

      if (res.data.success === true) {
        // toast("Registered Successfully")
        alert("Registered Successfully");
        navigate("/");
      } 
      else { 
        alert("Registration Failed");
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  return (
    <div className="register-page">
      
      {/* LEFT */}
      <div className="register-left">
        <h2>Looks like you're new here!</h2>
        <p>Sign up with your details to get started</p>

        <img
          src="https://img.freepik.com/premium-vector/secure-login-form-page-with-password-computer-padlock-3d-vector-icon-cartoon-minimal-style_365941-1119.jpg"
          alt="register"
        />
      </div>

      {/* RIGHT */}
      <div className="register-right">
        <form className="form-div" onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>

          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;  