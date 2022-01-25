import {Button} from 'react-bootstrap'
import Qty from '../item-count/ItemCount'

const Item = ({id, name, price, stock , setSelectedItem}) => {
    const selectItem = () => {
        setSelectedItem({ name, price, id, stock });
    }
    return (
        <div>
                <h3>{name}</h3>
                <img width='300' height='300' src='https://user-dashboard.s3.us-east-2.amazonaws.com/nft-metadata/bsc/0x1ddcd5b73afb734b4ae6b1c139858f36311ed4d3/0.png' />
                <h4>Price: $ {price}</h4>
                <Qty id={id} stock={stock} price={price} />
                <h4>Available {stock} NFT</h4>
                <Button variant='primary' onClick={selectItem}>Select this Product</Button>
                <hr />
        </div>
    );
}
export default Item;