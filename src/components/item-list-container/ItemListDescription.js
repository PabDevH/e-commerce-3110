import { React, useEffect, useState } from 'react'
import { Alert, Table } from 'react-bootstrap'

const Description = ({searchID}) => {
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
    
    if (loading) return <div><img src='loading.gif' title='Loading....' width={150} height={150} alt='Loading' /></div>

    
    
    return (
        <div>
            <Alert variant={searchID ? "success" : "danger"}>
                
                        
                            {
                                products.map(({id,name,price,stock,description}) => (
                                    id==searchID ?
                                    <div key={id}><h3>Name: {name}</h3><h5>Description: {description}</h5><h5>Price: $ {price}</h5></div>
                                    :
                                    ""
                                ))
                            }
                        
                       
                
            </Alert>
        </div>
    )
    
}
export default Description;