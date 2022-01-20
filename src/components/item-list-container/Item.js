import {Button} from 'react-bootstrap'
const Item = ({id, name, price, setSelectedItem}) => {
    const selectItem = () => setSelectedItem({ name, price, id });
    return (
        <div>
                <h1>{name}</h1>
                <h3>Price: {price}</h3>
                <Button variant='primary' onClick={selectItem}>Select this Product</Button>
                <hr />
        </div>
    );
}
export default Item;