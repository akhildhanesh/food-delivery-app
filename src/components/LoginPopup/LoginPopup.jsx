import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { API_URL } from '../../util/constants'
import { StoreContext } from '../../context/StoreContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LoginPopup = ({ setShowLogin }) => {
    const { setToken } = useContext(StoreContext)
    const [currentState, setCurrentState] = useState('Sign Up')
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChangeHandler = e => {
        const { name, value } = e.target
        setData(prevData => ({ ...prevData, [name]: value }))
    }

    const onLogin = async e => {
        e.preventDefault()
        let url
        if (currentState === 'Login') {
            url = `${API_URL}/api/user/login`
        } else {
            url = `${API_URL}/api/user/register`
        }
        axios.post(url, data)
            .then(data => data.data)
            .then(data => {
                setToken(data.token)
                localStorage.setItem('token', data.token)
                setShowLogin(false)
            })
            .catch(err => {
                console.error(err)
                toast.error(err.response.data.message)
            })
    }

    return (
        <div className='login-popup'>
            <ToastContainer />
            <form className='login-popup-container' onSubmit={onLogin}>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-input">
                    {
                        currentState != 'Login' && <input value={data.name} onChange={onChangeHandler} type="text" name='name' placeholder='Your name' required />
                    }
                    <input value={data.email} onChange={onChangeHandler} name='email' type="email" placeholder='Your email' required />
                    <input value={data.password} onChange={onChangeHandler} name='password' type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currentState === 'Sign Up' ? 'Create account' : 'Login'}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {
                    currentState === 'Login' ?
                        <p>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p> :
                        <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup