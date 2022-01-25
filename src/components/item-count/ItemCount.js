import {Button} from 'react-bootstrap'
import { React, useState } from 'react'

const Qty = ({stock,price}) => {
    const [QtyState, SetQtyState] = useState(1);
    const [ShowTotal, SetShowTotal] = useState(price);
    const UpdateQtyPlus = () => {
        if (QtyState+1<=stock) {
            SetQtyState(QtyState+1);
            SetShowTotal(price*(QtyState+1));
        }
    }
    const UpdateQtyMinus = () => {
        if (QtyState-1<=1) {
            SetQtyState(1);
            SetShowTotal(price);
        }else{
            SetQtyState(QtyState-1);
            SetShowTotal(price*(QtyState-1));
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