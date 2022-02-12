import {Button} from 'react-bootstrap'

import {useState} from 'react';
import { Link, NavLink } from "react-router-dom";
 
const Item = ({id, name, price, stock , description, setSelectedItem}) => {
    const [QtySelected, setQtySelected] = useState(0);
    const selectItem = () => {
        setSelectedItem({ name, price, id, stock, description, qty: QtySelected });
    }
    return (
        <div>
                <h3>{name}</h3>
                
                <img width='150' height='150' src='/images/pack.png' />
                <h4>Price: $ {price}</h4>
                <h4>Available {stock} NFT</h4>
                <Link to={"/item/"+id}><Button variant='primary'>Show More Info</Button></Link>
                <hr />
        </div>
    );
}
export default Item;