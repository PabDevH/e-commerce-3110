import { React, useContext, useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useParams,NavLink } from 'react-router-dom';
import Qty from '../item-count/ItemCount';
import { CartContext } from '../../context/cartContext';
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import CartStyle from "../../css/CartStyle.css"

const Description = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { productID } = useParams();
    const [QtySelected, setQtySelected] = useState(0);
    const [addResult, setAddResult]=useState();
    const [showAdd, setShowAdd]=useState(true);
    const [variantQuantity, setVarianQuantity]=useState("secondary");
    const { AddProductsToCart } = useContext(CartContext);
    const { productsInCart } = useContext(CartContext);
    const db = getFirestore();
    
    const addToCart = (e) => {
        const selDescription = e.currentTarget.getAttribute("description");
        const selPrice = e.currentTarget.getAttribute("price");
        
        if (productsInCart.some(item => item.productID === productID)) {
            setAddResult('Already in your shopping cart');
            setShowAdd(false);
        }else{
            setShowAdd(false);
            AddProductsToCart( {"productID": productID, "qty": QtySelected,"description":selDescription, "price": selPrice })
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            },1)
            setAddResult('You added '+QtySelected+' items from this NFT to your Shopping Cart');
        }
    }
    
    useEffect(() => {
        APIProductsList();
    },[]);

    useEffect(() => {
        if (QtySelected % 2 === 0) {
            setVarianQuantity("dark")
        }else{
            setVarianQuantity("secondary")
        }
    },[QtySelected])

    const APIProductsList = async () => {
        try {
            const itemsCollection = collection(db, "items");
            const response = await getDocs(itemsCollection)
            setProducts(response.docs.map((doc) => ({id: doc.id,...doc.data()})))
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };
    
    const filterProducts = products.filter(({ id }) => id === productID);

    if (loading) return <div><img src='/loading.gif' title='Loading....' width={150} height={150} alt='Loading' /></div>

    return (
        <div>
            <div className="container">
                <div className="table-responsive custom-table-responsive">
                    <Alert variant="success">
                        {
                        filterProducts.map(({id,name,price,stock,description, image, category}) => (
                            <table key={id} className="table custom-table" > 
                                <thead>
                                    <tr >
                                        <td colSpan={3}>
                                            <h4>{name}</h4>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowSpan={6}>
                                            <img src={image} alt="NFT" width={450} height={500} />
                                        </td>
                                        <td className="align-middle"><Alert variant="primary">Category</Alert></td><td className="align-middle" ><Alert variant="secondary">{category}</Alert></td>
                                    </tr>
                                    
                                    <tr>
                                        <td className="align-middle"><Alert variant="primary">Description</Alert> </td><td className="align-middle"><Alert variant="secondary">{description}</Alert></td>
                                    </tr>
                                    <tr>
                                        <td className="align-middle"><Alert variant="primary">Price:</Alert> </td><td className="align-middle"><Alert variant="secondary">${price}</Alert></td>
                                    </tr>
                                    <tr>
                                        <td className="align-middle"><Alert variant="primary">Remaining Stock:</Alert> </td><td className="align-middle"><Alert variant={variantQuantity}>{stock-QtySelected}</Alert></td>
                                    </tr>
                                    {showAdd ? 
                                    <tr>
                                        <td className="align-middle"><Alert variant="warning">Quantity</Alert></td><td className="align-middle"><Alert variant="light"><Qty id={id} stock={stock} price={price} setQtySelected={setQtySelected} /></Alert></td>
                                    </tr>
                                    : <tr>
                                        <td className="align-middle" colSpan={2} ><b>{addResult}</b><br /></td>
                                    </tr> }
                                    {showAdd ? 
                                    <tr>
                                        <td className="align-middle" colSpan={2}><Button variant="primary" onClick={addToCart} description={description} price={price} className="icon-shopping-cart">&nbsp;Add to Cart</Button></td>
                                    </tr>
                                    : 
                                    <tr>
                                        <td className="align-middle" colSpan={2}><NavLink to="/cart"><Button variant="warning">Go to Cart</Button></NavLink>&nbsp;<NavLink to="/"><Button variant="warning">Continue Shopping</Button></NavLink></td>
                                    </tr>
                                    }
                                </tbody>
                            </table>
                            
                        ))
                    }
                    </Alert>
                </div>
            </div>
        </div>
    )
    
}
export default Description;