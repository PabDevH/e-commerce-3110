import {React, createContext, useState} from 'react';

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [info, setInfo] = useState([]);
    return <CartContext.Provider value={info}>{children}</CartContext.Provider>
}

export default CartProvider;