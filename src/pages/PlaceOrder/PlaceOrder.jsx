import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '../../util/constants'
import axios from 'axios'

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, cartItems, url } = useContext(StoreContext)
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
    setData(prev => ({ ...prev, [name]: value }))
  }

  const placeOrder = async e => {
    e.preventDefault()

    for (let value of Object.values(data)) {
      if (value.trim() === '') {
        toast.error('Please Fill all the fields')
        return
      }
    }

    const orderItems = []
    foodList?.forEach(item => {
      if (cartItems[item._id]) {
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }
    axios.post(`${API_URL}/api/order/place`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(data => data.data.session_url)
      .then(session_url => {
        window.location.replace(session_url)
      })
      .catch(err => {
        console.error(err.message)
        toast.error('Something went wrong')
    })
  }

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <ToastContainer />
      <div className='place-order-left'>
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' name="firstName" id="firstName" />
          <input onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' name="lastName" id="lastName" />
        </div>
        <input onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' name="email" id="email" />
        <input onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' name="street" id="street" />
        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.city} type="text" placeholder='City' name="city" id="city" />
          <input onChange={onChangeHandler} value={data.state} type="text" placeholder='State' name="state" id="state" />
        </div>
        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.zip} type="text" placeholder='Zip Code' name="zip" id="zip" />
          <input onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' name="country" id="country" />
        </div>
        <input onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' name="phone" id="phone" />
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
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder