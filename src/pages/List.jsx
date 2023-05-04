import { useEffect, useState } from "react";
import { query, collection, where, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import * as Icon from 'react-bootstrap-icons';
import AddList from "../components/AddList";
import EditItem from "../components/EditItem";
const List = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("list", "==", true));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let items = [];
      QuerySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setItems(items);
    });
    return () => unsubscribe;
  }, []);

  const addInventory = (id) => {
    const itemDocument = doc(db, "items", id);
    updateDoc(itemDocument, {
      inventory: true,
      list: false
    });
  }
  const deleteItem = (id) => {
    const documentRef = doc(db, "items", id);
    deleteDoc(documentRef)
  }

  return (
      <div className="container">
      <div><h3 className="float-start">Shopping List</h3>  <AddList /></div>
      <table className="table caption-top">
        <caption>Items in Shopping List. Check item under "Inventory" to quickly receive into inventory. Edit to update all fields before receiving.</caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col" className="text-center">Qty</th>
              <th scope="col">Units</th>
              <th scope="col" className="text-center">Manage</th>
              <th scope="col" className="text-center">Inventory</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="text-center">{item.qty}</td>
                <td>{item.units}</td>
                <td className="text-center">
                  <EditItem item={item} id={item.id} />
                  <button type="button" className="btn btn-danger btn-sm ms-1 me-1" onClick={() => deleteItem(item.id)}><Icon.XSquareFill /></button>
                </td>
                <td className="text-center">                 
                  <button type="button" className="btn btn-success btn-sm" onClick={() => addInventory(item.id)}><Icon.CheckCircle /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default List;