import React from 'react';
import { BrowserRouter, Route, Routes as Switch} from 'react-router-dom';
import NavBar from '../components/NavBar'
import ItemListContainer from '../components/item-list-container/ItemListContainer'
import ShoppingCart from '../components/shopping-cart/ShoppingCart';
import Description from '../components/item-list-container/ItemListDescription';

//import ItemListContainerFireBase from '../components/item-list-container/ItemListConteainerFireBase';
const Routes = () => {
    return (
        <BrowserRouter>
        <NavBar />
        <Switch>
            <Route path="/" element={< ItemListContainer />} />
            <Route path="/cart" element={< ShoppingCart />} />
            <Route path="/item/:productID" element={< Description />} />
            <Route path="/categories/:categoryID" element={< ItemListContainer />} />
        </Switch>
        </BrowserRouter>
    )
}
export default Routes;