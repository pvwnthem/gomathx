import { Tool } from "../types/Tool";

export const tools: Tool[] = [
    {
        name: "Conway's Game of Life",
        description: "A cellular automaton devised by the British mathematician John Horton Conway in 1970.",
        href: "/tools/game-of-life",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif"
    },
    {
        name: "Mandelbrot Set OpenGL",
        description: "A set of complex numbers that satisfy a certain condition. Rendered using OpenGL.",
        href: "/tools/mandelbrot-set",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Mandel_zoom_00_mandelbrot_set.jpg"
    },
    {
        name: "Mandelbrot Set Image Based",
        description: "A set of complex numbers that satisfy a certain condition. Rendered using image based method. Much better for slower computers, work is done server side.",
        href: "/tools/mandelbrot-set-image-based",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Mandel_zoom_00_mandelbrot_set.jpg"
    }
]