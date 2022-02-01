import {Button} from 'react-bootstrap'
import Qty from '../item-count/ItemCount'
import {useState} from 'react';

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
                <Qty id={id} stock={stock} price={price} setQtySelected={setQtySelected} />
                <h4>Available {stock} NFT</h4>
                <Button variant='primary' onClick={selectItem}>Show More Info</Button>
                <hr />
        </div>
    );
}
export default Item;