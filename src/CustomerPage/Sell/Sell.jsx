import "./sell.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState , useEffect} from "react";
import axios from "axios"
import Alert from '@mui/material/Alert'
import { useCookiesContext } from '../../utils/CookieManager'
import { Link } from "react-router-dom";

const Sell = (props) => {
    const { cookies } = useCookiesContext();
    const [data, setData] = useState({Name:"",
    Description:"", Price:"",Weight:"",Quantity:"",Category:"",Color:"",Size:"",});
    const [isCompleted, setIsCompleted] = useState(true)
    const [file, setFile]= useState()
    const [response,setResponse] = useState("")
    const [error,setError] = useState("")

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/account/getuserbyid?id=${cookies.userId}`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})
        .then(res => {
          
          for (const key in res.data) {
            if(key !=="userRoles" && key !=="message" && key !=="expireDate" &&key !=="errors" && key !=="isSuccess"){
              if (!res.data[key]) {
    setIsCompleted(false);
    console.log(key)
  }
            }
  
}
        })
        .catch(error=>console.log(error))
    },[response])

    function handleChange(evt){
    setData(prev=>(
      {...prev,[evt.target.name]:evt.target.value}
    ))
    
}

async function handleSubmit(evt){
  console.log("submit")
  evt.preventDefault()
    const formData = new FormData();
    for(const name in data){
        formData.append(name, data[name])
    }
    formData.append("PhotoPath", file)


    const url = `${import.meta.env.VITE_API_URL}/api/product`
    
axios.post(url, formData, {
        headers: {
         "Authorization" : `Bearer ${cookies.token}`,
          "Content-Type": "multipart/form-data",
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

  const select = ["Choose a category" ,"GAMES","CLOTHES", "AUTOMOTIVE","BABY","BEAUTY","BOOKS","COMPUTER","DEALS","MUSIC","ELECTRONICS","KITCHEN","SCIENTIFIC",
        "SOFTWARE","SPORT","TOOLS","TOYS","GAMES","SHOES"]
  return (
    <div className="new">
      <div className="newContainer">

        <div className="top">
          <h1>Sell a item</h1>
        </div>

        {!isCompleted? <div className="notcompleted">
          <h1 className="complete-title">Please complete Your profile to add product</h1>
          <Link to="/account/profile">Complete</Link>
        </div> : 
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
                  <textarea  cols="30" rows="10" minLength="10" onChange={handleChange} value={data.Description} name="Description" placeholder="Write brief decription of the product here"></textarea>
                </div>
              
              
              <input className="button" type="submit" value="Upload" />
            </form>
            {error &&  <Alert variant="outlined" severity="error">
        {error}
      </Alert>}
        {response && <Alert variant="outlined" severity="success">
        Product Added Successfully. Add another product.
      </Alert>}
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Sell;
