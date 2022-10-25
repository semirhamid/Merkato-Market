import React, { useEffect, useState } from "react"


export default function Pagination(props){
    const[linkModels, setLinkModels] = useState([])

    useEffect(()=>{
        const previousPageEnabled = props.currentPage !==1;
        const previousPage = props.currentPage -1
        const links = []

        links.push({
            text: "Previous",
            enabled: previousPageEnabled,
            page: previousPage,
            active: false
        });

        for(let i=1; i<= props.totalAmountOfPages; i++){
            if(i>= props.currentPage - props.radio && i<= props.currentPage + props.radio){
                links.push({
                    text: `${i}`,
                    active: props.currentPage === i,
                    enabled: true,
                    page: i
                });
            }
        }

        const nextPageEnabled = props.currentPage !== props.totalAmountOfPages && props.totalAmountOfPages >0;
        const nextPage = props.currentPage +1 ;
        links.push({
                    text: `Next`,
                    active: false,
                    enabled: nextPageEnabled,
                    page: nextPage
                });
        setLinkModels(links)

            
    },[props.currentPage, props.totalAmountOfPages, props.radio])


    function selectPage(link){
        if(link.page === props.currentPage){
            return
        }

        if(!link.enabled){
            return;
        }

        props.onChange(link.page)
    }

    function getClass(link){
         if(link.active){
            return "active pointer";
         }
         if(!link.enabled){
            return "disabled"
         }

         return "pointer"
    }


    return(
        <nav>
            <ul className="pagination justify-content-center" >
                 {linkModels.map(link => <li  key={link.text} onClick={()=> selectPage(link)} className={`page-item cursor ${getClass(link)}`}>
                    <span className="page-link">{link.text}</span>
                 </li>)}
            </ul>

        </nav>
    )
}

Pagination.defaultProps = {
    radio : 4
}