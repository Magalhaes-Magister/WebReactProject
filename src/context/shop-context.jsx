import React, {createContext, useState} from 'react'
export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (itemId) => {
        if(cartItems.length === 0 || !cartItems.find((item) => item.id === itemId)){
            setCartItems((prevState) => [...prevState, {id: itemId, quantity: 1}])
        }
        else{
            setCartItems(cartItems.map((item) => {
            if (item.id === itemId){
                return{...item, quantity: item.quantity +1}
            } else {
                return item
            }
        }))}
    };

    const removeFromCart = (itemId) => {
        if(cartItems.find((item) => { return item.id === itemId}).quantity <= 1){
            setCartItems(cartItems.filter(item => item.id !== itemId))
        } else{
            setCartItems(cartItems.map((item) => {
                if (item.id === itemId){
                    return{...item, quantity: item.quantity -1}
                } else {
                    return item
                }
            }))
        }

    };

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems(cartItems.map((item) => {
            if (item.id===itemId){
                return{...item, quantity: newAmount}
            } else {
                return item
            }
        }))
    }

    const deleteCart = () =>{
        setCartItems([])
    }
    console.log(cartItems);
    const contextValue = {cartItems, addToCart, removeFromCart, updateCartItemCount, deleteCart}

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;

};
