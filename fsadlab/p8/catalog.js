// Run with:  mongosh fsadlab_db --file catalog.js

use("fsadlab_db");
db.catalog.drop();

// ---------- Step 1: Prepare data ----------
db.catalog.insertMany([
  { item_id: "A001", name: "Classic Leather Backpack",
    description: "Durable leather backpack with multiple compartments, perfect for daily commute or light travel.",
    tags: ["leather", "backpack", "travel", "work"], price: 120.00, in_stock: true },
  { item_id: "A002", name: "Ergonomic Office Chair",
    description: "Adjustable office chair with lumbar support and breathable mesh, ideal for long working hours.",
    tags: ["office", "chair", "ergonomic", "comfort"], price: 280.00, in_stock: false },
  { item_id: "A003", name: "Durable Cotton T-Shirt",
    description: "A soft and durable t-shirt made from 100% organic cotton. Eco-friendly and comfortable.",
    tags: ["cotton", "tshirt", "organic", "eco-friendly"], price: 25.00, in_stock: true }
]);

// ---------- Step 2: Create a text index ----------
db.catalog.createIndex({ name: "text", description: "text", tags: "text" });

// ---------- Step 3: Aggregation pipeline ----------
const result = db.catalog.aggregate([
  // Stage 1: filter documents using the text index
  { $match: { $text: { $search: "durable backpack" } } },
  // Stage 2: reshape output and include the relevance score
  { $project: { _id: 0, name: 1, price: 1, score: { $meta: "textScore" } } },
  // (extra) sort best match first
  { $sort: { score: -1 } }
]).toArray();

// ---------- Step 4: Analyze results ----------
printjson(result);
