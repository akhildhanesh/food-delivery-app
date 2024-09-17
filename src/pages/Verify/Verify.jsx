import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../util/constants'
import { StoreContext } from '../../context/StoreContext'

const Verify = () => {
    const { token } = useContext(StoreContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const session_id = searchParams.get('session_id')
    const navigate = useNavigate()

    const verifyPayment = () => {
        axios.post(`${API_URL}/api/order/verify`, {
            success,
            orderId,
            session_id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                navigate('/myorders')
            })
            .catch(() => {
                navigate('/')
            })
    }

    useEffect(() => {
        verifyPayment()
    }, [])

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}

export default Verify