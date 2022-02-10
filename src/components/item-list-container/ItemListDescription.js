import { React, useEffect, useState } from 'react'
import { Alert, Table, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Qty from '../item-count/ItemCount';

const Description = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { productID } = useParams();
    const [QtySelected, setQtySelected] = useState(0);
    const [addResult, setAddResult]=useState();
    const [itemsInCart, setItemsInCart]=useState([]);
    const [showAdd, setShowAdd]=useState(true);
    
    const addToCart = () => {
        if (itemsInCart.length==0) {
            setShowAdd(false);
            setItemsInCart([...itemsInCart,{"productID":productID,"qty":QtySelected}])
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            },1)
            setAddResult('You added '+QtySelected+' items from this NFT to your Shopping Cart');
        }else{
            setAddResult('Already in your shopping cart');
        }
    }
    console.log(itemsInCart);

    useEffect(() => {
        APIProductsList();
    },[]);

    

    const APIProductsList = async () => {
        try {
            const response = await fetch("http://localhost:3000/item.json");
            console.log(response);
            const data = await response.json();
            setProducts(data);
        } catch(error) {
            console.log('No se pudieron traer los productos');
        } finally {
            setTimeout(() => {
                setLoading(false);
            },2000)
        }
    };
    
    const filterProducts = products.filter(({ id }) => id === productID);

    if (loading) return <div><img src='/loading.gif' title='Loading....' width={150} height={150} alt='Loading' /></div>

    
    
    return (
        <div>
            <Alert variant={productID ? "success" : "danger"}>
                
                        
                            {
                                filterProducts.map(({id,name,price,stock,description, image, category}) => (
                                    <Table key={id} striped bordered hover >
                                        <tbody>
                                            <tr>
                                                <td colSpan={3}>
                                                    <h4>{name}</h4>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowSpan={6}>
                                                    <img src={image} alt="NFT" width={350} height={500} />
                                                </td>
                                                <td>Category: </td><td>{category}</td>
                                                
                                            </tr>
                                            <tr>
                                                <td>Descripcion: </td><td>{description}</td>
                                            </tr>
                                            <tr>
                                                <td>Price: </td><td>${price}</td>
                                            </tr>
                                            <tr>
                                                <td>Available Stock: </td><td>{stock}</td>
                                            </tr>
                                            {showAdd ? 
                                            <tr>
                                                <td>Quantity</td><td><Qty id={id} stock={stock} price={price} setQtySelected={setQtySelected} /></td>
                                            </tr>
                                            : <tr>
                                                <td colSpan={2} ><b>{addResult}</b><br /></td>
                                            </tr> }
                                            {showAdd ? 
                                            <tr>
                                                <td colSpan={2}><Button variant="warning" onClick={addToCart} >Add to Cart</Button></td>
                                            </tr>
                                            : 
                                            <tr>
                                                <td colSpan={2}><Button variant="warning" href="/cart">Go to Cart</Button>&nbsp;<Button variant="warning" href="/">Continue Shopping</Button></td>
                                            </tr>
                                            }
                                        </tbody>
                                    </Table>
                                    
                                    
                                    
                                ))
                            }
                        
                       
                
            </Alert>
            
        </div>
    )
    
}
export default Description;