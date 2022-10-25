import React from 'react'
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

export default function GeneralReviews() {
const comments = [
    {
        nickname : "A" ,
        fullname : "Anonymous" ,
        description : "Really prompt delivery and everything as expected! " ,
    },
    {
        nickname : "AA",
        fullname : "Abiy Ahmed",
        description : "As a head of prosperity party. your security are stronger than Ethio-Eritrea bond." ,
    },
    {
        nickname : "KA" ,
        fullname : "Kebede Ayalew" ,
        description : `Love this company!  
Amazing quality, sustainable, eco friendly and natural products. Basically everything I look for in the products I buy. 
Huge range too, from beauty to household and then some.
Always delivered super fast aswell! 5* all round x` ,
    },
    ,{
        nickname : "M",
        fullname : "Mamo" ,
        description : "Lovely products, great service! ",
    },
    {
        nickname : "HM",
        fullname : "Hayat Mohammed",
        description : "Prompt delivery. Attention to detail. Personal touch, would def do business with them again. ",
    },
    {
        nickname : "DT" ,
        fullname : "Donald Trump",
        description : "Super fast delivery and very easy to order. " ,
    },
    {
        nickname : "KC",
        fullname : "Kibrom Chala",
        description :"The website really is a first class shopping experience. Very easy to navigate, excellent product images and information, and very straight forward to shop and check out. Also great to be kept informed on the tracking of the delivery. Packaging and presentation of products is extremely smart. As for the products themselves, first class." ,
    }
]
const StyledRating = styled(Rating)(({ theme }) => ({'& .MuiRating-iconEmpty .MuiSvgIcon-root': { color: theme.palette.action.disabled},}));

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};
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

const allComments = comments.map(comment => <div key={comment.fullname} className="comment">
            <div className="info" >
                <h5 className="circle"><p>{comment.nickname}</p></h5>
                <p><VerifiedIcon sx={{fontSize: 15,  color: "rgb(84,174,246)" }} /> Verified Customer</p>
                <h5>{comment.fullname}</h5>
            </div>

            <div className="description">
                <StyledRating name="highlight-selected-only" defaultValue={5} readOnly IconContainerComponent={IconContainer} getLabelText={(value) => customIcons[value].label} highlightSelectedOnly />
    <p>{comment.description}</p>
    <h6>2 month ago</h6>
    <section className="helpful">
        <p>Was this review helpful? </p>
        <div className="links">
            <Link>Yes</Link> <Link>Report</Link> <Link>Share</Link>
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
        <h1 className='review-title'>Customers Reviews</h1>
        {allComments}
    
    </div>
)
}
