import "./new.scss";
import Sidebar from "./Component/sidebar/Sidebar";
import Navbar from "./Component/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState } from "react";
import axios from "axios"
import { useCookiesContext } from "./utils/CookieManager";
import Alert from '@mui/material/Alert'

const New = (props) => {
  const {cookies} = useCookiesContext()
  const [data, setData] = useState({Name:"",
Description:"", Price:"",Weight:"",Quantity:"",Category:"",Color:"",Size:"",});

const [file, setFile]= useState()
const [response,setResponse] = useState("")
const [error,setError] = useState("")


    function handleChange(evt){
    setData(prev=>(
      {...prev,[evt.target.name]:evt.target.value}
    ))
    
}

async function handleSubmit(evt){
  evt.preventDefault()
    const formData = new FormData();
    for(const name in data){
        formData.append(name, data[name])
    }
    formData.append("PhotoPath", file)


    const url = `${import.meta.env.VITE_API_URL}/api/product`
    
axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${cookies.token}`
        }
        
      }).then((res) => {
        setData({Name:"",
Description:"", Price:"",Weight:"",Quantity:"",Category:"",Color:"",Size:"",});
      setFile("")
    setResponse(res)
  setTimeout(()=>setResponse(""), 2000)})
      
      .catch((err) => {
        setError(err.message);
        setTimeout(()=>setError(""), 5000)
      });

}

  const select = [ "CLOTHES", "AUTOMOTIVE","BABU","BEAUTY","BOOKS","COMPUTER","DEALS","MUSIC","ELECTRONICS","KITCHEN","SCIENTIFIC",
        "SOFTWARE","SPORT","TOOLS","TOYS","GAMES","SHOES"]
  return (
    <div className="new">
      <div className="newContainer">

        <div className="top">
          <h1>Add a product</h1>
        </div>

        {error &&  <Alert variant="outlined" severity="error">
        {error}
      </Alert>}
        {response && <Alert variant="outlined" severity="success">
        Product Added Successfully. Add another product.
      </Alert>}
        <div className="bottom">
          <div className="left">
            <label 
          className="imageLabel" htmlFor="file">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              className={file ? "productImage": ""}
            /></label>
          </div>
          <div className="right">


            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="formInput" style={{display:"none"}}>
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                name="PhotoPath"
                  type="file"
                  id="file"
                  onChange={(e)=>{setFile(e.target.files[0])}}
                  style={{ display: "none" }}
                  required
                />
              </div>

            
                <div className="formInput">
                  <label>Product Name</label>
                  <input type="text" onChange={handleChange} value={data.Name}  required name="Name" placeholder="Samsung A50" />
                </div>

                <div className="formInput price">
                  <label>Price</label>
                  <input type="number" onChange={handleChange} value={data.Price} required name="Price" placeholder="$ 17000" />
                </div>
              
              
                <div className="formInput">
                  <label>Weight</label>
                  <input type="number" onChange={handleChange} value={data.Weight} required name="Weight" placeholder="weight in kg" />
                </div>
              
              
                <div className="formInput">
                  <label>Quantity</label>
                  <input type="number" onChange={handleChange} value={data.Quantity} required name="Quantity" placeholder="Quantity" />
                </div>
              
              
                <div className="category">
                  <label>Category</label>
                  <select onChange={handleChange} value={data.Category} required className="select" name="Category">
                    {select.map(opt => <option  key={opt} value={opt}>{opt}</option>)}</select>
                </div>
              
              
                <div className="formInput">
                  <label>Color </label>
                  <input type="text" onChange={handleChange} value={data.Color} name="Color" placeholder="Green" />
                </div>
              
              
                <div className="formInput">
                  <label>Size </label>
                  <input type="text" onChange={handleChange} value={data.Size} name="Size" placeholder="XXL" />
                </div>

                <div className="description ">
                  <label>Description </label>
                  <textarea  cols="30" rows="10" onChange={handleChange} value={data.Description} name="Description" placeholder="Write brief decription of the product here"></textarea>
                </div>
              
              
              <input className="button" type="submit" value="Upload" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
