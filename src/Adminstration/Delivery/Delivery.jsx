import React from 'react'
import Bicycle from "../../Images/Bicycle.png"
import Lorry from "../../Images/Lorry.png"
import Motor from "../../Images/Motor.png"
import Truck from "../../Images/Truck.png"
import "./delivery.scss"
import Chart from '../../Component/chart/Chart'

export default function Delivery() {


  const carItems =[{
    source: Bicycle,
    Total: 10000,
    size: "small",
    DeliveredItems: 30000,
    CustomerRating: 5,
    Employees: 9000
  },{
    source: Truck,
    Total: 10000,
    size: "large",
    DeliveredItems: 30000,
    CustomerRating: 5,
    Employees: 9000
  },{
    source: Motor,
    Total: 10000,
    size: "small",
    DeliveredItems: 30000,
    CustomerRating: 5,
    Employees: 9000
  },{
    source: Lorry,
    Total: 10000,
    size: "medium",
    DeliveredItems: 30000,
    CustomerRating: 5,
    Employees: 9000
  }]


  return (
    <div className='deliveryParent'>
    <div className='delivery'>
      <h2 id='vehicles'>Vehicles Management</h2>
      <div className="cars">
        
        {carItems.map(car=><div key={car.source} className={`carItem ${car.size}`}>
          <img src={car.source} alt={car.source} />
          <span>
          <h6>Total: {car.Total}</h6>
          <h6>Delivered Items: {car.DeliveredItems}</h6>
          <h6>Customer Rating: {car.CustomerRating}</h6>
          <h6>Employees: {car.Employees}</h6>
          </span>
        </div>
        )}
        
 
        
      </div>

      </div>
      </div>
  )
}
