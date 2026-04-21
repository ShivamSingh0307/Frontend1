import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'
import Product from './Pages/Product'
import About from './Pages/About'
import Contact from './Pages/Contact'
import {Toaster} from 'react-hot-toast'
import DashboardLayout from './Components/DashboardLayout'
import AdminLogin from './Pages/AdminLogin'
import Register from './Pages/Register'
import AddToCart from './Pages/AddToCart'
import { ToastContainer } from 'react-toastify'
import AddProduct from './Pages/Admin/AddProduct'
// import Checkout from './Pages/Checkout'
import UserRegister from './Pages/UserRegister'
import Profile from './Pages/Profile'
import UserContact from './Pages/UserContact'
import DashboardContent from './Pages/DashboardContent'
// import UserLogin from './Pages'
// import UserLogin from './Pages/UserLogin'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/cart' element={<AddToCart/>}/>
          
          <Route path='/profile' element={<Profile/>}/>

          {/* Admin */}

          <Route path='/login' element={<AdminLogin/>}/>
          

          {/* UserRoute */}


          {/* <Route path='/user-login' element={<UserLogin/>}/> */}
          <Route path='/user-register' element={<UserRegister/>}/>
          <Route path='/user-contact' element={<UserContact/>}/>




        
          {/* backend Dashboard */}
          <Route path='/dashboard' element={<DashboardLayout/>}/>
          <Route path='/add-product' element={<AddProduct/>}/>
          
        </Routes>
        
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App