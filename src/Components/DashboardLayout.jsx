import React, { useEffect, useState } from 'react'
import './CSS/DashboardLayout.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { MdContactPhone, MdDashboard, MdLockPerson, MdMarkunreadMailbox, MdOutlineProductionQuantityLimits } from 'react-icons/md'
import Swal from 'sweetalert2'

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

    const [open, setOpen] = useState(false)

    const handleLogout = () => {
        Swal.fire({
            title: "Are You Sure to Logout",
            text: "After this you will be redirected to login page",
            icon: "question",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Logout!",
                    text: "You have been logged out.",
                    icon: "success"
                })
                localStorage.removeItem("token")
                navigate('/')
            }
        })
    }

    return (
        <div className="container">

            <div className={open ? "sidebar open" : "sidebar"}>
                <h2>Dashboard</h2>

                <NavLink to="/dashboard" className="nav-links">
                    <MdDashboard />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/add-product" className="nav-links">
                    <MdOutlineProductionQuantityLimits />
                    <span>Products</span>
                </NavLink>

                <NavLink to="/order" className="nav-links">
                    <MdMarkunreadMailbox />
                    <span>Order</span>
                </NavLink>

                <NavLink to="/user-contact" className="nav-links">
                    <MdContactPhone />
                    <span>Contact</span>
                </NavLink>

                <NavLink to="/profile" className="nav-links">
                    <MdLockPerson />
                    <span>Profile</span>
                </NavLink>

                <button className='logout' onClick={handleLogout}>Logout</button>
            </div>

            <div className="main">
                <div className="header">
                    <button onClick={() => setOpen(!open)}>☰</button>
                </div>

                <div className="content">
                    {children}
                    {/* OR use Outlet if using nested routes */}
                    {/* <Outlet /> */}
                </div>
            </div>

        </div>
    )
}

export default DashboardLayout