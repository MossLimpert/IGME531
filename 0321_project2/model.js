const { booleans, colors, primitives, transforms, maths } = jscadModeling // modeling comes from the included script tag in index.html

const { intersect, subtract, union } = booleans
const { colorize } = colors
const { cube, cuboid, line, sphere, star } = primitives
const { center, rotateX, translate, rotateY } = transforms;

import { tube } from "./path/tube.js";

const makeBranch = (startString, _iterations, _angle, _lineLength) => {
  // lindenmeyer code
  const rules = ({
    'm': '3w5',
    '3': '3',
    '0': '0',
    'w': '0wm',
    '5': '5'
  });

  // L SYSTEM VARIABLES
  const iterations = _iterations;
  const start = startString;
  const angle = _angle;
  let startingPoint = [0, 0, -50];
  let currentAngle = 360;
  let lineLength = _lineLength;
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

  //console.log(bigString);

  const newPosition = () => {
    const currentPosition = points.slice(-1)[0];
    const nextPoint = [
        currentPosition[0] + lineLength * Math.cos(angle * Math.PI / 180),
        currentPosition[1] + lineLength * Math.sin(angle * Math.PI / 180),
        currentPosition[2] + lineLength * Math.tan(angle * Math.PI / 180)
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
  // this method creates not-a-numbers and i'm not sure why
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
          angle: angle
      });
  }
  const pop = () => {
      const lastState = stateStack.pop();
      points.push(lastState.position);
      //currentAngle = lastState.angle;
  }

  const drawingRules = {
    'm': moveForward,
    '3': () => {
      moveForward();
      push();
    },
    '0': () => {
        push();
        turnOverX();
    },
    'w': push,
    '5': () => {
      turnOverZ();
      pop();
    }
  };

  for (let i = 0; i < bigString.length; i++) {
    const letter = bigString[i];

    const interpret = drawingRules[letter];
    interpret();
  }

  return points;
}

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
  let points = makeBranch("m5w0", 3, 45, 40);
  let branch2 = makeBranch("m3w", 5, 20, 1);
  let branch3 = makeBranch("3333wmmww", 3, 100, 15);
  let branch4 = makeBranch("m", 3, 30, 20);
  let branch5 = makeBranch("ww", 4, 45, 80);

  //console.log(points);
  let system = tube({radius: 5, circumferenceSegments: 3, numSamplePoints: points.length}, points);
  let tube2 = tube({radius: 5, circumferenceSegments: 3, numSamplePoints: branch2.length}, branch2);
  let tube3 = tube({radius: 60, circumferenceSegments: 4, numSamplePoints: branch3.length}, branch3);
  let tube4 = tube({radius: 5, circumferenceSegments: 3, numSamplePoints: branch4.length}, branch4);
  //const tube5 = tube({radius: 10, circumferenceSegments: 4, numSamplePoints: branch5.length}, branch5);

  system = translate([0, 0, -50], system);
  tube2 = translate([30, 100 ,0], tube2);
  tube3 = translate([0, 50, 0], tube3);

  let lsystem = union(system, tube2);
  lsystem = union(lsystem, tube3);
  lsystem = union(lsystem, tube4);
 

  lsystem = rotateY(-45, lsystem);

  let rect = cube({size: 200});
  lsystem = subtract(rect, lsystem);
  //lsystem = union(lsystem, tube5);


  lsystem = colorize([0,1,0,0.5], lsystem);
  return lsystem;
}

const name = "0301_csg";

export {
  model,
  name
}