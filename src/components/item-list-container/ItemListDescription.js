import { React, useEffect, useState } from 'react'
import { Alert, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

const Description = ({}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { productID } = useParams();
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
                                        <tr>
                                            <td colspan={3}>
                                                <h4>{name}</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td rowspan={4}>
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

                                    </Table>
                                    
                                    
                                ))
                            }
                        
                       
                
            </Alert>
        </div>
    )
    
}
export default Description;