import { getProductsOnDate, getTotal } from "../services/firebase";
import { useEffect, useState } from "react";
import Table from "./table";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateProducts(props) {
  var [products, setProducts] = useState(0);
  var [queryDate, setQueryDate] = useState(new Date());
  var [total, setTotal] = useState(0);

  async function getProductsList() {
    setProducts(
      await getProductsOnDate(queryDate.toLocaleDateString("en-GB")).then(
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

  const handleDateChange = (value) => {
    setQueryDate(value);
    // getProductsList();
  };

  useEffect(() => {
    getProductsList();

  });

  return (
    <div>
      <div className="header-bar">
        <label className="form-label">Select Date:</label>
        <DatePicker
          selected={queryDate}
          onChange={handleDateChange}
          name="startDate"
          dateFormat="MM/dd/yyyy"
        />
        <button className="btn btn-primary btn-md" onClick={()=>props.toggleDate(false)}>Back</button>
        <span>Total Cost: {total[1]}</span>
      </div>

      <Table products={products} />
    </div>
  );
}
