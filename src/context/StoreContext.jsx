import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../util/constants";

export const StoreContext = createContext(null)

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({})
    const [foodList, setFoodList] = useState([])
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || ''
    })
    const [showLogin, setShowLogin] = useState(false)

    const fetchCart = () => {
        axios.get(`${API_URL}/api/cart/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => data.data.data)
            .then(setCartItems)
            .catch(err => {
                if (err.status === 401) {
                    setShowLogin(true)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }
            })
    }

    const fetchItems = () => {
        axios.get(`${API_URL}/api/food/list`)
            .then(data => data.data.data)
            .then(setFoodList)
    }

    useEffect(() => {
        fetchItems()
        if (token) {
            fetchCart()
        }
    }, [])

    useEffect(() => {
        if (token) {
            fetchCart()
        }
    }, [token])

    const addToCart = async itemId => {
        if (!token) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setShowLogin(true)
            return
        }
        await axios.post(`${API_URL}/api/cart/add`, { itemId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                if (!cartItems[itemId]) {
                    setCartItems(prev => ({ ...prev, [itemId]: 1 }))
                } else {
                    setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
                }
            })
            .catch(err => {
                if (err.status === 401) {
                    setShowLogin(true)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }
            })
    }

    const removeFromCart = async itemId => {
        if (!token) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setShowLogin(true)
            return
        }
        await axios.post(`${API_URL}/api/cart/remove`, { itemId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0 }))
            })
            .catch(err => {
                if (err.status === 401) {
                    setShowLogin(true)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }
            })
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            const itemPrice = foodList.find(e => e._id === item)?.price
            totalAmount += itemPrice * cartItems[item]
        }
        return totalAmount
    }

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        foodList,
        setFoodList,
        setShowLogin,
        showLogin
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider