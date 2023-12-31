import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import '../styles/GameOfLife.tool.component.css';
import GameOfLifeDescription from '../text/GameOfLifeDescription';
import CodeSnippet from '../code/Snippet';
import ScrollDownChevron from '../ScrollDownChevron';

const GRID_SIZE = 40;

const GameOfLife = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [fillPercentage, setFillPercentage] = useState(50);

  useEffect(() => {
    handleRegenerate();
  }, [fillPercentage]);

  const handleNextGeneration = useCallback(async () => {
    try {
      // Make an API call to get the next generation by passing the current grid and parameters
      const response = await axios.post(import.meta.env?.VITE_API_URL + '/tools/game-of-life/next', {
        grid,
      });
      setGrid(response.data.grid);
    } catch (error) {
      console.error('Error fetching next generation:', error);
      // Show user-friendly error message to the user
      // setError('An error occurred while fetching the next generation.');
    }
  }, [grid, speed, fillPercentage]);

  const handleRegenerate = useCallback(() => {
    const initialGrid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    const fillCount = Math.floor((fillPercentage / 100) * (GRID_SIZE * GRID_SIZE));
    for (let i = 0; i < fillCount; i++) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      initialGrid[row][col] = 1;
    }
    setGrid(initialGrid);
  }, [fillPercentage]);

  const toggleCell = useCallback((rowIndex: number, colIndex: number) => {
    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex] = 1 - updatedGrid[rowIndex][colIndex];
    setGrid(updatedGrid);
  }, [grid]);

  const handleReset = () => {
    const initialGrid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    setGrid(initialGrid);
  };

  const handleRun = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      intervalId = setInterval(() => {
        handleNextGeneration();
      }, speed);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, handleNextGeneration, speed]);

  return (
    <div className='background'>
      <div className='h-screen flex flex-col items-center justify-center'>
        <div className='w-full h-full flex items-center justify-center'>
          <div className='grid background border' style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}>
            {/* Render the grid */}
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-4 h-4 border border-gray-500 ${cell === 1 ? 'bg-go' : 'background'}`}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                ></div>
              ))
            )}
          </div>

          {/* Options Box */}
          <div className='flex flex-col mt-4 ml-6 text-white'>
            <div className='flex items-center mb-2'>
              <label className='mr-2'>Animation Time:</label>
              <input
                className='w-36 appearance-none bg-white h-1 rounded-lg'
                min={50}
                max={500}
                type="range"
                value={speed}
                onChange={(e) => setSpeed(e.target.valueAsNumber)}
              />
            </div>

            <div className='flex items-center mb-2'>
              <label className='mr-2'>Fill Percentage:</label>
              <input
                className='w-36 appearance-none bg-white h-1 rounded-lg'
                min={0}
                max={100}
                type="range"
                value={fillPercentage}
                onChange={(e) => setFillPercentage(e.target.valueAsNumber)}
              />
            </div>

            <button className='px-4 py-2 bg-go text-white rounded' onClick={handleNextGeneration}>
              Next Generation
            </button>
            <button className='mt-2 px-4 py-2 bg-white go rounded' onClick={handleRun}>
              {isRunning ? 'Stop' : 'Run'}
            </button>
            <button className='mt-2 px-4 py-2 bg-go text-white rounded' onClick={handleReset}>
              Reset
            </button>
            <button className='mt-2 px-4 py-2 bg-white go rounded' onClick={handleRegenerate}>
              Regenerate
            </button>
          </div>
        </div>
        <ScrollDownChevron />
      </div>
      <div className='w-full px-2 py-12'>
        <GameOfLifeDescription />
        <div className='mt-4'>
          <CodeSnippet>
          {`          
            // Represents the grid for Conway's Game of Life
            type Grid [][]int
            
            // Function to compute the next generation of the grid
            func GetNextGeneration(current Grid) Grid {
              rows := len(current)
              cols := len(current[0])
              nextGen := make(Grid, rows)
              for i := range nextGen {
                nextGen[i] = make([]int, cols)
              }
            
              // Helper function to count the live neighbors of a cell
              countLiveNeighbors := func(row, col int) int {
                liveCount := 0
                for r := row - 1; r <= row+1; r++ {
                  for c := col - 1; c <= col+1; c++ {
                    if r >= 0 && r < rows && c >= 0 && c < cols && !(r == row && c == col) {
                      liveCount += current[r][c]
                    }
                  }
                }
                return liveCount
              }
            
              // Apply the rules to compute the next generation
              for i := 0; i < rows; i++ {
                for j := 0; j < cols; j++ {
                  liveNeighbors := countLiveNeighbors(i, j)
                  if current[i][j] == 1 {
                    // Live cell
                    if liveNeighbors < 2 || liveNeighbors > 3 {
                      // Dies due to underpopulation or overpopulation
                      nextGen[i][j] = 0
                    } else {
                      // Lives on to the next generation
                      nextGen[i][j] = 1
                    }
                  } else {
                    // Dead cell
                    if liveNeighbors == 3 {
                      // Becomes a live cell due to reproduction
                      nextGen[i][j] = 1
                    }
                  }
                }
              }
            
              return nextGen
            }
          `}
        </CodeSnippet>
      </div>
      </div>
    </div>
  );
};

export default GameOfLife;
