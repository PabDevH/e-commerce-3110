import {Button} from 'react-bootstrap'
import { React, useState, useEffect} from 'react'

const Qty = ({stock, price, setQtySelected }) => {
    const [QtyState, SetQtyState] = useState(1);
    const [ShowTotal, SetShowTotal] = useState(price);
    
    useEffect(() => {
        setQtySelected(QtyState);
      }, [QtyState]);

    const UpdateQtyPlus = () => {
        if (QtyState+1<=stock) {
            SetQtyState(QtyState+1);
            SetShowTotal((price*(QtyState+1)).toFixed(2));
        }
    }
    const UpdateQtyMinus = () => {
        if (QtyState-1<=1) {
            SetQtyState(1);
            SetShowTotal(price);
        }else{
            SetQtyState(QtyState-1);
            SetShowTotal((price*(QtyState-1)).toFixed(2));
        }
    }

    return (
        <div>
            <Button variant="secondary" onClick={UpdateQtyMinus} >-</Button>&nbsp;{QtyState}&nbsp;<Button variant="secondary"  onClick={UpdateQtyPlus}>+</Button>
            <h3>Grand Total ${ShowTotal} </h3>
        </div>
    )
}
export default Qty;