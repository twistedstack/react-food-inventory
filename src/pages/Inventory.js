import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import AddInventory from "../components/AddInventory";
import EditItem from "../components/EditItem";
const Inventory = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("inventory", "==", true), orderBy("name"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let items = [];
      QuerySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setItems(items);
    });
    return () => unsubscribe;
  }, []);

  const deleteItem = (id) => {
    const documentRef = doc(db, "items", id);
    deleteDoc(documentRef)
  }
  const handleList = (item) => {
    const itemDocument = doc(db, "items", item.id);
    if (item.list === false) {
      updateDoc(itemDocument, { list: true });
    } else {
      updateDoc(itemDocument, { list: false });
    }    
  }
  return (
      <div className="container">
        <div><h3>Inventory</h3>  <AddInventory /></div>       
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Qty</th>
              <th scope="col">Units</th>
              <th scope="col">Location</th>
              <th scope="col">Expires</th>
              <th scope="col">Manage</th>
              <th scope="col">Shopping</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.units}</td>
                <td>{item.location}</td>
                <td>{item.expires ? new Date(item.expires.seconds * 1000).toDateString() : 'No Expiration'}</td>
                <td>
                  <EditItem item={item} id={item.id} />
                  <button type="button" className="btn btn-danger btn-sm ms-1" onClick={() => deleteItem(item.id)}>Delete</button>                  
                </td>
                <td>
                  <button type="button" className={String(item.list) === 'true' ? ('btn btn-success btn-sm') : ('btn btn-light btn-sm')} onClick={() => handleList(item)}>In List</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default Inventory;