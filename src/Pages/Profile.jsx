import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../Components/DashboardLayout"
import { toast } from "react-toastify";
import './CSS/Profile.css'


const GetAllUsers = () => {

     const API_URL = import.meta.env.VITE_APi_Url

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data , setData]=useState([])
  const [search ,setSearch]=useState('')
  // const [userdata , setUserData]=useState([])

  const getUser = async () => {
    try {
      const res = await axios.get(`${APi_Url}/api/user/get`);
      // console.log(res.data)

      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser()

  }, [])



  if (loading) {
    return <h2>Loading users...</h2>;
  }

  const handleDelete = async (id) => {
    try {

      const res = await axios.delete(`${APi_Url}/api/user/delete/${id}`)
      if (res.status === 200) {
        toast("Product deleted Successfully")
        // console.log(res);
        getUser()
      }
    } catch (error) {
      console.log(error);
    }
  }

   const filteredData = users.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.toString().includes(search)
    );

  return (

    <>
      <DashboardLayout>

        <div style={{ padding: "20px" }}>
          <h2>All Users</h2>
          <input
                        type="text"
                        placeholder="Search product..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ padding: "8px", marginBottom: "10px", width: "250px" }}
                    />

          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Sr.N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <div className="btn-outer">
                      <button className="view-btn">View</button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </DashboardLayout>

    </>
  );
};

export default GetAllUsers;