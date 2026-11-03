const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies

const inventory = [
  { id: 1, prodname: "prod1", qty: 12, price: 12 },
  { id: 2, prodname: "prod2", qty: 1, price: 13 },
  { id: 3, prodname: "prod3", qty: 10, price: 14 },
  { id: 4, prodname: "prod4", qty: 19, price: 16 },
];

app.get('/', (req, res) => {
  res.json(inventory);
});

app.post('/add', (req, res) => {
  console.log(req.body.id);
  const invent = {
    id: req.body.id,
    prodname: req.body.prodname,
    qty: req.body.qty,
    price: req.body.price
  };
  inventory.push(invent);
  res.json(inventory);
});

app.listen(8000, () => {
  console.log('express is working at http://localhost:8000');
});
