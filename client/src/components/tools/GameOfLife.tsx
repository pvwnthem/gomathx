
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameOfLife = () => {
  const [grid, setGrid] = useState<number[][]>([]);

 useEffect(() => {
  // Initialize the grid with the initial state (e.g., all cells are dead).
  const initialGrid = Array.from({ length: 10 }, () => Array(10).fill(0));

  // Randomly fill in some squares on the initial grid.
  for (let i = 0; i < 20; i++) {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    initialGrid[row][col] = 1;
  }

  setGrid(initialGrid);
}, []);

  const handleNextGeneration = async () => {
    try {
      // Make an API call to get the next generation by passing the current grid
      const response = await axios.post('http://localhost:8080/tools/game-of-life/next', { grid });
      setGrid(response.data.grid);
    } catch (error) {
      console.error('Error fetching next generation:', error);
    }
  };

  // Function to toggle a cell's state when clicked
  const toggleCell = (rowIndex: number, colIndex: number) => {
    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex] = 1 - updatedGrid[rowIndex][colIndex];
    setGrid(updatedGrid);
  };

  return (
    <div>
      <div className="grid grid-cols-10 gap-1">
        {/* Render the grid */}
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-8 h-8 ${
                cell === 1 ? 'bg-black' : 'bg-white'
              }`}
              onClick={() => toggleCell(rowIndex, colIndex)}
            ></div>
          ))
        )}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleNextGeneration}
      >
        Next Generation
      </button>
    </div>
  );
};

export default GameOfLife;
