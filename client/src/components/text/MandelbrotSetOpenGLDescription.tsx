function MandelbrotSetDescription() {
  return (
    <div className="max-w-1/2 mx-auto p-4 border border-gray-400 rounded-md">
      <h2 className="text-3xl font-bold mb-4 go">The Mandelbrot Set</h2>
      <p className="mb-2 text-white">
        The Mandelbrot Set is a famous fractal in mathematics that is named after Benoit Mandelbrot, who studied it in the 1970s.
        It is a set of complex numbers that, when iterated through a specific formula, either remain bounded or tend towards infinity.
        The set is often visualized as a colorful, intricate pattern that is self-similar at different scales.
      </p>
      <p className="mb-2 text-white">
        The Mandelbrot Set has been studied extensively in mathematics and has also been used in computer graphics and art.
        It is a fascinating example of a complex system that emerges from a simple formula.
      </p>
    </div>
  );
}

export default MandelbrotSetDescription;