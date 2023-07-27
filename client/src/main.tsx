/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import GameOfLife from './components/tools/GameOfLife';
import MandelBrotSet from './components/tools/MandelbrotSet';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" Component={App} />
            <Route path="/tools/game-of-life" Component={GameOfLife} />
            <Route path="/tools/mandelbrot-set" Component={MandelBrotSet} />
        </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);