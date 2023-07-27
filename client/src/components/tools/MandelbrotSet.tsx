import React, { useEffect, useState } from 'react';


const Mandelbrot: React.FC = () => {
  const [image, setImage] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(-0.5);
  const [offsetY, setOffsetY] = useState<number>(0);

  useEffect(() => {

    const maxIterations = 100;

    const fetchMandelbrot = async () => {

        const response = await fetch(import.meta.env.VITE_API_URL + '/tools/mandelbrot-set', {method: "POST", body: JSON.stringify({ width: window.innerWidth, height: window.innerHeight, offsetX, offsetY, zoom, maxIterations })});
        const blob = await response.blob();

        const url = URL.createObjectURL(blob);
        setImage(url);

  
    };

    fetchMandelbrot();

  }, [zoom, offsetX, offsetY]);

  const handleZoomIn = () => {
    setZoom(zoom / 1.5); // Increase zoom level by 1.5 times
  };

  const handleZoomOut = () => {
    setZoom(zoom * 1.5); // Decrease zoom level by 1.5 times
  };

  return (
    <div>
      <img src={image}></img>
      <div>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
        <button onClick={() => setOffsetX(offsetX - 0.1)}>Left</button>
        <button onClick={() => setOffsetX(offsetX + 0.1)}>Right</button>
        <button onClick={() => setOffsetY(offsetY - 0.1)}>Up</button>
        <button onClick={() => setOffsetY(offsetY + 0.1)}>Down</button>
      </div>
    </div>
  );
};

export default Mandelbrot;