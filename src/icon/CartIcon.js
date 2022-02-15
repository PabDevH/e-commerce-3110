import React, { useContext, useEffect, useState } from 'react'
import './CartIcon.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';

export const CartIcon = () => {
    const totalProductsInCart = useContext(CartContext);
    const [showTotalProducts,setShowTotalProducts] = useState(0);
    useEffect(() => {
        setShowTotalProducts(totalProductsInCart.totalProductsInCart)
    },[totalProductsInCart])

    return (
        <div>
            
            {
                showTotalProducts > 0 ?
                    <>
                        <Link to="/cart/" style={{"textDecoration": "none"}}>
                            <img className='cart' src="/online-shopping.png" title="Shopping Cart" alt="Shopping Cart" />
                            &nbsp;
                            {showTotalProducts} Item(s)
                        </Link>
                        
                    </>
                :
                    <img className='cart' src="/online-shopping.png" title="Your Shopping Cart is Empty" alt="Shopping Cart" />
            }
        </div>
    )
}
export default CartIcon;