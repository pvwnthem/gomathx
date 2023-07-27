/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import GameOfLife from './components/tools/GameOfLife';
import MandelBrotSet from './components/tools/MandelbrotSetOpenGL';
import MandelbrotSetImageBased from './components/tools/MandelbrotSetImageBased';


ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" Component={App} />
            <Route path="/tools/game-of-life" Component={GameOfLife} />
            <Route path="/tools/mandelbrot-set" Component={MandelBrotSet} />
            <Route path="/tools/mandelbrot-set-image-based" Component={MandelbrotSetImageBased} />

        </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);