import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import DatePicker from 'react-datepicker';

const AddInventory= () => {
  const [createItem, setCreateItem] = useState({ name: "", qty: "", units: "", location: "" });
  const [createDate, setCreateDate] = useState(new Date());

  const handleChange = (e) => {
    setCreateItem({ ...createItem, [e.target.name]: e.target.value });
  };
  const handleDate = (date) => {
    setCreateDate(date)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "items"), {
      name: createItem.name,
      qty: createItem.qty,
      units: createItem.units,
      location: createItem.location,
      expires: createDate,
      inventory: true,
      list: false
    });
    setCreateItem({ name: "", qty: "", units: "", location: "" });
    setCreateDate("");
  };
  return (
    <>
      <button data-bs-toggle="modal" data-bs-target="#addModal" type="button" className="btn btn-dark btn-sm float-end">Add Inventory</button>
      <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form className="d-flex" onSubmit={(e) => handleSubmit(e)}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">Add Inventory</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Name:</label>
                <input className="form-control" type="text" name="name" value={createItem.name} onChange={handleChange} />

                <label className="form-label">Quantity:</label>
                <input className="form-control" type="number" name="qty" step=".01" value={createItem.qty} onChange={handleChange} />

                <label className="form-label">Units:</label>
                <input className="form-control" type="text" name="units" value={createItem.units} onChange={handleChange} />

                <label className="form-label">Location:</label>
                <input className="form-control" type="text" name="location" value={createItem.location} onChange={handleChange} />

                <label className="form-label">Expiration Date:</label>
                <DatePicker className="form-control" selected={createDate} onChange={handleDate} name="expires" />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddInventory;