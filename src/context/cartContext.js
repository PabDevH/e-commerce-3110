import {React, createContext, useState} from 'react';

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [productsInCart, setProductsInCart] = useState([]);

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
    return (
        <CartContext.Provider 
        value={{
            productsInCart,
            AddProductsToCart,
            RemoveProductFromCart,
            EmptyCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;