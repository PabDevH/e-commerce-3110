import { React, useState } from 'react'
import { Alert, Table } from 'react-bootstrap'
import Item from "../item-list-container/Item"
import items from "./Item.json"


export const ItemListContainer = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    
    return (
        <div>
            <Alert variant={selectedItem ? "success" : "danger"}>
                <h1>Selected Product</h1>
                <p>{selectedItem ? selectedItem.name : ""}</p>
            </Alert>
            <hr />
            <h1>Products List</h1>
            <hr />
            {items.map(({ id, name, price, stock}) => (
                <Item key={id} name={name} price={price} stock={stock} setSelectedItem={setSelectedItem} ></Item>
            ))}

        </div>
    )
}

export default ItemListContainer;