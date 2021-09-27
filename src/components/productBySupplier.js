import { getSuppliersByName, getSuppliersNameList, getTotal } from "../services/firebase";
import { useEffect, useState } from "react";
import Table from "./table";

export default function ProductBySupplier(props){
    var [products, setProducts] = useState(0);
    var [suppName, setSuppName] = useState("");
    var [suppList, setSuppList] = useState(0)
    var [total, setTotal] = useState(0);
  
    async function getProductsList() {
        setSuppList(
            await getSuppliersNameList().then(
                (data) => {
                    return data
                }
            )
        )

      setProducts(
        await getSuppliersByName(suppName).then(
          (data) => {
            return data;
          }
        )
      );
      setTotal(
        await getTotal(products).then((data) => {
          return data;
        })
      )
    }
  
    const handleNameChange = () => {
      setSuppName(document.getElementById("nameField").value);
      getProductsList();
    };
  
    useEffect(() => {   
      getProductsList();

    },[products]);
  
    return (
      <div>
        <div className="header-bar">
        <label className="form-label">Select Name:</label>
        <select
        id="nameField"
          className="form-select"
          onChange={handleNameChange}
        >
            {Array.from(suppList).map((supp, index) => {
                return (
                    <option key={index} value={supp} >{supp}</option>
                )
            })}
        </select>
        <button  className="btn btn-primary btn-md" onClick={()=>props.toggleSupplier(false)}>Back</button>
        <span>Total Cost: {total[1]}</span>
        </div>

        <Table products={products} />
      </div>
    )
}