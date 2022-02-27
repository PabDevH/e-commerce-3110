import { React, useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import Item from "../item-list-container/Item"
import { useParams } from 'react-router-dom'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { Alert } from 'react-bootstrap'
export const ItemListContainer = () => {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryID } = useParams();
    
    const db = getFirestore();
    

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
    
    useEffect(() => {
        APIProductsList();
    },[]);
    if (loading) {
        return <div><img src='/loading.gif' title='Loading....' alt='Loading...'/></div>
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
                    <Carousel.Item interval={2000} key={id}>
                        
                        <Carousel.Caption>
                            <h4>{description}</h4>
                        </Carousel.Caption>
                        <Item key={id} id={id} name={name} price={price} stock={stock} description={description}  ></Item>
                    </Carousel.Item>
                ))
                :
                filterProducts.map(({id,name,price,stock,description}) => (
                    <Carousel.Item interval={2000} key={id}>
                        
                        <Carousel.Caption>
                            <h4>{description}</h4>
                        </Carousel.Caption>
                        <Item key={id} id={id} name={name} price={price} stock={stock} description={description} ></Item>
                    </Carousel.Item>
                ))
            }
        </Carousel>
        </div>
    )
}

export default ItemListContainer;