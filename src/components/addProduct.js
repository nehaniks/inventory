import { useState } from "react";
import { getPId, addNewProduct } from "../services/firebase";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddProduct(props) {
  var pId;

  var [pName, setPName] = useState("");
  var [supplier, setSupplier] = useState("");
  var [rate, setRate] = useState(1);
  var [quantity, setQuantity] = useState(1);
  var [unit, setUnit] = useState("");
  var [cost, setCost] = useState(1);
  var [date, setDate] = useState(new Date());

  async function getProductId() {
    pId = (await getPId()) + 1;
  }

  const handleProductNameChange = (event) => {
    setPName(event.target.value);
  };

  const handleSupplierChange = (event) => {
    setSupplier(event.target.value);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
    setCost(event.target.value * quantity);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    setCost(rate * event.target.value);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

 const allTrim = (phrase) => {
   return phrase.replace(/\s+/g,' ')
   .replace(/^\s+|\s+$/,'');
 }

  async function add() {
    await getProductId();

    addNewProduct(
      pId,
      cost,
      date.toLocaleDateString("en-GB"),
      toTitleCase(allTrim(pName)),
      toTitleCase(allTrim(supplier)),
      rate,
      quantity,
      unit
    );

    props.toggleList(null);
  }

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={() => props.toggleList(null)}>
          x
        </span>
        <h1>Add Product</h1>
        <label className="form-label">Product Name:</label>
        <input
          type="text"
          id="pname"
          className="form-control capitalize"
          value={pName}
          onChange={handleProductNameChange}
        />

        <label className="form-label">Supplier:</label>
        <input
          type="text"
          id="supplier"
          className="form-control capitalize"
          value={supplier}
          onChange={handleSupplierChange}
        />

        <label className="form-label">Rate per unit (Rs.):</label>
        <input
          type="text"
          id="rate"
          className="form-control"
          value={rate}
          onChange={handleRateChange}
        />

        <label className="form-label">Quantity:</label>
        <input
          type="text"
          id="quantity"
          className="form-control"
          value={quantity}
          onChange={handleQuantityChange}
        />

        <label className="form-label">Unit:</label>
        <select
          className="form-select"
          value={unit}
          onChange={handleUnitChange}
        >
          <option value="" readOnly disabled>
            Select unit ...
          </option>
          <option value="nos">nos</option>
          <option value="kg">kg</option>
          <option value="ton">ton</option>
        </select>

        <label className="form-label">Cost (Rs.):</label>
        <input
          type="text"
          id="cost"
          className="form-control"
          value={cost}
          readOnly
        />

        <label className="form-label">Date:</label>
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          name="startDate"
          dateFormat="MM/dd/yyyy"
        />

        <button className="btn btn-primary btn-lg" onClick={() => add()}>
          Add
        </button>
      </div>
    </div>
  );
}
