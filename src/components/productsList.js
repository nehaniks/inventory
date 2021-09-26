import {
  getProducts,
  getProductsOnDate,
  deleteProduct,
} from "../services/firebase";
import { getProductsTotal } from "../services/getTotal";
import { useEffect, useState } from "react";
import AddProduct from "./addProduct";
import Table from "./table";

export default function ProductsList() {
  var [products, setProducts] = useState(0);
  var [addProduct, setAddProduct] = useState(null);

  var [totalProducts, setTotalProducts] = useState(0);

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
    setTotalProducts(
      await getProductsTotal(products).then((data) => {
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
    console.log(totalProducts);
  }, []);

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
            // <Table products={products} />
            <table className="table table-hover table-responsive">
              <thead className="table-secondary">
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Cost</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(totalProducts).map((product, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{product.ProductName}</th>
                      <td>{product.Quantity}</td>
                      <td>{product.Cost}</td>
                      {/* <td>
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
                      </td> */}
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
