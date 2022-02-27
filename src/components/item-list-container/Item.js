import {Button, Table} from 'react-bootstrap'

import {useState} from 'react';
import { Link, NavLink } from "react-router-dom";
 
const Item = ({id, name, price, stock , description, setSelectedItem}) => {
    const [QtySelected, setQtySelected] = useState(0);
    const selectItem = () => {
        setSelectedItem({ name, price, id, stock, description, qty: QtySelected });
    }
    return (
        <div >
                <h3>{name}</h3>
                <h6>Price: ${price}</h6>
                <h6>Stock: {stock}</h6>
                <img width='150' height='150' src='/images/pack.png' /><br /><br />
                <Link to={"/item/"+id}><Button variant='primary'>Show More Info</Button></Link>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
        </div>
    );
}
export default Item;