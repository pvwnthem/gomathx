import React, { useEffect, useRef } from 'react';

const Mandelbrot = () => {
  const canvasRef = useRef(null);
  
  let zoomLevel = 2.0;
  const maxZoom = 4096.0;
  const minZoom = 0.1;
  const zoomSpeed = 0.05;
  const zoomStep = 0.1;
  let offsetX = 0.0;
  let offsetY = 0.0;
  let targetZoomLevel = zoomLevel;
  let isZooming = false;
  const panSpeed = 2.05;

  useEffect(() => {
    const canvas: any = canvasRef.current;
    canvas.width = window.innerWidth *4;
    canvas.height = window.innerHeight *4;
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('WebGL is not supported in this browser.');
      return;
    }

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0, 1);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform vec2 u_offset;
      uniform float u_zoom;

      int mandelbrot(vec2 c) {
        vec2 z = vec2(0.0);
        int iterations = 0;
        const int maxIterations = 100;

        for (int i = 0; i < maxIterations; i++) {
          z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
          if (length(z) > 2.0) {
            return i;
          }
        }

        return maxIterations;
      }

      void main() {
        vec2 position = (gl_FragCoord.xy - u_resolution / 2.0) / u_resolution;
        position.x *= u_resolution.x / u_resolution.y;
        vec2 c = (position - u_offset) * u_zoom;

        int iterations = mandelbrot(c);
        float brightness = float(iterations) / float(100);
        gl_FragColor = vec4(1.0 - brightness, 1.0 - brightness, 1.0 - brightness, 1.0);
      }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error('Error compiling vertex shader:', gl.getShaderInfoLog(vertexShader));
      return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Error compiling fragment shader:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Error linking program:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Function to update the Mandelbrot fractal with new zoom and offset values
    const updateMandelbrot = () => {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const uniformResolution = gl.getUniformLocation(program, 'u_resolution');
      gl.uniform2f(uniformResolution, canvas.width, canvas.height);

      const uniformZoom = gl.getUniformLocation(program, 'u_zoom');
      gl.uniform1f(uniformZoom, zoomLevel);

      const uniformOffset = gl.getUniformLocation(program, 'u_offset');
      gl.uniform2f(uniformOffset, offsetX, offsetY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // Function to smoothly animate the zoom
    const animateZoom = () => {
      if (isZooming) {
        const diff = targetZoomLevel - zoomLevel;
        if (Math.abs(diff) > 0.001) {
          zoomLevel += diff * 0.1; // Adjust animation speed here (0.1 for smoother animation)
          updateMandelbrot();
          requestAnimationFrame(animateZoom);
        } else {
          isZooming = false;
        }
      }
    };

    // Event listener for mouse wheel zoom
    const handleMouseWheel = (event: any) => {
      const delta = event.deltaY > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
      const newZoomLevel = zoomLevel * delta;
      // Limit the zoom level to prevent zooming too far in or out
      targetZoomLevel = Math.min(maxZoom, Math.max(minZoom, newZoomLevel));
      // Calculate the zoom change to center the fractal on the mouse pointer
      const mouseX = (event.clientX / canvas.width) * 2 - 1;
      const mouseY = -(event.clientY / canvas.height) * 2 + 1;
      offsetX -= mouseX * (zoomLevel - targetZoomLevel);
      offsetY -= mouseY * (zoomLevel - targetZoomLevel);
      // Start the smooth zoom animation
      isZooming = true;
      animateZoom();
    };

    // Event listener for panning
    const handleMouseMove = (event: any) => {
      if (event.buttons === 1) {
        const dx = event.movementX / canvas.width;
        const dy = event.movementY / canvas.height;
        offsetX += dx * panSpeed * zoomLevel;
        offsetY -= dy * panSpeed * zoomLevel;
        updateMandelbrot();
      }
    };

    canvas.addEventListener('wheel', handleMouseWheel);
    canvas.addEventListener('mousemove', handleMouseMove);

    // Clean up event listeners on component unmount
    return () => {
      canvas.removeEventListener('wheel', handleMouseWheel);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className='w-full h-full' />;
};

export default Mandelbrot;
