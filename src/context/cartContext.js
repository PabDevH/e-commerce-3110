import {React, createContext, useState, useEffect} from 'react';

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [productsInCart, setProductsInCart] = useState([]);
    const [totalProductsInCart, setTotalProductsInCart] = useState(0);
    const [loading, setLoading] = useState(true);

    const AddProductsToCart = ({productID,qty,description,price}) => {
        setProductsInCart([...productsInCart, {"productID": productID, "qty": qty, "description": description, "price": price}]);
    };
    const RemoveProductFromCart = (productID) => {
        const newProductsInCart = productsInCart.filter((productsInCart) => productsInCart.productID != productID );
        setProductsInCart(newProductsInCart);
    }
    const EmptyCart = () => {
        setProductsInCart([]);
    }
           
    
    useEffect(() => {
        setTotalProductsInCart(productsInCart.length)
    },[productsInCart])

    
    return (
        <CartContext.Provider 
        value={{
            productsInCart,
            AddProductsToCart,
            RemoveProductFromCart,
            EmptyCart,
            totalProductsInCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;