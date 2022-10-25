import React, {useState, useEffect} from "react"
import {useForm} from "react-hook-form"
import axios from "axios"
import "./manageroles.scss"
import RoleModel from "./RoleModel/RoleModel"
import Alert from '@mui/material/Alert'
import {useCookiesContext} from  "../utils/CookieManager"


export default function ManageRoles(props){
    const {cookies} = useCookiesContext()
const[roleName, setRoleName] = useState("")
const [data, setData] = useState([])
const [trigger, setTrigger] = useState(false)
const [response, setResponse] = useState({})
const [error, setError] = useState()
const [cantDelete, setCantDelete] = useState(false)

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/adminstration/manageroles`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})
        .then(res => {
            setData(res.data)
        })
    },[trigger, response])


    function handleChange(evt){
        
        setRoleName(evt.target.value)
    }


   const mappedRoles = data.map(role => (
    <RoleModel  key={role.id} name={role.name} id={role.id} setResponse={setResponse} />
   ))


    function handleSubmit(evt){
        
        evt.preventDefault()
        const url = `${import.meta.env.VITE_API_URL}/api/adminstration/createrole`
        var formData = new FormData();
formData.append('RoleName', roleName);
        axios.post(url, formData, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}}).then((res) => {
            setResponse(res.data.message)
            setTimeout(()=>setResponse(""),3000)
      })
      .catch((err) => {
        setError(err.response);
      });
        setTimeout(()=>{setTrigger(prev => !prev); setError("")},2000)
        setRoleName("")
        setResponse("")
    }


    return(
        <div className="manageroles">
            <div className="roles">
                {mappedRoles}
            <div className="addrole">
                <h3>Create Role</h3>
                <form onSubmit={handleSubmit}>
                <input id="rolename" value={roleName} name="RoleName" onChange={handleChange} placeholder="Enter role name" />
                <input id="create" type="submit" value="Create" />
            </form>
            </div>
            </div>
            {error &&  <Alert variant="outlined" severity="error">
        Role with same name exists      </Alert>}
        {cantDelete &&  <Alert variant="outlined" severity="error">
        Adminstration and Customer roles can't be deleted  </Alert>}

        </div>
    )
}