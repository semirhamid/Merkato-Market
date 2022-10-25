import React, {useState, useEffect} from 'react'
import "./profile.scss"
import {useCookiesContext} from "../../utils/CookieManager"
import axios from "axios"
import ProfilePicture from "./profile-place-holder.png"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams , useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert'


export default function Profile() {
  const navigate = useNavigate()
  const {userId} = useParams()
  const {cookies} = useCookiesContext()
  const [edit, setEdit] = useState(false)
  const [response, setResponse] = useState("")
  const id = userId? userId: cookies ? cookies.userId : ""
  const [userData, setUserData] = useState({firstName: "", lastName:"",address:"",birthday:"",country:"Ethiopia",email:"",gender:"",region:""
,userId:"",city:"",phoneNumber:""})
  
    useEffect(()=>{

        axios.get(`${import.meta.env.VITE_API_URL}/api/account/getuserbyid?id=${id||""}`,{headers: {
    'Authorization': `Bearer ${cookies.token}` 
    
  }})
        .then(res => {setUserData({...res.data,birthday:res.data.birthday && res.data.birthday.slice(0,10)}); 
      })
        .catch(error=>console.log(error))
    },[response])
    
  

    const handleSubmit=(evt)=>{
      evt.preventDefault()
    const body = {...userData, Id:userData.userId,country :"Ethiopia"}
      axios.post(`${import.meta.env.VITE_API_URL}/api/account/edituser?id=${id||""}`, body ,{headers: {
    'Authorization': `Bearer ${cookies.token}` 
    
  }})
        .then(res => {setResponse(res.data); setTimeout(()=>setResponse(""), 2000) })
        .catch(error=>console.log(error))
    }

    const handleDelete=(evt)=>{
      evt.preventDefault()
      axios.delete(`${import.meta.env.VITE_API_URL}/api/account/${id||""}` ,{headers: {
    'Authorization': `Bearer ${cookies.token}` 
  }})
        .then(res => {setResponse(res.data); navigate("/") })
        .catch(error=>console.log(error))
    }
    const handleChange= (evt)=>{
      
      const name = evt.target.id
      const value = evt.target.value

      setUserData(prev =>({...prev, [name]: value}))
      
    }

  return (
    <div className='profile'>
      
      <div className="userInformation">
        <div className="cover">
          <div className="pictureImg">
          <img className='picture' src={ProfilePicture} alt="" />
        </div>
        </div>
        
        <div className="edit">
          <span id='edit' onClick={()=>setEdit(true)}><p>EDIT</p>  <EditIcon className="btn-edit"  sx={{ fontSize: 30 }}   /></span>
          <span id='delete' onClick={handleDelete}><p>DELETE</p>  <DeleteIcon className="btn-delete" sx={{ fontSize: 30 }}  color="primary"  /></span>
          
        </div>
        <h3>{userData.firstName + "  " + userData.lastName} </h3>
        <h4>{userData.role ? userData.role.toString() : "Customer"}</h4>
      </div>
      
        <form action="" onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" name='userId' value={userData.userId || ""} hidden/> 
          <div className="generalInformation">
            <h5>General Information</h5>

            <div className="firstName general">
              <label htmlFor="firstName">
            <p>First Name</p>  </label>
            <input onChange={handleChange} required id='firstName' disabled={!edit} name='address' value={userData.firstName || ""} type="text"  />
            </div>
          <div className="lastName general">
            <label htmlFor="lastName">
            <p>Last Name</p>  </label>
            <input onChange={handleChange} required id='lastName' disabled={!edit} name='lastName' value={userData.lastName || ""} type="text"  />
          </div>
          
          <div className="birthday general">
            <label htmlFor="birthday">
            <p>Birth Day</p>  </label>
            <input onChange={handleChange} required id='birthday' disabled={!edit} name='birthday' value={userData.birthday || ""} type="date"  />
          </div>
          
          <div className="gender general">
            <label htmlFor="gender">
            <p>Gender</p>  </label>
            <select onChange={handleChange} required id='gender' disabled={!edit} name='gender' value={userData.gender || ""} type="text"  >
                <option value="">None</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                
              </select>
          </div>
          
          <div className="email general">
            <label htmlFor="email">
            <p>Email</p>  </label>
            <input onChange={handleChange} required id='email'  name='email' disabled value={userData.email || ""} type="email"  />
          </div>
          
          <div className="phoneNumber general">
            <label htmlFor="phone">
            <p>Phone</p>  </label>
            <input onChange={handleChange} required id='phoneNumber' disabled={!edit} name='phoneNumber' value={userData.phoneNumber || ""} type="text"  />
          </div>
          
          
</div>
        <div className="addressBar">
          <h5>Address</h5>
          <div className="address Address">
            <label htmlFor="address">
            <p>Address</p>  
            <input onChange={handleChange} required id='address' disabled={!edit} name='address' value={userData.address || ""} type="text"  />
          </label> 
          </div>
          
          <div className="city Address">
            <label htmlFor="city">
            <p>City</p>  </label>
            <input onChange={handleChange} required id='city' disabled={!edit} name='city' value={userData.city || ""} type="text"  />
          </div>
          
          <div className="region Address">
            <label htmlFor="region">
            <p>Region</p>  </label>
            <input onChange={handleChange} required id='region' disabled={!edit} name='region' value={userData.region || ""} type="text"  />
          </div>
          
          <div className="country Address">
            <label htmlFor="country">
            <p>Country</p>  </label>
            <input onChange={handleChange} required id='country' disabled name='country' value={"Ethiopia"} type="text"  />
          </div>
          <input disabled={!edit}  className='submit' type="submit" value={"Update"}/>
          
        </div>
        
        </form>
         {response && <Alert variant="outlined" severity="success">
        Information updated successfully
      </Alert>}
        {edit && <div className="cancel">
          <button>Cancel</button>
        </div>}
      

      
    </div>
  )
}
