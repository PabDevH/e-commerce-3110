import React from 'react'
import './CartIcon.css';
import { Link } from 'react-router-dom';
export const CartIcon = () => {
    return (
        <div>
            <Link to="/cart/"><img className='cart' src="/online-shopping.png" title="Shopping Cart"  /></Link>
        </div>
    )
}
export default CartIcon;