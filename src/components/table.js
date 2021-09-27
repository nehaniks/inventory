import { useState } from "react";
import { deleteProduct } from "../services/firebase";
import EditProduct from "./editProduct";

export default function Table(props) {
  var [product, setProduct] = useState(null)

  async function remove(pId) {
    deleteProduct(pId);
  }

  const edit = (prod) => {
    setProduct(prod)
  }

  if (product !== null) {
    return <EditProduct product={product} toggleEdit={setProduct} />;
  }

  return (
    <div>
      {props.products === 0 ? (
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
            {props.products.map((product) => {
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
                      className="btn btn-danger"
                      onClick={() => remove(product.PId)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => edit(product)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
