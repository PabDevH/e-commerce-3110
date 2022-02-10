import {Button} from 'react-bootstrap'
import { React, useState, useEffect} from 'react'

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
            <Button variant="secondary" onClick={UpdateQtyMinus} >-</Button>&nbsp;{QtyState}&nbsp;<Button variant="secondary"  onClick={UpdateQtyPlus}>+</Button>
        </div>
    )
}
export default Qty;