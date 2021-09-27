import { getProductsByName, getProductsNameList, getTotal } from "../services/firebase";
import { useEffect, useState } from "react";
import Table from "./table";

export default function ProductByName(props){
    var [products, setProducts] = useState(0);
    var [prodName, setProdName] = useState(props.productName);
    var [nameList, setNameList] = useState(0)
    var [total, setTotal] = useState(0);
  
    async function getProductsList() {
      setProducts(
        await getProductsByName(prodName).then(
          (data) => {
            return data;
          }
        )
      );
      setNameList(
          await getProductsNameList().then(
              (data) => {
                  return data
              }
          )
      )
      setTotal(
        await getTotal(products).then((data) => {
          return data;
        })
      )
    }
  
    const handleNameChange = () => {
      setProdName(document.getElementById("nameField").value);
      getProductsList();
    };
  
    useEffect(() => {   
      getProductsList();

    });
  
    return (
      <div>
        <div className="header-bar">
        <label className="form-label">Select Name:</label>
        <select
        id="nameField"
          className="form-select"
          onChange={handleNameChange}
        >
            {Array.from(nameList).map((name, index) => {
                return (
                    <option key={index} value={name} >{name}</option>
                )
            })}
        </select>
        <button  className="btn btn-primary btn-md" onClick={()=>props.toggleProductName("")}>Back</button>
        <span>Total Quantity: {total[0]}</span>
        <span>Total Cost: {total[1]}</span>
        </div>

        <Table products={products} />
      </div>
    )
}