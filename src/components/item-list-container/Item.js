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
                
                <img width='150' height='150' src='https://user-dashboard.s3.us-east-2.amazonaws.com/nft-metadata/bsc/0x1ddcd5b73afb734b4ae6b1c139858f36311ed4d3/0.png' />
                <h4>Price: $ {price}</h4>
                <h4>Available {stock} NFT</h4>
                <Link to={"/item/"+id}><Button variant='primary'>Show More Info</Button></Link>
                <hr />
        </div>
    );
}
export default Item;