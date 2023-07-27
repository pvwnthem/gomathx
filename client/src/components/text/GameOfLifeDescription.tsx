import React from "react";

function GameOfLifeDescription() {
  return (
    <div className="max-w-1/2 mx-auto p-4 border border-gray-400 rounded-md">
      <h2 className="text-3xl font-bold mb-4 go">Conway's Game of Life</h2>
      <p className="mb-2 text-white">
        Conway's Game of Life is a cellular automaton devised by the British mathematician John Conway in 1970.
      </p>
      <p className="mb-2 text-white">
        The game takes place on a two-dimensional grid, where each cell can be in one of two states: alive or dead.
        The grid represents the world, and cells interact with their neighboring cells according to a set of rules.
        These rules dictate how the cells live, die, or multiply over generations.
      </p>
      <p className="mb-2 text-white">
        The game follows these basic rules:
      </p>
      <ul className="list-disc pl-8 mb-4 text-white">
        <li>Any live cell with fewer than two live neighbors dies (underpopulation).</li>
        <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
        <li>Any live cell with more than three live neighbors dies (overpopulation).</li>
        <li>Any dead cell with exactly three live neighbors becomes a live cell (reproduction).</li>
      </ul>
      <p className="text-white">
        Conway's Game of Life is a fascinating example of emergent behavior and has been used to simulate complex systems
        in various fields of study, including biology, computer science, and physics.
      </p>
    </div>
  );
};

export default GameOfLifeDescription;
