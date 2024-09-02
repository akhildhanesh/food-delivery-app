import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = e => {
    const { name, value } = e.target
    setData(prev => ({...prev, [name]: value }))
  }

  return (
    <form className='place-order'>
      <div className='place-order-left'>
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' name="firstName" id="" />
          <input onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' name="lastName" id="" />
        </div>
        <input onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' name="email" id="" />
        <input onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' name="street" id="" />
        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.city} type="text" placeholder='City' name="city" id="" />
          <input onChange={onChangeHandler} value={data.state} type="text" placeholder='State' name="state" id="" />
        </div>
        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.zip} type="text" placeholder='Zip Code' name="zip" id="" />
          <input onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' name="country" id="" />
        </div>
        <input onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' name="phone" id="" />
      </div>
      <div className='place-order-right'>
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button>Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder