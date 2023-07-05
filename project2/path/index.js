import { tube } from "./tube.js";

const { booleans } = jscadModeling // modeling comes from the included script tag in index.html

const { union } = booleans


/**
 * Using the tube function (which takes an array of 3d points 
 * and traces a 3d line through them), `path` is a function
 * which takes an array of arrays of 3d points and draws independent
 * lines through each (much like an SVG path). 
 */
const path = (options, arrOfArrsOfPoints) => {
  const defaults = {
    radius: 0.1,
    circumferenceSegments: 8,
    numSamplePoints: 64
  };
  options = Object.assign({}, defaults, options);

  const lines = arrOfArrsOfPoints.map((line) => {
    return tube({
      radius: options.radius, 
      circumferenceSegments: options.circumferenceSegments, 
      numSamplePoints: options.numSamplePoints
    }, line);
  });

  return union(...lines);
};

export { path };