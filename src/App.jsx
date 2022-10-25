import {  useState } from 'react'
import {Route, Routes} from "react-router-dom"
import './App.css'
import NotFound from './LandingPages/NotFound'
import Products from './CustomerPage/Products'
import MainContent from './CustomerPage/MainContent/MainContent'
import ProductDetail from './CustomerPage/ProductDetail/ProductDetail'
import Cart from './CustomerPage/Cart/Cart'
import Login from './Authethication/Login'
import Register from './Authethication/Register'
import AccountContainer from './Authethication/AccountContainer'
import Confirmation from './Authethication/Confirmation'
import ConfirmEmail from './Authethication/ConfirmEmail'
import ForgetPassword from './Authethication/ForgetPassword'
import ResetPassword from './Authethication/ResetPassword'
import Profile from './CustomerPage/Profile/Profile'
import ProtectedCustomerRoute,{ProtectedAdminRoute} from './Routes/ProtectedAdminRoute'
import Checkout from './CustomerPage/Checkout/Checkout'
import OrderConfirmation from './Authethication/OrderConfirmation'
import ProductTracker from './CustomerPage/ProductTracker/ProductTracker'
import CustomerDashboard from './CustomerPage/CustomerDashboard/CustomerDashboard'
import Sell from "./CustomerPage/Sell/Sell"
import AdminDashboard from "./AdminDashboard"
import AdminHome from './AdminHome'
import ManageRoles from './Adminstration/ManageRoles'
import Delivery from './Adminstration/Delivery/Delivery'
import ManageUsers from './UserManagement/ManageUsers'
import SingleUser from './UserManagement/SingleUser'
import EditRole from './Adminstration/EditRole/EditRole'
import AdminstrationOrders from './Adminstration/Orders/AdminstrationOrders'
import AdminstrationProducts from './Adminstration/Products/AdminstrationProducts'
import EditProduct from "./Component/EditProduct/EditProduct"
import About from './CustomerPage/CustomerFooter/About'
import ContactUs from './CustomerPage/CustomerFooter/ContactUs'
import FAQ from './CustomerPage/CustomerFooter/FAQ'
import Principles from './CustomerPage/CustomerFooter/Principles'
import DeliveryInfo from './CustomerPage/CustomerFooter/DeliveryInfo'
import RefundPolicy from './CustomerPage/CustomerFooter/RefundPolicy'
import GeneralReviews from './CustomerPage/CustomerFooter/GeneralReviews'
import Unauthorized from './LandingPages/Unauthorized'

function App() {
  return (
    <div >
    <div style={{minHeight:"100%", position:"relative"}} className="App" >
      <div  >
      <Routes>
        <Route  path="/" element={<Products />}>
          <Route index  element={<MainContent />} />
          <Route path="product/details/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />}/>
          <Route path="about" element={<About />}/>
          <Route path="contact" element={<ContactUs />}/>
          <Route path="faq" element={<FAQ />}/>
          <Route path="principles" element={<Principles />}/>
          <Route path="deliveryinfo" element={<DeliveryInfo />}/>
          <Route path="refund-policy" element={<RefundPolicy />}/>
          <Route path="customer-reviews" element={<GeneralReviews />}/>
          <Route path="order-tracker" element={<ProductTracker />}/>
          <Route path="account/profile" element={<ProtectedCustomerRoute><Profile /></ProtectedCustomerRoute>}></Route>
          <Route path='/account/checkout' element={<ProtectedCustomerRoute><Checkout /></ProtectedCustomerRoute>}></Route>
          <Route path='/account/dashboard' element={<ProtectedCustomerRoute><CustomerDashboard /></ProtectedCustomerRoute>}></Route>
          <Route path='/account/sell' element={<ProtectedCustomerRoute><Sell /></ProtectedCustomerRoute>}></Route>
          <Route path='/account/editproduct/:productId' element={<ProtectedCustomerRoute><EditProduct /></ProtectedCustomerRoute>}></Route>
          
        </Route>
        
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path='/account' element={<AccountContainer />} >
          <Route index element={<Login />} />
          <Route path='/account/login'  element={<Login />} />
          <Route path='/account/register' element={<Register />} />
          <Route path='/account/confirmation/:email' element={<Confirmation />}/>
          <Route path='/account/confirmemail' element={<ConfirmEmail />}/>
          <Route path='/account/forgetpassword' element={<ForgetPassword />}/>
          <Route path='/account/resetpassword/:email/:token' element={<ResetPassword />}/>
          <Route path='/account/orderconfirmation/:tracking' element={<OrderConfirmation />}/>
        </Route>

        <Route path='/adminstration' element={<AdminHome />} >
          <Route index element={<AdminDashboard />} />
          <Route path='/adminstration/dashboard' element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path='/adminstration/manageroles' element={<ProtectedAdminRoute><ManageRoles /></ProtectedAdminRoute>} />
          <Route path='/adminstration/delivery' element={<ProtectedAdminRoute><Delivery /></ProtectedAdminRoute>} />
          <Route path='/adminstration/profile' element={<ProtectedAdminRoute><Profile /></ProtectedAdminRoute>} />
          <Route path='/adminstration/manageusers' element={<ProtectedAdminRoute><ManageUsers /></ProtectedAdminRoute>} />
          <Route path='/adminstration/user/:id' element={<ProtectedAdminRoute><SingleUser /></ProtectedAdminRoute>} />
          <Route path='/adminstration/editrole/:id' element={<ProtectedAdminRoute><EditRole /></ProtectedAdminRoute>} />
          <Route path='/adminstration/orders' element={<ProtectedAdminRoute><AdminstrationOrders /></ProtectedAdminRoute>} />
          <Route path='/adminstration/products' element={<ProtectedAdminRoute><AdminstrationProducts /></ProtectedAdminRoute>} />
          <Route path='/adminstration/userdetails/:userId' element={<ProtectedAdminRoute><Profile /></ProtectedAdminRoute>} />
          <Route path="/adminstration/productdetails/:id" element={<ProtectedAdminRoute><ProductDetail /></ProtectedAdminRoute>} />
          <Route path="/adminstration/editproduct/:productId" element={<ProtectedAdminRoute><EditProduct /></ProtectedAdminRoute>} />
        </Route>
        <Route path="*" element={<NotFound />} />
        
        
      </Routes>
    </div>
    </div>
    </div>
  )
}

export default App
