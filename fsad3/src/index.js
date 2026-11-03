import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Resume_Header from './resume/resume_header';
import Resume_Person_Info from './resume/resume_personal_info';
import Education from './resume/educational';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Resume_Header />
    <Resume_Person_Info />
    <Education />
  </React.StrictMode>
);