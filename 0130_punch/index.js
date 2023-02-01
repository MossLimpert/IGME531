import { createNoise2D } from './node_modules/simplex-noise/dist/esm/simplex-noise.js';
//import { paper } from './node_modules/paper/dist/paper-core.js';
// https://observablehq.com/d/514b53f0f2ae43e0
//simplexLibrary = import('https://unpkg.com/simplex-noise@4.0.1/dist/esm/simplex-noise.js?module');

// set up paper scope
var canvas = document.querySelector('#punch');
paper.setup(canvas);

// polygon side values
var punchArray = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];
// fill array with random numbers
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        while (punchArray[i][j] < 3)
        {
            punchArray[i][j] = Math.trunc(Math.random() * 10);
        }
        console.log(punchArray[i][j]);
    }
}


//Path.RegularPolygon(center, sides, radius)
// center is in gridPoints
// sides is in punchArray
// radii will be generated using noise and put in punchNoise

var punchNoise = createNoise2D();


//position punches
var gridPoints = [];
var row1 = [];
var row2 = [];
var row3 = []; 
var row4 = [];

row1.push(new paper.Point(93, 93));   // row 1
row1.push(new paper.Point(210, 93));
row1.push(new paper.Point(317, 93));
row1.push(new paper.Point(429, 93));
row2.push(new paper.Point(93, 210));  // row 2
row2.push(new paper.Point(210, 210));
row2.push(new paper.Point(317, 210));
row2.push(new paper.Point(429, 210));
row3.push(new paper.Point(93, 317));  // row 3
row3.push(new paper.Point(210, 317));
row3.push(new paper.Point(317, 317));
row3.push(new paper.Point(429, 317));
row4.push(new paper.Point(93, 429));  // row 4
row4.push(new paper.Point(210, 429));
row4.push(new paper.Point(317, 429));
row4.push(new paper.Point(429, 429));

gridPoints.push(row1);
gridPoints.push(row2);
gridPoints.push(row3);
gridPoints.push(row4);

var size = new paper.Size(10,10)
// draw punches
for (var j = 0; j < 4; j++) {
    var rectangle, path;
    for (var i = 0; i < 4; i++) {
        //rectangle = new Rectangle(gridPoints[j][i], size);
        //path = new Path.Ellipse(rectangle);
        //Path.RegularPolygon(center, sides, radius)
        path = new paper.Path.RegularPolygon(gridPoints[j][i], punchArray[j][i], punchNoise(j,i) * 100);
        path.fillColor = 'black';
    }
}

document.body.appendChild(paper.project.exportSVG());

// add the extra thing so we can download it
// https://mycourses.rit.edu/content/enforced2/1014807-IGME53101.2225/File_30e56daed1604aaf8bfdaa6fb14c714d_image.png?_&d2lSessionVal=H5TK3Wc6PxQgPpndrGn2ezmPF
var renderedImage = document.querySelector('svg');
// https://stackoverflow.com/questions/11798216/setting-namespace-attributes-on-an-element
renderedImage.createAttributeNS("http://www.w3.org/2000/svg", "xmlns");