import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import NavBar from "./components/NavBar";
import ItemListContainer from './components/item-list-container/ItemListContainer'


function App() {
  
  return (
    <div className="App">
      <NavBar />
      <h1>Outlander NFT</h1>
      <ItemListContainer />
    </div>
  );
}

export default App;
