import React from 'react';
import { Tool } from '../types/Tool';

function ToolBox({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.href}
      className="border rounded-lg p-4 shadow-md w-full mx-auto background hover:shadow-lg transition duration-300"
    >
      <h2 className="text-center text-lg font-semibold mb-2 go">{tool.name}</h2>
      <p className="text-sm mb-4 text-white">{tool.description}</p>     
      <div className="mt-2">
        <img
          src={tool.image}
          alt={tool.name}
          className="w-full h-32 object-cover rounded-md"
        />
      </div>
    </a>
  );
}

export default ToolBox;
