const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));

app.get('/submit-get', (req, res) => {
  // Data is in req.query for GET requests
  const { name, branch, semester } = req.query;
  const htmlResponse = `
    <h2>Student Information (GET)</h2>
    <p>Name: <b>${name}</b></p>
    <p>Branch: <u>${branch}</u></p>
    <p>Semester: ${semester}</p>
    <br>
    <a href="/">Go Back</a>
  `;
  res.send(htmlResponse);
});

app.post('/submit-post', (req, res) => {
  // Data is in req.body for POST requests
  const { name, branch, semester } = req.body;
  const htmlResponse = `
    <h2>Student Information (POST)</h2>
    <p>Name: <b>${name}</b></p>
    <p>Branch: <u>${branch}</u></p>
    <p>Semester: ${semester}</p>
    <br>
    <a href="/">Go Back</a>
  `;
  res.send(htmlResponse);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  console.log('Open your browser and navigate to http://localhost:3000/index.html');
});
