import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StudentListTable from './Education';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1>Student List</h1>
    <StudentListTable />
  </React.StrictMode>
);
