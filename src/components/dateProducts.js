import { getProductsOnDate } from "../services/firebase";
import { useEffect, useState } from "react";
import Table from "./table";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateProducts() {
  var [products, setProducts] = useState(0);
  var [queryDate, setQueryDate] = useState(new Date());

  async function getProductsList() {
    setProducts(
      await getProductsOnDate(queryDate.toLocaleDateString("en-GB")).then(
        (data) => {
          return data;
        }
      )
    );
  }

  const handleDateChange = (value) => {
    setQueryDate(value);
  };

  useEffect(() => {
    getProductsList();
  }, [products]);

  return (
    <div>
      <label className="form-label">Select Date:</label>
      <DatePicker
        selected={queryDate}
        onChange={handleDateChange}
        name="startDate"
        dateFormat="MM/dd/yyyy"
      />
      <Table products={products} />
    </div>
  );
}
