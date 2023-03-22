const { booleans, colors, primitives, transforms, maths } = jscadModeling // modeling comes from the included script tag in index.html

const { intersect, subtract, union } = booleans
const { colorize } = colors
const { cube, cuboid, line, sphere, star } = primitives
const { center, rotateX, translate } = transforms;

import { tube } from "./path/tube.js";


// lindenmeyer code
const rules = ({
  'm': 'm3w',
  '3': '3',
  '0': '0',
  'w': 'y0w',
  'y': '530w',
  '5': '5'
});

// L SYSTEM VARIABLES
const iterations = 5;
const start = 'm3w';
const angle = 15;
let startingPoint = [0, 0, 0];
let currentAngle = 360;
let lineLength = 5;
let points = [startingPoint];
let stateStack = [];

// JSCAD VARIABLES
//const shape1 = sphere({radius: 100});
//const shape2 = cube({size: 150});

// one step of the expansion process
const step = (lindenmayerString) => {
  return [...lindenmayerString]   // make a copy of the array
  .map(letter => rules[letter])   // map each letter to its rules copy
  .join('');                      // join them back together
};

// expand the string as many times as iterations
const expand = (iterations, lindenmayerString) => {
  let expandedString = lindenmayerString;
  for (let i = 0; i < iterations; i++) {
      expandedString = step(expandedString);
  }
  return expandedString;
};

// get the expanded string
const bigString = expand(iterations, start);

const newPosition = () => {
  const currentPosition = points.slice(-1)[0];
  const nextPoint = [
      currentPosition[0] + lineLength * Math.cos(currentAngle * Math.PI / 180),
      currentPosition[1] + lineLength * Math.sin(currentAngle * Math.PI / 180),
      currentPosition[2] + lineLength * Math.tan(currentAngle * Math.PI / 180)
  ];
  return nextPoint;
}
const moveForward = () => {
  points.push(newPosition());
}
const multiplyColumnMatrix = (column, matrix) => {
  return [
    column[0] * matrix[0] + column[1] * matrix[1] + column[2] * matrix[2],
    column[0] * matrix[3] + column[1] * matrix[4] + column[2] * matrix[5],
    column[0] * matrix[6] + column[1] * matrix[7] + column[2] * matrix[8]
  ];
}
const turnOverX = () => {
  const currentPosition = points.slice(-1).pop();
  const rotationMatrix = [
    1, 0, 0,
    0, Math.cos(angle), -Math.sin(angle),
    0, Math.sin(angle), Math.cos(angle)
  ];
  const newPoint = multiplyColumnMatrix(currentPosition, rotationMatrix);
  points.push(newPoint);
}
const turnOverY = () => {
  const currentPosition = points.slice(-1).pop();
  const rotationMatrix = [
    Math.cos(angle), 0, Math.sin(angle),
    0, 1, 0
    -Math.sin(angle), 0, Math.cos(angle)
  ];
  const newPoint = multiplyColumnMatrix(currentPosition, rotationMatrix);
  points.push(newPoint);
}
const turnOverZ = () => {
  const currentPosition = points.slice(-1).pop();
  const rotationMatrix = [
    Math.cos(angle), -Math.sin(angle), 0,
    Math.sin(angle), Math.cos(angle), 0,
    0, 0, 1
  ];
  const newPoint = multiplyColumnMatrix(currentPosition, rotationMatrix);
  points.push(newPoint);
}
const push = () => {
    stateStack.push({
        position: points.slice(-1)[0],
        angle: currentAngle
    });
}
const pop = () => {
    const lastState = stateStack.pop();
    points.push(lastState.position);
    currentAngle = lastState.angle;
}

const drawingRules = {
  'm': moveForward,
  '3': moveForward,
  '0': () => {
      push();
      turnOverX();
  },
  'w': push,
  'y': () => {
      push();
      turnOverY();
  },
  '5': () => {
    push();
    turnOverZ();
  }
};

for (let i = 0; i < bigString.length; i++) {
  const letter = bigString[i];

  const interpret = drawingRules[letter];
  interpret();
}

//console.log(points);

const model = (scale) => {
  // const shape = union(
  //   sphere({ radius: 130, segments: 32 }),
  //   cube({ size: 210 })
  // );

  // return shape;
  
  //const shape2a = translate([60, 30, 0], shape2)
  //const shape3 = subtract(shape2a, shape1)
  
  // create a cube
  // create lindenmeyer string
  console.log(points);
  const system = tube({radius: 3, circumferenceSegments: 3, numSamplePoints: 3}, points);
 

  return system;
}

const name = "0301_csg";

export {
  model,
  name
}