import React, { useState, useEffect } from "react";
import axios from "axios";

function Display_Inventory() {
  const [res, setres] = useState([]);

  // fetch once when component mounts (calling it directly in render causes an infinite loop)
  useEffect(() => {
    const resp = async () => {
      const response = await axios.get("http://localhost:8000");
      console.log("inventory", response.data);
      setres(response.data);
    };
    resp();
  }, []);

  return (
    <div>
      <h1>Inventory Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th> <th>Product Name</th> <th>Quantity</th> <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {res.map((inventory) => (
            <tr key={inventory.id}>
              <td>{inventory.id}</td> <td>{inventory.prodname}</td>
              <td>{inventory.qty}</td> <td>{inventory.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddInventory() {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState([]);

  const SubmitEvent = () => {
    const fo = { id: id, prodname: name, qty: qty, price: price };
    console.log("fo ", fo);
    const resp = async () => {
      const response = await axios.post("http://localhost:8000/add", fo);
      console.log(response.data);
      const getresponse = await axios.get("http://localhost:8000");
      setInventory(getresponse.data);
    };
    resp();
  };

  return (
    <div>
      <h1>Inventory Management1</h1>
      <table>
        <tbody>
          <tr><td>ID</td><td><input type="number" name="id" value={id}
            onChange={(e) => setId(e.target.value)} /></td></tr>
          <tr><td>Product Name</td><td><input type="text" name="prodname" value={name}
            onChange={(e) => setName(e.target.value)} /></td></tr>
          <tr><td>Quantity</td><td><input type="number" name="qty" value={qty}
            onChange={(e) => setQty(e.target.value)} /></td></tr>
          <tr><td>Price</td><td><input type="number" name="price" value={price}
            onChange={(e) => setPrice(e.target.value)} /></td></tr>
          <tr><td><input type="submit" name="onSubmit" onClick={SubmitEvent} /></td></tr>
        </tbody>
      </table>

      {inventory.length > 0 && (
        <>
          <h3>Updated inventory</h3>
          <ul>
            {inventory.map((i) => (
              <li key={i.id}>{i.id} - {i.prodname} - {i.qty} - {i.price}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export { Display_Inventory, AddInventory };
