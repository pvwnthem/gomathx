import { useRef } from 'react';
import copy from 'clipboard-copy';

function CodeSnippet ({ children }: any) {
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopyClick = () => {
    if (codeRef.current) {
      copy(codeRef.current.innerText);
      alert('Code copied to clipboard!');
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <pre
        ref={codeRef}
        className="text-sm font-mono p-2 bg-gray-300 rounded-lg overflow-auto"
      >
        {children}
      </pre>
      <button
        onClick={handleCopyClick}
        className="mt-2 px-4 py-2 bg-go text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Copy Code
      </button>
    </div>
  );
};

export default CodeSnippet;
