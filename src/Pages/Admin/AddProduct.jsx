import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/DashboardLayout'
import './CSS/AddProduct.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";  
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {


  const API_URL = import.meta.env.VITE_APi_Url

    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [loader, setLoader] = useState(false);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [search, setSearch] = useState("")

    const [selectProduct, setSelectProduct] = useState(null)

    const navigate = useNavigate()


    const token = localStorage.getItem("token")
    
        useEffect(()=>{
            if(!token){
                navigate('/login')
            }
        })

    const fetchProduct = () => {
        axios.get(`${APi_Url}/api/get-all`)
            .then((res) => {
                setData(res.data.product)
            })
            .catch((error) => {
                console.log(error);

            })
    }


    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(
                `${APi_Url}/api/delete/${id}`
            );

            if (res.status === 200) {
                toast("Product deleted successfully");
                fetchProduct(); // refresh
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setSelectProduct(item);

        setTitle(item.title);
        setDes(item.des);
        setPrice(item.price);
        setEditMode(true)
        setVisible(true);
    };


    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("des", des);
        formData.append("price", price);
        formData.append("image", image);

        try {
            let res;

            if (editMode) {
                res = await axios.put(
                    `${APi_Url}/api/update/${selectProduct._id}`,
                    formData
                );

                if (res.status === 200) {
                    toast("Product Updated Successfully");
                    setVisible(false);
                    fetchProduct(); 
                    resetForm();   
                }
            } else {
                res = await axios.post(
                    `${APi_Url}/api/add`,
                    formData
                );

                if (res.status === 200) {
                    toast("Product Added Successfully");
                    setVisible(false);
                    fetchProduct();
                    resetForm();
                }
            }
        } catch (error) {
            toast("Something went wrong");
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchProduct()
    }, [])

    const resetForm = () => {
        setDes("")
        setTitle("")
        setImage(null)
        setPrice("")
        setImage(null)
        setSelectProduct(null)
        setEditMode(false)
    }

    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.des.toLowerCase().includes(search.toLowerCase()) ||
        item.price.toString().includes(search)
    );

    return (
        <>
            <DashboardLayout>

                <div className='header-section'>
                    <h2>Add product</h2>
                    <Button label="Add Product" icon="pi pi-external-link"
                        onClick={() => {
                            resetForm()
                            setVisible(true)
                        }}
                    />

                </div>
                <div>
                    <h2> Product Data</h2>
                    <input
                        type="text"
                        placeholder="Search product..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ padding: "8px", marginBottom: "10px", width: "250px" }}
                    />
                    <table border='1' cellPadding='10'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Descripton</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {Array.isArray(data) && data.length > 0 && data.map((item, index) => ( */}
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <img src={item.image}
                                            alt=""
                                            width={80}
                                        />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.des}</td>
                                    <td>{item.price}</td>
                                    <td className='button-outer'>
                                        <button onClick={() => handleEdit(item)}><FaEdit /></button>
                                        <button onClick={() => handleDelete(item._id)}><MdDelete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>


            </DashboardLayout>
            <div className="card flex justify-content-center">

                <Dialog header={selectProduct ? "Edit Product" : "Add product"} visible={visible} style={{ width: '50vw', }} onHide={() => { if (!visible) return; setVisible(false); }}>
                    <p className="m-0">
                        <form className='form-outer' onSubmit={handleSubmit}>
                            <input type="text"
                                placeholder='Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            

                            <input type="text"
                                placeholder='description'
                                value={des}
                                onChange={(e) => setDes(e.target.value)}
                            />
                            
                            <input type="file"
                                placeholder='image'
                                // value={image}
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            
                            <input type="number"
                                placeholder='price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            
                            <button type='submit'>{loader ? (selectProduct ? "Updatiing" : "Adding") : (selectProduct ? "Update" : "Add")}</button>

                        </form>
                    </p>
                </Dialog>
            </div>
        </>
    )
}

export default AddProduct