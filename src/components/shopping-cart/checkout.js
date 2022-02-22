import {React, useContext, useEffect, useState} from "react";
import {Table, Alert, Button} from 'react-bootstrap';
import { CartContext } from '../../context/cartContext';
import { collection, addDoc, getFirestore, doc, updateDoc, getDoc} from 'firebase/firestore'
 

const CheckOut = () => {
    const { productsInCart } = useContext(CartContext);
    const { EmptyCart } = useContext(CartContext);
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
            //console.log('Response:'+response.id)
            setOrderID(response.id)
        } catch(error) {
            console.log(error)
            setOrderID(0)
        } finally {
            setIsProcessLoading(false)
            updateStock();

            //Achico el stock de cada producto
            //Saco todos los productos del carro
            //EmptyCart();
        }
        //console.log(buyTotalResult)
        
    }
    
    
    

    const updateStock = async () => {
        for (let a = 0; a<productsInCart.length;a++) {
            let productID = productsInCart[a].productID
            let quantity = productsInCart[a].qty
          
            try {
                let docRef = doc(db, "items", productID)
                //updateDoc(docRef, {stock: stock-productsInCart[a].qty})
                const getItemID = await getDoc(docRef)
                const dataResponse = getItemID.data();
                const stock = dataResponse.stock;
                //console.log(stock-quantity)
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
            <Alert variant="success"><h4>Shopping Cart</h4></Alert>
            
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Qty</th><th>Item Description</th><th>Unit Price</th><th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsInCart.length > 0 ?
                        productsInCart.map(({productID,qty,description,price}) => (
                            
                            <tr key={(price*qty)+'-'+price+'-'+qty}>
                                <td>{qty}</td><td>{description}</td><td>${price}</td><td>${price*qty}</td>
                            </tr>
                            
                        ))
                        :
                            <tr><td colSpan={4}>Yor Shopping Cart is Empty</td></tr>
                    }
                    {
                        productsInCart.length > 0 ?
                            <tr >
                                <td colSpan={2}></td><td colSpan={1}><b>Total:</b></td><td colSpan={1}><b>${subtotal}</b></td>
                            </tr>
                            
                        
                        :
                            ""
                    }
                   

                    
                </tbody>
            </Table>


            {
                orderID ?
            
                <Table>
                    <thead>
                        <tr>
                            {
                                orderID!="0" ?
                                    <td><h3>Thanks for your Purchase</h3><br /><h5>Your order number is: {orderID}</h5></td>
                                :
                                    <td><h3>Ooops! There are an error with your order</h3></td>
                            }

                        </tr>
                    </thead>
                </Table>
                :

                <Table>
                {
                    productsInCart.length > 0 ? 
                        <thead>
                            <tr>
                                <th>Name:</th>
                                <th><input type='text' id='name' onChange={(e)=>saveName(e.target.value)}/></th>
                            </tr>
                            <tr>
                                <th>Last Name:</th>
                                <th><input type='text' id='lastName' onChange={(e)=>saveLastName(e.target.value)} /></th>
                            </tr>
                            <tr>
                                <th>E-Mail:</th>
                                <th><input type='text' id='email' onChange={(e)=>saveEmail(e.target.value)} /></th>
                            </tr>
                            <tr>
                                <th>Phone Number:</th>
                                <th><input type='text' id='phone' onChange={(e)=>savePhone(e.target.value)}/></th>
                            </tr>
                            <tr>
                                <th colSpan={2}><Button onClick={buyNow}>Buy NOW!</Button></th>
                                
                            </tr>
                        </thead>
                    :
                    ""
                }
                </Table>

            }



        </div>
    )
}
export default CheckOut;