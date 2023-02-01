import { createNoise2D } from "./node_modules/simplex-noise/dist/esm/simplex-noise.js";

// assignment info
// https://observablehq.com/d/c1d6b8ecbf21f1be

// TODO:
// complete physical cross stitch
// program to produce randomness (this)
// spare thread (return this)

// set up paper scope
var canvas = document.querySelector("#hito");
paper.setup(canvas);

var stitchNoise = createNoise2D();

// we need a 20x20 grid
// starting with an offset of 25px
let x = 25;
let y = 25;
let gridPoints = [];
for (let i = 0; i < 20; i++)
{
    gridPoints.push([]);
    for (let j = 0; j < 20; j++)
    {
        gridPoints[i].push(new paper.Point(x,y));
        x += 50;
    }
    y += 50;
}

let onOff = createNoise2D();

// draw rows by going down the first column and rounding the noise value to 0 or 1
let rowX = 0
for (let rowY = 0; rowY < 20; rowY++)
{
    let onOrOff = Math.round(onOff(rowX,rowY));
    console.log(onOff);
}