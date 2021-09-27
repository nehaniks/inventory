import { getProducts, getTotal } from "../services/firebase";
import { useEffect, useState } from "react";
import AddProduct from "./addProduct";
import ProductByName from "./productByName";
import ProductBySupplier from "./productBySupplier";
import DateProducts from "./dateProducts"

export default function ProductsList() {
  var [products, setProducts] = useState(0);
  var [addProduct, setAddProduct] = useState(null);
  var [prodName, setProdName] = useState("");
  var [showSupp, setShowSupp]= useState(false)
  var [showDate, setShowDate]= useState(false)

  var [total, setTotal] = useState(0);

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
    setTotal(
      await getTotal(products).then((data) => {
        return data;
      })
    )
  }

  const showProductByName = (pname) => {
    setProdName(pname);
  };

  useEffect(() => {
    getProductsList();
  }, [products]);

  if (prodName !== "") {
    return <ProductByName productName={prodName} toggleProductName={setProdName} />;
  }

  if (showSupp) {
    return <ProductBySupplier toggleSupplier={setShowSupp} />;
  }

  if (showDate) {
    return <DateProducts toggleDate={setShowDate} />;
  }

  return (
    <div>
      {addProduct === null ? (
        <>
        <div className="header-bar">
          <button
            className="btn btn-primary btn-md"
            onClick={() => setAddProduct(productObj)}
          >
            Add New Product
          </button>

          <button
            className="btn btn-primary btn-md"
            onClick={() => setShowSupp(true)}
          >
            View Products By Supplier
          </button>

          <button
            className="btn btn-primary btn-md"
            onClick={() => setShowDate(true)}
          >
            View Products By Date
          </button>

          <span>Total Cost: {total[1]}</span>
          </div>
          {products === 0 ? (
            <div>No Products to Show</div>
          ) : (
            <table className="table table-hover table-responsive container-md">
              <thead className="table-secondary">
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Cost</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(products).map((product, index) => {
                  return (
                    <tr key={index}>
                      <th
                        scope="row"
                        className="select"
                        onClick={() => showProductByName(product.ProductName)}
                      >
                        {product.ProductName}
                      </th>
                      <td>{product.Quantity}</td>
                      <td>{product.Cost}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <AddProduct toggleList={setAddProduct} />
      )}
    </div>
  );
}
