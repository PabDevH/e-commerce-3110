import {React, useContext, useState, useEffect, Fragment} from "react";
import {Alert, Button} from 'react-bootstrap';
import { CartContext } from '../../context/cartContext';
import { NavLink } from "react-router-dom";
 
 
import CartStyle from "../../css/CartStyle.css"

const ShoppingCart = () => {
    const { productsInCart } = useContext(CartContext);
    const { RemoveProductFromCart } = useContext(CartContext);
    const { EmptyCart } = useContext(CartContext);
    const [subtotal, setSubtotal]=useState(0);

    
    const CalculateSubtotal = () => {
        let subtotal = 0;
        productsInCart.map(({productID,qty,description,price}) => (
            subtotal = subtotal + (qty*price)
        ))
        return subtotal;
    }
    useEffect(() => {
        setSubtotal(CalculateSubtotal());
    },[])
 
    const RemoveProduct = (e) => {
        if (!window.confirm('Are you really sure?')) return;
        const selProductID = e.currentTarget.getAttribute("productid");
        RemoveProductFromCart(selProductID);
    }
    const RemoveAllProducts = () => {
        EmptyCart();
    }
    return (
        <div >
            
            <div className="container">
            <br />
            <Alert variant="success" className="mb-5"><h4>Shopping Cart</h4></Alert>
                <div className="table-responsive custom-table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th scope="col">Qty</th>
                                <th scope="col">Item Description</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Total</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productsInCart.length > 0 ?
                                productsInCart.map(({productID,qty,description,price}) => (
                                    <Fragment key={productID}>
                                        <tr  >
                                            <td >{qty}</td>
                                            <td><b>{description}</b></td>
                                            <td>${price}</td>
                                            <td>${price*qty}</td>
                                            <td><Button className="icon-plus" variant="danger" onClick={RemoveProduct} productid={productID} className="icon-remove_shopping_cart"></Button></td>
                                        </tr>
                                    
                                        <tr className="spacer">
                                            <td colSpan={100}>&nbsp;</td>
                                        </tr>
                                    </Fragment>        
                                ))
                                :
                                    <tr key={'emptyCart'}>
                                        <td colSpan={5}>Your Shopping Cart is Empty</td>
                                    </tr>
                            }
                            {
                                productsInCart.length > 0 ?
                                    <tr key={productsInCart.length}>
                                        <td colSpan={2}>&nbsp;</td>
                                        <td colSpan={1}><b>Total:</b></td>
                                        <td colSpan={1}><b>${subtotal}</b></td>
                                        <td colSpan={1}>&nbsp;</td>
                                    </tr>
                                    
                                
                                :
                                <tr key={0+'-subtotal'}>
                                    <td colSpan={2}>&nbsp;</td>
                                    <td colSpan={1}><b>Total:</b></td>
                                    <td colSpan={1}><b>$0.00</b></td>
                                    <td colSpan={1}>&nbsp;</td>
                                </tr>
                            }
                            {
                                productsInCart.length > 0 ?
                                    <tr key={productsInCart.length+'g1'}>
                                        <td colSpan={5}>
                                            <NavLink to="/checkout">
                                                <Button>Procced to Checkout</Button>
                                            </NavLink>
                                            &nbsp;
                                            <Button onClick={RemoveAllProducts}>
                                                Remove All Products
                                            </Button>
                                        </td>
                                    </tr>
                                :
                                    <tr key={productsInCart.length+'g2'}>
                                        <td colSpan={5}>
                                            <NavLink to="/">
                                                <Button >
                                                    Continue Shopping
                                                </Button>
                                            </NavLink>
                                        </td>
                                    </tr>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ShoppingCart;