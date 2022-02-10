import { React, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Item from "../item-list-container/Item"
//import Description from "./ItemListDescription"
import { useParams } from 'react-router-dom'

export const ItemListContainer = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryID } = useParams();

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

export default ItemListContainer;