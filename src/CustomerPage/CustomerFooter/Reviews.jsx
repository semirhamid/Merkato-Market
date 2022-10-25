import React, {useState, useEffect} from 'react'
import "./reviews.scss"
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Link } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import {useCookiesContext} from "../../utils/CookieManager"

export default function Reviews(props) {
    const {productId} = props
    const { cookies } = useCookiesContext();
    const StyledRating = styled(Rating)(({ theme }) => ({'& .MuiRating-iconEmpty .MuiSvgIcon-root': { color: theme.palette.action.disabled},}));
    const [data, setData] = useState([])
    const [recordsPerPage, setRecordsPerPage] = useState(5)
    const [page,setPage] = useState(1)
    const [pageCount, setPageCount] = useState()
    const [totalnumberofrecords, setTotalnumberofrecords] = useState()
    const [newComment, setNewComment] = useState({productId:productId || 0, userId:cookies.userId, rating: 3, comment: ""})
    

useEffect(()=>{

        axios.get(`${import.meta.env.VITE_API_URL}/api/Review?productId=${productId}&Page=${page}&RecordsPerPage=${recordsPerPage}`
        )
        .then(res => {
            setData(res.data);
            setTotalnumberofrecords(res.headers.totalnumberofrecords)
            setPageCount((Math.ceil((res.headers.totalnumberofrecords) / recordsPerPage)));
        }).catch(error => console.log(error))

        axios.get(`${import.meta.env.VITE_API_URL}/api/Review/userproductreview?productId=${productId}&userId=${cookies.userId}`
        )
        .then(res => {
            setNewComment(res.data || {productId:productId || 0, userId:cookies.userId, rating: 3, comment: ""});
        }).catch(error => console.log(error))
    
    },[page,recordsPerPage])

    const handlePageChange= (page) => {
        setPage(page % pageCount)
    }
    
function handleChange(evt){
    setNewComment(prev => ({...prev,[evt.target.name]:evt.target.value}))

}

function handleSubmit(evt){

    const url = `${import.meta.env.VITE_API_URL}/api/review`
    evt.preventDefault()
    const formData = new FormData();
    formData.append("productId", newComment.productId)
    formData.append("userId", newComment.userId)
    formData.append("rating", newComment.rating)
    formData.append("comment", newComment.comment)
axios.post(url, formData, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}}).then((res) => {
setRecordsPerPage(recordsPerPage == 5 ? 6 : 5)
})
    .catch((err) => {
        console.log(err.message)
    });
}

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function handleDelete(){
const url = `${import.meta.env.VITE_API_URL}/api/review?productId=${productId}&userId=${cookies.userId}`
    axios.delete(url, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}}).then((res) => {
setNewComment({productId:productId || 0, userId:cookies.userId, rating: 3, comment: ""})
setRecordsPerPage(recordsPerPage == 5 ? 6 : 5)
})
    .catch((err) => {
        console.log(err.message)
    });
}
const allComments = data.map(comment => <div key={comment.firstName + " " + comment.lastName} className="comment">
            <div className="info" >
                <h5 className="circle"><p>{comment.firstName.slice(0,1) + comment.lastName.slice(0,1)}</p></h5>
                <p><VerifiedIcon sx={{fontSize: 15,  color: "rgb(84,174,246)" }} /> Verified Customer</p>
                <h5>{comment.firstName + " " + comment.lastName}</h5>
            </div>

            <div className="description">
                <StyledRating name="highlight-selected-only" defaultValue={comment.rating || 5} readOnly IconContainerComponent={IconContainer} getLabelText={(value) => customIcons[value].label} highlightSelectedOnly />
    <p>{comment.comment}</p>
    <h6>{comment.date.slice(0,10)}</h6>
    <section className="helpful">
        <p>Was this review helpful? </p>
        <div className="links">
            <Link>Yes</Link> {comment.userId == cookies.userId? <button onClick={handleDelete} id='delete'>Delete</button> : <Link>Report</Link>} <Link>Share</Link>
        </div></section>
        </div></div>
)

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

return (
    <div className='reviews'>

        {allComments}
        <div className='pagination'>
<Stack spacing={2}>
    {data.length >= 5 && <Pagination count={pageCount || 1} page={page  || 1}  onChange={handlePageChange}  />}
    </Stack></div>
    <div className="addcomment">
        
        <form onSubmit={handleSubmit}>
<StyledRating disabled={!cookies.userId} name="highlight-selected-only" value={newComment.rating || 5} onChange={(event, newValue) => {
   setNewComment(prev => ({...prev,rating:newValue}));

  }}  IconContainerComponent={IconContainer} getLabelText={(value) => customIcons[value].label} highlightSelectedOnly />
<div className='message'>
<label htmlFor="message">Add Review</label>
        <textarea placeholder={cookies.userId ? 'Type your comment on this product here' : "You have to login to give review"} id="message" name='comment' value={newComment.comment} disabled={!cookies.userId} onChange={handleChange} required />
</div>
    
    <button className='button'  type="submit">Post</button>
    </form>
    </div>
    </div>
)
}









    