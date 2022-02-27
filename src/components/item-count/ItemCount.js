import {Button} from 'react-bootstrap'
import { React, useState, useEffect} from 'react'
import CartStyle from "../../css/CartStyle.css"
const Qty = ({stock, price, setQtySelected }) => {
    const [QtyState, SetQtyState] = useState(1); 
    useEffect(() => {
        setQtySelected(QtyState);
      }, [QtyState]);

    const UpdateQtyPlus = () => {
        if (QtyState+1<=stock) {
            SetQtyState(QtyState+1);
            
        }
    }
    const UpdateQtyMinus = () => {
        if (QtyState-1<=1) {
            SetQtyState(1);
            
        }else{
            SetQtyState(QtyState-1);
           
        }
    }

    return (
        <div>
            <Button variant="danger" onClick={UpdateQtyMinus} className="icon-minus" />&nbsp;<Button variant="light">{QtyState}</Button>&nbsp;<Button variant="success"  onClick={UpdateQtyPlus} className="icon-plus" />
        </div>
    )
}
export default Qty;