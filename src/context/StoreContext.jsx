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

    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart
    }

    return (
        <StoreContext.Provider value={contextValue}>
            { children }
        </StoreContext.Provider>
    )
}

export default StoreContextProvider