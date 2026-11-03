// Run with:  mongosh fsadlab_db --file employees.js
// (or paste line-by-line into mongosh)

use("fsadlab_db");
db.employees.drop();

// ---------- Setup: sample data ----------
db.employees.insertMany([
  { employee_id: 101, name: "Sonia Rao", department: "Engineering", salary: 95000,
    hire_date: new Date("2023-01-15"), performance_score: 4.5, status: "Active" },
  { employee_id: 102, name: "Rajesh Kumar", department: "HR", salary: 68000,
    hire_date: new Date("2024-03-22"), performance_score: 4.1, status: "Active" },
  { employee_id: 103, name: "Arjun Singh", department: "Engineering", salary: 120000,
    hire_date: new Date("2022-06-01"), performance_score: 4.8, status: "Active" },
  { employee_id: 104, name: "Priya Mehta", department: "Sales", salary: 85000,
    hire_date: new Date("2023-11-10"), performance_score: 4.2, status: "Active" },
  { employee_id: 105, name: "Vikram Reddy", department: "Sales", salary: 85000,
    hire_date: new Date("2024-08-01"), status: "On Leave" }
]);

// ---------- 1. Comparison selectors ----------
print("\n--- $gt & $lte : salary > 90000 and <= 120000 ---");
printjson(db.employees.find({ salary: { $gt: 90000, $lte: 120000 } }).toArray());

print("\n--- $in : department is HR or Sales ---");
printjson(db.employees.find({ department: { $in: ["HR", "Sales"] } }).toArray());

print("\n--- $ne : status not 'On Leave' ---");
printjson(db.employees.find({ status: { $ne: "On Leave" } }).toArray());

// ---------- 2. Logical selectors ----------
print("\n--- $and (implicit) : Engineering AND performance_score >= 4.5 ---");
printjson(db.employees.find({ department: "Engineering", performance_score: { $gte: 4.5 } }).toArray());

print("\n--- $or : HR OR salary > 100000 ---");
printjson(db.employees.find({ $or: [ { department: "HR" }, { salary: { $gt: 100000 } } ] }).toArray());

// ---------- 3. Combining selectors ----------
print("\n--- Complex : Active, Engineering/Sales, hired before 2024 ---");
printjson(db.employees.find({
  status: "Active",
  department: { $in: ["Engineering", "Sales"] },
  hire_date: { $lt: new Date("2024-01-01") }
}).toArray());
