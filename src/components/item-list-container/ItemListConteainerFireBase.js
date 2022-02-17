import { React, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Item from "../item-list-container/Item"
//import Description from "./ItemListDescription"
import { useParams } from 'react-router-dom'
import { doc, getDoc, getDocs, collection, getFirestore } from 'firebase/firestore'

export const ItemListContainerFireBase = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryID } = useParams();

    useEffect(() => {
        //APIProductsList();
        const db = getFirestore();
        const itemCollections = collection(db, "items");
        console.log(itemCollections)
        getDocs(itemCollections).then((snapshot) => {
            snapshot.docs.map(({doc}) => (
                setProducts(...doc.data())
            ))
        })
    },[]);

   



    const filterProducts = products.filter(({ category }) => category === categoryID);
    
    if (loading) {
        return <div><img src='/loading.gif' title='Loading....' /></div>
    }
  
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

export default ItemListContainerFireBase;