import React, { useContext } from 'react'
import './CartIcon.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import CartStyle from "../css/CartStyle.css"

export const CartIcon = () => {
    const totalProductsInCart = useContext(CartContext);
    return (
        <div>
            
            {
                totalProductsInCart.totalProductsInCart > 0 ?
                    <>
                        <Link to="/cart/" style={{"textDecoration": "none"}}>
                            <i className='icon-shopping-bag'></i>
                            <span className="cart-basket d-flex align-items-center justify-content-center">
                            {totalProductsInCart.totalProductsInCart} Item(s)
                            </span>
                            
                        </Link>
                        
                    </>
                :
                <>
                    <Link to="/" style={{"textDecoration": "none"}}>
                        <i className='icon-shopping-bag'></i>
                    </Link>
                </>
            }
        </div>
    )
}
export default CartIcon;