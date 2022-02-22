import {React, useContext, useState, useEffect} from "react";
import {Table, Alert, Button} from 'react-bootstrap';
import { CartContext } from '../../context/cartContext';
import { Link, NavLink } from "react-router-dom";
 
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
        const selProductID = e.currentTarget.getAttribute("productID");
        RemoveProductFromCart(selProductID);
    }
    const RemoveAllProducts = () => {
        EmptyCart();
    }
    return (
        <div>
            <Alert variant="success"><h4>Shopping Cart</h4></Alert>
            
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Qty</th><th>Item Description</th><th>Unit Price</th><th>Total</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsInCart.length > 0 ?
                        productsInCart.map(({productID,qty,description,price}) => (
                            
                            <tr key={(price*qty)+'-'+price+'-'+qty}>
                                <td>{qty}</td><td>{description}</td><td>${price}</td><td>${price*qty}</td><td><Button onClick={RemoveProduct} productID={productID}>Remove</Button></td>
                            </tr>
                            
                        ))
                        :
                            <tr><td colSpan={5}>Yor Shopping Cart is Empty</td></tr>
                    }
                    {
                        productsInCart.length > 0 ?
                            <tr >
                                <td colSpan={2}></td><td colSpan={1}><b>Total:</b></td><td colSpan={1}><b>${subtotal}</b></td><td colSpan={1}></td>
                            </tr>
                            
                        
                        :
                            ""
                    }
                    {
                        productsInCart.length > 0 ?
                            <tr><td colSpan={5}><NavLink to="/checkout"><Button>Procced to Checkout</Button></NavLink>&nbsp;<Button onClick={RemoveAllProducts}>Remove All Products</Button></td></tr>
                        :
                            <tr><td colSpan={5}><NavLink to="/"><Button>Continue Shopping</Button></NavLink></td></tr>
                    }

                    
                </tbody>
            </Table>
        </div>
    )
}
export default ShoppingCart;