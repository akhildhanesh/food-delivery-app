import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext)
  return (
    <form className='place-order'>
      <div className='place-order-left'>
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' name="" id="" />
          <input type="text" placeholder='Last Name' name="" id="" />
        </div>
        <input type="email" placeholder='Email Address' name="" id="" />
        <input type="text" placeholder='Street' name="" id="" />
        <div className="multi-fields">
          <input type="text" placeholder='City' name="" id="" />
          <input type="text" placeholder='State' name="" id="" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code' name="" id="" />
          <input type="text" placeholder='Country' name="" id="" />
        </div>
        <input type="text" placeholder='Phone' name="" id="" />
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