import React, { useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { nanoid } from "nanoid";
import { useCookiesContext } from "../../utils/CookieManager";

export default function FindUserForRoles(props){
    const {cookies} = useCookiesContext()
    let {roleId, sendTrigger, users} = props
    const [search, setSearch] = useState("")
    const [data, setData] = useState({roleName:[]})


    function handleSubmit(evt){
        setData({id:"", roleName:[]})
        evt.preventDefault()
        axios.get(`${import.meta.env.VITE_API_URL}/api/adminstration/findroleuser/${search}`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})
        .then(res => {
            setData(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    function AddUserToRole(userId){
        const url = `${import.meta.env.VITE_API_URL}/api/adminstration/addusertorole?userId=${userId}&roleId=${props.roleId}`
        axios.get(url, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})
        .then(res => {
            sendTrigger(prev=>!prev)
        }).catch(error=>{
            sendTrigger(prev=>!prev)
        })

        setTimeout(()=> sendTrigger(prev=>!prev), 2000)
        setSearch("")
        setData("")
    }

    function handleChange(evt){
        setSearch(evt.target.value)
    }



    const userColumns = [
    { field: "id", headerName: "ID", width: 150 },
    {field: "firstName", headerName: "First Name",width: 160,},
    {field: "lastName",headerName: "Last Name",width: 160,},
    {field: "roleName",headerName: "Role Name",width: 230,},
{field: "phoneNumber",headerName: "Phone Number",width: 150,},
{field: "action",headerName: "Action",width: 130,renderCell: (params) => {
    return (
        <div className="cellAction" >
            {!users.includes(params.row.email)?  <button style={{cursor:"pointer", border:"none",background:"green",color:"white"}} onClick={()=>AddUserToRole(data.id)}>ADD</button> :users.includes(params.row.email) && <p>Member</p>}
        </div>);}}];


    const userRows =[{id:data.id,firstName: data.firstName, lastName: data.lastName, email:data.email, roleName:data.roleName, phoneNumber:data.phoneNumber}]

    return(
        < >
        <h4 id="changerolename">User Finder</h4>
        <h1 id="roletitle">  Search a user by email</h1>
            <form onSubmit={handleSubmit}> 
            <label >
            <input id="rolename" placeholder="Email" value={search} onChange={handleChange} name="search"  />
            </label>
            <input id="submit" type="submit" value="Search"/>
            </form>
            <div className="searchresults">

        <DataGrid getRowId={(row) => nanoid()} style={{margin:"1em",height:"163px"}} rows={userRows} columns={userColumns} pageSize={1} rowsPerPageOptions={[1]} />
            </div>
            
            

        </>
    )
}