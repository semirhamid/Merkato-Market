import axios from "axios";
import React, { useEffect, useState } from "react"
import Pagination from "./Pagination"
import {useCookiesContext} from "./CookieManager"

const withPaginationHOC = (Component, ...props) => {
    const [{method, url}] = [...props]

    
    return function( props) {
        const[totalnumberofrecords, setTotalNumberOfRecords] = useState(0)
        const [isLoading, setIsLoading] = useState(false)
        const [data, setData] = useState([])
        const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
        const [recordsPerPage, setRecordsPerPage] = useState(10)
        const [page,setPage] = useState(0)
        const [response, setResponse] = useState()
        const [errors, setErrors] = useState()
        const { cookies } = useCookiesContext();
        let user = cookies.token || {token:""}
        const tokenStr =  user

    useEffect(()=>{
        setIsLoading(true)
        axios[method](url,{
            headers: {"Authorization" : `Bearer ${tokenStr}`},
            params: {page: page + 1,recordsPerPage}
        })
        .then(response => {
            setTotalNumberOfRecords(response.headers.totalnumberofrecords)
            const TotalNumberOfRecords = parseInt(response.headers["totalnumberofrecords"], 10)
            setTotalAmountOfPages(Math.ceil(TotalNumberOfRecords / recordsPerPage))
            setData(response.data)
            setIsLoading(false)
        }).catch(error=>{
                setIsLoading(false)
                console.log(error)
            })

    },[page, recordsPerPage, response,errors])

        return (
            <Component setIsLoading={setIsLoading} isLoading={isLoading} data={data}  setData={setData} totalAmountOfPages={totalAmountOfPages}
            setTotalAmountOfPages={totalAmountOfPages} recordsPerPage={recordsPerPage} setRecordsPerPage={setRecordsPerPage}
            page={page} setPage={setPage} response={response} setResponse={setResponse} errors={errors}
            setErrors={setErrors} tokenStr={tokenStr} Pagination={<Pagination currentPage={page}  totalAmountOfPages={totalAmountOfPages}
            onChange={newPage => setPage(newPage)} />} totalnumberofrecords={totalnumberofrecords} Select={<div className="mb-3" style={{width: "150px"}}>
                <label htmlFor="">Records Per Page: </label>
                <select className="form-select"
                defaultValue={5}
                onChange={e =>{
                    setPagee(1)
                    setRecordsPerPage(parseInt(e.currentTarget.value, 10) )
                }}>
                    <option defaultValue value={1}>1</option>
                    <option value={4}>4</option>
                    <option  value={5}>5</option>
                    <option value={10}>10</option>
                </select>
            </div>} {...props} />
        )
    }
}

export default withPaginationHOC 
