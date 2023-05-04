import { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import DatePicker from 'react-datepicker';

const EditItem = ({ item, id }) => {
  const [updateItem, setUpdateItem] = useState({ name: item.name, qty: item.qty, units: item.units, location: item.location})
  const [createDate, setCreateDate] = useState(new Date());
  const handleEditChange = (e) => {
    setUpdateItem({ ...updateItem, [e.target.name]: e.target.value });
  };
  const handleDate = (date) => {
    setCreateDate(date)
  };
  const handleSubmitUpdate = (e) => {
    e.preventDefault()
    const itemDocument = doc(db, "items", id);
    updateDoc(itemDocument, {
      name: updateItem.name,
      qty: updateItem.qty,
      units: updateItem.units,
      location: updateItem.location,
      expires: createDate
    });
  }
  const handleSubmitInventory = (e) => {
    const itemDocument = doc(db, "items", id);
    updateDoc(itemDocument, {
      name: updateItem.name,
      qty: updateItem.qty,
      units: updateItem.units,
      location: updateItem.location,
      expires: createDate,
      list: false,
      inventory: true
    });
  }
  return (
    <>
      <button type="button" className="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target={`#id${id}`}>Edit</button>
      <div className="modal fade" id={`id${id}`} tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form className="d-flex" onSubmit={(e) => handleSubmitUpdate(e)}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">Edit Item</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Name:</label>
                <input className="form-control" type="text" name="name" value={updateItem.name} onChange={handleEditChange} /> 

                <label className="form-label">Quantity:</label>
                <input className="form-control" type="number" name="qty" step=".01" value={updateItem.qty} onChange={handleEditChange} />

                <label className="form-label">Units:</label>
                <input className="form-control" type="text" name="units" value={updateItem.units} onChange={handleEditChange} />

                <label className="form-label">Location:</label>
                <input className="form-control" type="text" name="location" value={updateItem.location} onChange={handleEditChange} />

                <label className="form-label">Expiration Date:</label>
                <DatePicker className="form-control" selected={createDate} onChange={handleDate} name="expires" />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-info" data-bs-dismiss="modal">Update</button>                
                {String(item.list) === 'true' ? (
                  <p><button type="button" className="btn btn-primary" onClick={(e) => handleSubmitInventory(e)} data-bs-dismiss="modal">Update & Receive</button></p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditItem;