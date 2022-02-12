import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Routes from "./routes/routes";
import CartProvider from "./context/cartContext";

function App() {
  return (
    <div className="App">
        <CartProvider>
          <Routes></Routes>
        </CartProvider>
    </div>
  );
}

export default App;
