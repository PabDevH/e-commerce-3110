import { React, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Item from "../item-list-container/Item"
import { useParams } from 'react-router-dom'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

export const ItemListContainer = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryID } = useParams();
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
           
            
            <Table responsive>
                <thead>
                    <tr>
                        <td><h1>Products List {categoryID}</h1></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        {
                            !categoryID &&
                            products.map(({id,name,price,stock,description}) => (
                                <Item key={id} id={id} name={name} price={price} stock={stock} description={description} setSelectedItem={setSelectedItem} ></Item>
                            ))
                        }
                        {
                            categoryID &&
                            filterProducts.map(({id,name,price,stock,description}) => (
                                <Item key={id} id={id} name={name} price={price} stock={stock} description={description} setSelectedItem={setSelectedItem} ></Item>
                            ))
                        }
                        </td>
                    </tr>
                </tbody>
            </Table>
            

        </div>
    )
}

export default ItemListContainer;