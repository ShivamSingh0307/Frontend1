import React, { useState } from "react";
import "./CSS/AdminLogin.css";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";



const AdminLogin = () => {

  const API_URL = import.meta.env.VITE_APi_Url
  
  const [email, setEmail] = useState('')
  const [loading , setLoading]=useState(false)
   
  const [password ,setPassword] =useState('')
const navigate = useNavigate()
 

  const handleLogin =async(e)=>{
    e.preventDefault()
   
    try{
      setLoading(true)
      const res= await axios.post(`${API_URL}/api/login`,{
      email,password
    })
    // console.log(res.data);
    
    if(res.data.success==true){
      localStorage.setItem("token",res?.data?.admin?._id)
      // alert("Login Successfully")
      setTimeout(()=>{
        setLoading(false)
        toast("Login Successfully");
        navigate('/Dashboard')
      },1000)
      

    }
    else{
      // alert("Invalid Email or Password")
      toast.error("Invalid Email or Password")
    }
    }catch(error){
      console.log(error);
      
    }
    finally{
      setLoading(false)
    }
      
  }

  return (
    <div className="admin-login">
      <video  autoPlay loop muted className="bg-video" >
        <source  src="/Images/video1.webm"/>
      </video>
      <div className="login-box">
        <h2>Admin Panel</h2>
        <p>Login to continue</p>

        <form >
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
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

          <button type="submit" onClick={handleLogin} disabled={loading} >
            {loading? "Loading":"Login"}
          </button>

          <p className="register-account">
            Don't have an account? <Link to='/Register'>Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;