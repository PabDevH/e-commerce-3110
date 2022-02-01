import { React, useEffect, useState } from 'react'
import { Alert, Table } from 'react-bootstrap'
import Item from "../item-list-container/Item"
import Description from "./ItemListDescription"

export const ItemListContainer = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        APIProductsList();
    },[]);


    const APIProductsList = async () => {
        try {
            const response = await fetch("./Item.json");
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

    

    if (loading) {
        return <div><img src='loading.gif' title='Loading....' /></div>
    }
    
    return (
        <div>
            {
                selectedItem ? <Description searchID={selectedItem.id}/> : ""
            }
            
            <Table responsive>
                <thead>
                    <tr>
                        <td><h1>Products List</h1></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        {
                            products.map(({id,name,price,stock,description}) => (
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