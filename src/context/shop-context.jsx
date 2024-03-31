import React, {createContext, useState} from 'react'
import Books from '../db.json'
const BOOKS = Books.books || [];
export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = [];
    for(let i=0; i < BOOKS.length ;i++){
        cart[i] = {id: BOOKS[i].id, quantity: 0};
    }
    return cart;
}
export const ShopContextProvider = (props) => {
        const [cartItems, setCartItems] = useState(getDefaultCart());

        const addToCart = (itemId) => {
            setCartItems(cartItems.map((item) => {
                if (item.id === itemId){
                    return{...item, quantity: item.quantity +1}
                } else {
                    return item
                }
            }))
        };

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.map((item) => {
            if (item.id === itemId){
                return{...item, quantity: item.quantity -1}
            } else {
                return item
            }
        }))
    };

        const contextValue = {cartItems, addToCart, removeFromCart}

        console.log(cartItems);

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;

};
