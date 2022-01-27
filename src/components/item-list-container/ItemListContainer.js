import { React, useState } from 'react'
import { Alert, Table } from 'react-bootstrap'
import Item from "../item-list-container/Item"
//import items from "./Item.json"
import {APIProductsList} from '../../helpers/promises'

export const ItemListContainer = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    APIProductsList.then(
        (result) => {
            setProducts(result);
        },
        (error) => {
            console.log('Error Loading Products');
        }
    ).finally(
        () => {
            setLoading(false);
        }
    )

    if (loading) {
        return <div>Cargando....</div>
    }
    
    return (
        <div>
            <Alert variant={selectedItem ? "success" : "danger"}>
                <h1>Selected Product</h1>
                <p>{selectedItem ? selectedItem.name : ""}</p>
                <p>STOCK seleccionado: {selectedItem && selectedItem.qty}</p>
            </Alert>
            <hr />
            <h1>Products List</h1>
            <hr />
            {
                products.map(({id,name,price,stock,description}) => (
                    <Item key={id} name={name} price={price} stock={stock} description={description} setSelectedItem={setSelectedItem} ></Item>
                   ))
            }
            <hr />
            
            

        </div>
    )
}

export default ItemListContainer;