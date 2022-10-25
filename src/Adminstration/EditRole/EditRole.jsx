import React,{useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import FindUserForRoles from "./FindUserForRoles"
import axios from "axios"
import "./editrole.scss"
import {useCookiesContext} from "../../utils/CookieManager"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { nanoid } from "nanoid"

export default function EditRole(){
    const {cookies} = useCookiesContext()
    const [response, setResponse] = useState(false)
    const [data, setData] = useState({users:[],roleName:"",roleId:""})
    const {id} = useParams()
    
    useEffect(()=>{
        axios(`${import.meta.env.VITE_API_URL}/api/Adminstration/roledetail/${id}`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})
        .then(res => {
            
            setData(res.data)
        }).catch(error=>{
            console.log(error)
        })
    },[response])

    const rolename = data.roleName
    const [newName, setNewName] = useState(rolename)

    function handleNameChange(evt){
        evt.preventDefault()
        axios(`${import.meta.env.VITE_API_URL}/api/Adminstration/changerolename?roleId=${id}&newName=${newName}`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})
        .then(res => {

            setTimeout(()=>{setResponse(res.data), 2000})
            setNewName("")

        }).catch(error=>{
            console.log(error)
        })
    }

    function RemoveUserFromRole(userId){
        axios(`${import.meta.env.VITE_API_URL}/api/Adminstration/removeuserfromrole?roleId=${id}&userId=${userId}`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})
        .then(res => {
            setTimeout(()=>{setResponse(res.data), 2000})
        }).catch(error=>{
            console.log(error)
        })
    }
    var users = []
    if(data.users){
        (data.users).forEach((user)=>{users.push(user.email)})
    }
    const userColumns = [
    { field: "id", headerName: "id", width: 10 },
    { field: "userId", headerName: "User Id", width: 150 },
    {field: "firstName", headerName: "First Name",width: 160,},
    {field: "lastName",headerName: "Last Name",width: 160,},
    {field: "email",headerName: "Email",width: 230,},
{field: "phoneNumber",headerName: "Phone Number",width: 150,},
{field: "action",headerName: "Action",width: 130,renderCell: (params) => {
        return (
        <div className="cellAction" style={{cursor:"pointer"}}>
            <button style={{ border:"none",background:"red",color:"white"}} className="deleteButton"
            onClick={() => RemoveUserFromRole(params.row.userId)}>Delete</button></div>);}}];

const userRows = data.users.map(user =>{return ({id:nanoid(),userId:user.id,firstName: user.firstName, lastName: user.lastName, email:user.email,phoneNumber:user.phoneNumber})})


const totalPages = Math.ceil(data.users.length / 10) + 1
    function handleChange(evt){
        setNewName(evt.target.value)
    }
    
    return(
        <div className="editrole">
            <h1 id="customizerole">Customize Role</h1>
            <div className="editrolename">
                <h4 id="changerolename">Change role name</h4>
 <h1 id="roletitle">  {data.roleName}</h1>
            <form onSubmit={handleNameChange}>
                    <input id="id" hidden name="id" readOnly value={id}/>
                <label htmlFor="roleName">
                    <input id="rolename" name="roleName" placeholder="Change role name here" onChange={handleChange} value={newName}/>
                    
                </label>
                <input type="submit" id="submit" value="Update"/>
            </form>
            </div>

<div className="userfinder">
<FindUserForRoles roleId={id}  sendTrigger={setResponse} users={users}/> 
</div>
            

            <div className="userstables">
<DataGrid  getRowId={(row) => row.id}   rows={userRows} autoHeight columns={userColumns} pageSize={10} rowsPerPageOptions={[10]} checkboxSelection  />
            </div>

            
        </div>
    )
}