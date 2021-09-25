import { getProducts, deleteProduct } from "../services/firebase";
import { useEffect, useState } from "react";
import AddProduct from "./addProduct";

export default function ProductsList() {
  // var products = [];
  var [products, setProducts] = useState(0);
  var [addProduct, setAddProduct] = useState(null);

  const productObj = {
    Cost: 1,
    Date: "",
    ProductName: "",
    Quantity: 1,
    Rate: 1,
    Supplier: "",
    Unit: "",
  };

  async function getProductsList() {
    setProducts(
      await getProducts().then((data) => {
        return data;
      })
    );
  }

  async function remove(pId) {
    deleteProduct(pId);
    getProductsList(); // Maybe not needed CHECK AGAIN!!!!!!!!!!!!!!!
    console.log(products);
  }

  useEffect(() => {
    getProductsList();
  }, [products]);

  return (
    <div>
      {addProduct === null ? (
        <>
          <h1>Products Table</h1>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setAddProduct(productObj)}
          >
            Add New Product
          </button>
          {products === 0 ? (
            <div>No Products to Show</div>
          ) : (
            <table className="table table-hover table-responsive">
              <thead className="table-secondary">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Supplier</th>
                  <th scope="col">Rate per unit</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product.PId}>
                      <th scope="row">{product.PId}</th>
                      <td>{product.ProductName}</td>
                      <td>{product.Supplier}</td>
                      <td>{product.Rate}</td>
                      <td>{product.Quantity}</td>
                      <td>{product.Unit}</td>
                      <td>{product.Cost}</td>
                      <td>{product.Date}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => setAddProduct(products[product.PId])}
                        >
                          Add
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => remove(product.PId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <AddProduct product={addProduct} toggleList={setAddProduct} />
      )}
    </div>
  );
}
