import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
    const { foodList } = useContext(StoreContext)
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {
                    foodList.map((item, i) => {
                        if (category === 'All' || category === item.category) {
                            return <FoodItem key={i} {...item} />
                        }
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay