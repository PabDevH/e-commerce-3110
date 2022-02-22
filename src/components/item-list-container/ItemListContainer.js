import { React, useEffect, useState } from 'react'
import { Table, Carousel } from 'react-bootstrap'
import Item from "../item-list-container/Item"
import { useParams } from 'react-router-dom'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { Alert } from 'react-bootstrap'
export const ItemListContainer = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryID } = useParams();
    const [count,setCount]=useState(0);
    let tmpCount = 0;
    const db = getFirestore();
    useEffect(() => {
        APIProductsList();
    },[]);

   const APIProductsList = async () => {
        /*try {
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
        }*/
        
        try {
            const itemsCollection = collection(db, "items");
            const response = await getDocs(itemsCollection)
            console.log(response)
            setProducts(response.docs.map((doc) => ({id: doc.id,...doc.data()})))
            setCount(response.docs.length);
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
        
    };

    if (loading) {
        return <div><img src='/loading.gif' title='Loading....' /></div>
    }

    const filterProducts = products.filter(({ category }) => category === categoryID);
    
    
  
    return (
        <div>
        <Alert variant='primary'>
            <h3>Products List</h3>  
            {
                categoryID
                ?
                <h5 style={{'color': 'black'}}>Category: {categoryID}</h5>
                :
                ""
            }
        </Alert>
      
        <Carousel fade variant='dark'>
            {
                !categoryID ?
                products.map(({id,name,price,stock,description}) => (
                    <Carousel.Item interval={2000}>
                        
                        <Carousel.Caption>
                            <h4>{description}</h4>
                        </Carousel.Caption>
                        <Item key={id} id={id} name={name} price={price} stock={stock} description={description} setSelectedItem={setSelectedItem} ></Item>
                    </Carousel.Item>
                ))
                :
                filterProducts.map(({id,name,price,stock,description}) => (
                    <Carousel.Item interval={2000}>
                        
                        <Carousel.Caption>
                            <h4>{description}</h4>
                        </Carousel.Caption>
                        <Item key={id} id={id} name={name} price={price} stock={stock} description={description} setSelectedItem={setSelectedItem} ></Item>
                    </Carousel.Item>
                ))
            }
        </Carousel>
        </div>
    )
}

export default ItemListContainer;