import React, { useState } from "react";
import "./CSS/Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const API_URL = import.meta.env.VITE_APi_Url

  const navigate = useNavigate();

  const [name ,setName]=useState('')
  const [email ,setEmail] = useState('')
  const [password ,setPassword]=useState('')

  const handleSubmit =async(e)=>{
    e.preventDefault()
    const res = await axios.post(`${API_URL}/api/create-admin`,{
        name,email,password
    })
    console.log(res.data);

    if(res.data.success===true){
        alert("Registered Successfully")
        navigate('/Login')
    }
    else{
        alert("Regsitration Failed")
    }
    
  }

  
  return (
    <div className="register">
      <div className="register-box">
        <h2>Create Account</h2>
        <p>Register to get started</p>

        <form >
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button type="submit" onClick={handleSubmit}>Register</button>

          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;