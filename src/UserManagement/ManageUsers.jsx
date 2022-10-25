import axios from "axios";
import React, { useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import withPaginationHOC from "../utils/withPaginationHOC"
import "./manageusers.scss";
import SearchBar from "material-ui-search-bar";
import {useCookiesContext} from "../utils/CookieManager"
import Loader from "../Authethication/Loader"



const ManageUsers = (props)=>{
const [isLoading, setIsLoading] = useState(false)
const { cookies } = useCookiesContext();
const [search, setSearch] = useState("")
const {data, response, setData, setTotalNumberOfRecords,recordsPerPage, 
    totalnumberofrecords, setRecordsPerPage, page,setPage, setResponse, errors, setErrors} = props

    function handleDelete(id){
setIsLoading(true)
        const url = `${import.meta.env.VITE_API_URL}/api/Account?userId=${id}`

        axios.delete(url, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}} )  
        .then(response=>{
            setResponse(response.data.message)
            setTotalNumberOfRecords(1)
            setTimeout(()=>{setResponse("")}, 2000)
            setIsLoading(false)
        } ).catch(error=>
            {setErrors(error.message)
            setTimeout(()=>{setErrors("")}, 2000)
        setIsLoading(false)}
            
            )

    }

    


    const userRows = data.map(user =>{
        return ({firstname: user.firstName, lastname: user.lastName, email:user.email,id:user.id})})

    const actionColumn = [
    ];
    const userColumns = [
    { field: "id", headerName: "ID", width: 350 },
    {field: "firstname", headerName: "First Name",width: 160,},
    {field: "lastname",headerName: "Last Name",width: 160,},
    {field: "email",headerName: "Email",width: 230,}, 
{field: "action",headerName: "Action",width: 200,
    
    renderCell: (params) => {
        return (
        <div className="cellAction">
            <Link to={`/adminstration/user/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
            </Link>
            <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
            >
            Delete
            </div>
        </div>
        );},}];

const requestSearch = (email) => {
    if(email.trim().length == 0){

setRecordsPerPage(prev =>{
    return prev == 10 ? 15 : 10
})

return
    }

const url = `${import.meta.env.VITE_API_URL}/api/Account/getuserbyemail?email=`+ email.trim()
        axios.get(url, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})  
        .then(response=>{
            setData(response.data)
            setSearch("")

        } ).catch(error=>
            {setErrors("user with this email does not exist")
            setSearch("")
        setTimeout(()=>setErrors(""), 2000)}
            )

}


const cancelSearch = () => {setSearch("");};

    return(
        
<div className="manageuser">
            {isLoading && <Loader />}

<div className="datatable">
    <div className="datatableTitle">
        User Management
    </div>

    <div className="searchBar">
<SearchBar
placeholder={"Enter email address to search"}
        value={search}
        onChange = {searchdata => setSearch(searchdata)}
        onRequestSearch={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        />
    </div>

<DataGrid  rows={userRows} columns={userColumns} pageSize={10} rowsPerPageOptions={[10]} checkboxSelection/>


    </div>

        </div>

        

    )
}

export default withPaginationHOC(ManageUsers, {method:"get" ,url :`${import.meta.env.VITE_API_URL}/api/account/getusers`}) 





