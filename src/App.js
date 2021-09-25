import "./App.css";
import ProductsList from "./components/productsList";
// import AddProduct from "./components/addProduct";

function App() {
  return (
    <div className="App">
      <h1>Products List</h1>
      <ProductsList />
      {/* <AddProduct /> */}
    </div>
  );
}

export default App;
