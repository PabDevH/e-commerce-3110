import {React, useContext, useEffect, useState, Fragment} from "react";
import {Table, Alert, Button} from 'react-bootstrap';
import { CartContext } from '../../context/cartContext';
import { collection, addDoc, getFirestore, doc, updateDoc, getDoc} from 'firebase/firestore'
import CartStyle from "../../css/CartStyle.css"

const CheckOut = () => {
    const { productsInCart } = useContext(CartContext);
    
    const [name,saveName] = useState(undefined)
    const [lastName,saveLastName] = useState(undefined)
    const [phone, savePhone] = useState(undefined)
    const [email, saveEmail] = useState(undefined)
    const [subtotal, setSubtotal]=useState(0)
    const [isProcessLoading, setIsProcessLoading]=useState(false)
    const [orderID, setOrderID] = useState(undefined)
    const db = getFirestore()

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

    const buyNow = async () => {
        if (!name) {
            alert('Name is Invalid or Empty')
            return;
        }
        if (!lastName) {
            alert('Last Name is Invalid or Empty')
            return;
        }
        if (!phone) {
            alert('Phone is Invalid or Empty')
            return;
        }
        if (!email) {
            alert('Email is Invalid or Empty')
            return;
        }
        
        
        const buyTotalResult = {
            'buyer': {
                'name': name,
                'lastName':lastName,
                'email':email,
                'phone':phone
            },
            'items': productsInCart,
            'total': subtotal
        }

        
        try {
            setIsProcessLoading(true)
            const ordersCollection = collection(db, "orders");
            const response = await addDoc(ordersCollection, buyTotalResult)
            setOrderID(response.id)
        } catch(error) {
            console.log(error)
            setOrderID(0)
        } finally {
            setIsProcessLoading(false)
            updateStock();
        }        
    }
    
    const updateStock = async () => {
        for (let a = 0; a<productsInCart.length;a++) {
            let productID = productsInCart[a].productID
            let quantity = productsInCart[a].qty
            try {
                let docRef = doc(db, "items", productID)
                const getItemID = await getDoc(docRef)
                const dataResponse = getItemID.data();
                const stock = dataResponse.stock;
                const newStock = stock-quantity
                updateDoc(docRef, {stock: newStock})
                
            } catch(error) {
                console.log('No pude traer el stock')
            } finally {
                console.log('Update OK')
            }
        }  
    }

    if (isProcessLoading) return <div><img src='/loading.gif' title='Loading....' width={150} height={150} alt='Loading' /></div>
    
    return (
        <div>
            
            <div className="container">
            <br />
            <Alert variant="success" className="mb-5"><h4>Shopping Cart</h4></Alert>
                <div className="table-responsive custom-table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <td scope="col">Qty</td>
                                <td scope="col">Item Description</td>
                                <td scope="col">Unit Price</td>
                                <td scope="col">Total</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productsInCart.length > 0 ?
                                productsInCart.map(({productID,qty,description,price}) => (
                                    <Fragment key={productID}>
                                        <tr >
                                            <td >{qty}</td>
                                            <td><b>{description}</b></td>
                                            <td>${price}</td>
                                            <td>${price*qty}</td>
                                        </tr>
                                       <tr className="spacer"><td colSpan={100}></td></tr>
                                    </Fragment>
                                ))
                                :
                                    <tr id="emptyCart"><td colSpan={4}>Yor Shopping Cart is Empty</td></tr>
                            }
                            {
                                productsInCart.length > 0 ?
                                    <tr id="totalPriceInCart">
                                        <td colSpan={2}></td><td colSpan={1}><b>Total:</b></td><td colSpan={1}><b>${subtotal}</b></td>
                                    </tr>
                                    
                                
                                :
                                    undefined
                            }
                           

                        </tbody>
                    </table>
                    {
                orderID ?
                <>
                    <Alert variant="success" className="mb-5"><h4>Order Result</h4></Alert>
                    <table className="table custom-table">
                        <tbody>
                            <tr key="orderResultStatus">
                                {
                                    orderID!="0" ?
                                        <td scope="col"><h3>Thanks for your Purchase</h3><br /><h5>Your order number is: {orderID}</h5></td>
                                    :
                                        <td scope="col"><h3>Ooops! There are an error with your order</h3></td>
                                }
                            </tr>
                        </tbody>
                    </table>
                </>
                :
                <>
                    <br />
                    <Alert variant="success" className="mb-5"><h4>Personal Information</h4></Alert>
                    <table className="table custom-table">
                    {
                        productsInCart.length > 0 ? 
                            <tbody>
                                <tr id="group1">
                                    <td scope="col"><p align="right"><strong>Name:</strong></p></td>
                                    <td scope="col"><input type='text' id='name' onChange={(e)=>saveName(e.target.value)}/></td>
                                
                                    <td scope="col"><p align="right"><strong>Last Name:</strong></p></td>
                                    <td><input type='text' id='lastName' onChange={(e)=>saveLastName(e.target.value)} /></td>
                                </tr>
                                <tr className="spacer" id="space1"><td colSpan={100}></td></tr>
                                <tr id="group2">
                                    <td scope="col"><p align="right"><strong>E-Mail:</strong></p></td>
                                    <td><input type='text' id='email' onChange={(e)=>saveEmail(e.target.value)} /></td>
                                
                                    <td scope="col"><p align="right"><strong>Phone Number:</strong></p></td>
                                    <td><input type='text' id='phone' onChange={(e)=>savePhone(e.target.value)}/></td>
                                </tr>
                                <tr className="spacer" id="space2"><td colSpan={100}></td></tr>
                                <tr>
                                    <td colSpan={4}><Button onClick={buyNow}>Buy NOW!</Button></td>
                                    
                                </tr>
                            </tbody>
                        :
                        undefined
                    }
                    </table>
                </>
            }








                </div>
            </div>



        </div>
    )
}
export default CheckOut;