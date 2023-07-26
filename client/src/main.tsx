/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import Quadratics from './components/tools/Quadratics';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" Component={App} />
            <Route path="/tools/quadratics" Component={Quadratics} />
        </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);