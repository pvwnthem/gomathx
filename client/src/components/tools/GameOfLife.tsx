import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const GRID_SIZE = 10;
const INITIAL_FILLED_CELLS = 20;

const GameOfLife = () => {
  const [grid, setGrid] = useState<number[][]>([]);

  useEffect(() => {
    // Initialize the grid with the initial state (e.g., all cells are dead).
    const initialGrid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));

    // Randomly fill in some squares on the initial grid.
    for (let i = 0; i < INITIAL_FILLED_CELLS; i++) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      initialGrid[row][col] = 1;
    }

    setGrid(initialGrid);
  }, []);

  const handleNextGeneration = useCallback(async () => {
    try {
      // Make an API call to get the next generation by passing the current grid
      const response = await axios.post('http://localhost:8080/tools/game-of-life/next', {
        grid,
      });
      setGrid(response.data.grid);
    } catch (error) {
      console.error('Error fetching next generation:', error);
      // Show user-friendly error message to the user
      // setError('An error occurred while fetching the next generation.');
    }
  }, [grid]);

  const toggleCell = useCallback((rowIndex: number, colIndex: number) => {
    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex] = 1 - updatedGrid[rowIndex][colIndex];
    setGrid(updatedGrid);
  }, [grid]);

  const handleReset = () => {
    const initialGrid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    setGrid(initialGrid);
  };

  return (
    <div className='w-screen h-screen'>
      <div className='grid grid-cols-10 gap-1' style={{ width: '200px', height: '200px' }}>
        {/* Render the grid */}
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-full h-full border border-gray-300 ${cell === 1 ? 'bg-black' : 'bg-white'}`}
              onClick={() => toggleCell(rowIndex, colIndex)}
            ></div>
          ))
        )}
      </div>
      <button className='mt-4 mr-4 px-4 py-2 bg-blue-500 text-white rounded' onClick={handleNextGeneration}>
        Next Generation
      </button>
      <button className='mt-4 px-4 py-2 bg-gray-500 text-white rounded' onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default GameOfLife;
