import React, { useEffect, useState } from 'react';

const Mandelbrot: React.FC = () => {
  const [image, setImage] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(-0.5);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [isPanning, setIsPanning] = useState<boolean>(false);

  useEffect(() => {
    const maxIterations = 250;

    const fetchMandelbrot = async () => {
      const response = await fetch(import.meta.env.VITE_API_URL + '/tools/mandelbrot-set', {
        method: 'POST',
        body: JSON.stringify({
          width: window.innerWidth,
          height: window.innerHeight,
          offsetX,
          offsetY,
          zoom,
          maxIterations,
        }),
      });
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      setImage(url);
    };

    if (!isPanning) {
      fetchMandelbrot();
    } else {
      const timeoutId = setTimeout(() => {
        fetchMandelbrot();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [zoom, offsetX, offsetY, isPanning]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const newZoom = zoom + (event.deltaY > 0 ? 0.05 : -0.05);
      setZoom(newZoom);
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [zoom]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      setIsPanning(true);
      const startX = event.clientX;
      const startY = event.clientY;

      const handleMouseMove = (event: MouseEvent) => {
        event.preventDefault();
        const newOffsetX =
          offsetX - ((event.clientX - startX) / window.innerWidth) * zoom;
        const newOffsetY =
          offsetY - ((event.clientY - startY) / window.innerHeight) * zoom;
        setOffsetX(newOffsetX);
        setOffsetY(newOffsetY);
      };
      

      const handleMouseUp = () => {
        setIsPanning(false);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [offsetX, offsetY, zoom]);

  return (
    <div>
      <img draggable={false} src={image} alt="Mandelbrot Set" />
    </div>
  );
};

export default Mandelbrot;
