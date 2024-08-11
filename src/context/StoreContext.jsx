import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({})

    const addToCart = itemId => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems(prev => ({...prev, [itemId]: prev[itemId] + 1}))
        }
    }

    const removeFromCart = itemId => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            const itemPrice = food_list.find(e => e._id === item).price
            totalAmount += itemPrice * cartItems[item]
        }
        return totalAmount
    }

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            { children }
        </StoreContext.Provider>
    )
}

export default StoreContextProvider