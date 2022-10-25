import React, {useState, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import './maincontent.scss'
import Rating from '@mui/material/Rating';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useOutletContext } from "react-router-dom";
import { useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice';
import Cart from '../Cart/Cart';
import Banner  from "./banner.png"
import Electronics from "./assets/electronics.jpeg"
import Clothes from "./assets/clothes.jpeg"
import Health from "./assets/health.jpg"
import Shoes from "./assets/shoes.jpeg"
import Toys from "./assets/toys.jpeg"
import Games from "./assets/games.jpg"



export default function MainContent(props) {
    
    const [data, setData] =  useOutletContext();
    const [page, setPage] = React.useState(1);
    const RecordsPerPage = 40;
    const [pageCount, setPageCount] = useState(1)

    const handlePageChange = (event, value)=>{
        setPage(value)
    }

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/product/getbypage?RecordsPerPage=${RecordsPerPage}&page=${page}`
        )
        .then(res => {
            setData(res.data);
            setPageCount((Math.ceil((res.headers.totalnumberofrecords) / RecordsPerPage)));
        }).catch(error => console.log(error))

    },[page])

   
const select = [ "All", "CLOTHES", "AUTOMOTIVE","BABY","BEAUTY","BOOKS","COMPUTER","DEALS","MUSIC","ELECTRONICS","KITCHEN","SCIENTIFIC",
        "SOFTWARE","SPORT","TOOLS","TOYS","GAMES","SHOES"]

    const catagories = [{name : "Toys", image: Toys},{name : "Health", image: Health},
{name : "Games", image: Games},{name : "Electronics", image: Electronics},{name : "Shoes", image: Shoes}
,{name : "Clothes", image: Clothes}]

const cats = catagories.map(cat => <div onClick={()=>handleCategory(cat.name)} className="item" key={cat.name}>
    <div className="upper"> <img src={cat.image} alt={cat.name} />
    <div className="bottom"><p>{cat.name}</p></div> </div>
    
</div>)

    const product  = data && data.slice(0,10).map(product =><ProductMapper key={product.id} product = {product} />)
    const product2  = data && data.slice(10,40).map(product =><ProductMapper key={product.id} product = {product} />)
    
 const handleCategory =(category)=>{
        if(category=="All"){
            category = ""
        }
        axios.get(`${import.meta.env.VITE_API_URL}/api/product?category=${category.toUpperCase()}`)
        .then(res => {setData(res.data); 
            console.log(res.data)
            })
        .catch(error=>{console.log(error)})
    }
  return (
    <div className='superMainContent'>
    <div className="maincontentt">
        <div className="banner">
            <img src={Banner} alt="" />
        </div>

    <div className='contents'>       
{product}
    </div>

     <div className="wrapper">
{cats}

</div>

    <div className='contents'>
{product2}
    </div>

   
    
</div>
<div className='pagination'>
<Stack spacing={2}>
    <Pagination count={pageCount} page={page}  onChange={handlePageChange} />
    </Stack></div>
</div>
  )
}

const ProductMapper = (props)=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
function handleDetail(id){
        navigate(`/product/details/${id}`);
    }
function addItemToCart(product){
        dispatch(addToCart(product))
        navigate("/cart")
    }
    const {product} = props
    const photoPath = `${import.meta.env.VITE_API_URL_IMAGE}/${product.photoPath}`
        
        return(<div  className="product">
            <div className="imageeContainer" onClick={()=>handleDetail(product.id)}>
                <img src={photoPath} alt="" />
                <div className="quickview">
                    <p onClick={()=>handleDetail(product.id)}> VIEW</p>
                </div>
                
            </div>
            <div className="content">
                <h4 className='titlename'> {product.name}</h4>
 <Rating
        value={product.rating}
        onChange={(event, newValue) => {
        setValue(newValue);
        }}
        disabled
        style={{width:"20%"}}
        size="small"
        precision={0.1}
      />  <del>€{Math.ceil(product.price * 1.15)}</del> <span onClick={()=>addItemToCart({id:product.id, name:product.name, quantity: 1,img: photoPath, price:product.price, stock:product.quantity })}> € {product.price}<LocalMallIcon className='material' /></span>
            </div>
        </div>)
    
    }