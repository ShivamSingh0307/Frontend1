import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/DashboardContent.css";

const DashboardContent = () => {

   const API_URL = import.meta.env.VITE_APi_Url  

  const [data, setData] = useState({
    totalSold: 0,
    buyOrders: 0,
    confirmOrders: 0,
    pendingOrders: 0,
  });

  const fetchDashboardData = async () => {
    try {
      // Example API (change according to your backend)
      const res = await axios.get( `${APi_Url}/api/dashboard`);

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard Overview</h2>

      <div className="dashboard-grid">

        <div className="dashboard-card sold">
          <h3>Total Sold</h3>
          <p>{data.totalSold}</p>
        </div>

        <div className="dashboard-card buy">
          <h3>Buy Orders</h3>
          <p>{data.buyOrders}</p>
        </div>

        <div className="dashboard-card confirm">
          <h3>Confirm Orders</h3>
          <p>{data.confirmOrders}</p>
        </div>

        <div className="dashboard-card pending">
          <h3>Pending Orders</h3>
          <p>{data.pendingOrders}</p>
        </div>

      </div>
    </div>
  );
};

export default DashboardContent;