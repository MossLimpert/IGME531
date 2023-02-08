import { createNoise2D } from 'https://unpkg.com/simplex-noise@4.0.1/dist/esm/simplex-noise.js';

let canvas = document.querySelector('#schotter');
paper.setup(canvas);

// programattically alter the rotation by altering angle by a noise value
// as the loops progress, i will increase the offset
let rotationNoise = createNoise2D();


let gridWidth = 30;        // squares will be 10x10 and right next to each other
let radius = 20;
let rotationOffset = 0.5;
let positionOffset = 20;
// 12 columns by 22 rows 
for (let i = 0; i < 22; i++)
{
    
    // we want a bunch of squares
    for (let j = 0; j < 12; j++)
    {
        // setup
        let point = new paper.Point((j * gridWidth) + positionOffset, (i * gridWidth) + positionOffset);
        let rotation = i * rotationNoise(i,j) + (rotationNoise(i,j) * (rotationOffset * i)) * 6;

        // draw
        // args: center, sides, radius
        let path = new paper.Path.RegularPolygon(point, 4, radius);
        path.rotate(rotation, point);
        path.fillColor = 'black';
        let fill = new paper.Path.RegularPolygon(point, 4, radius - 3);
        fill.rotate(rotation, point);
        fill.fillColor = 'white';
    }
    
}

exportSVG();

function exportSVG() 
{
    document.body.appendChild(paper.project.exportSVG());
    let renderedImage = document.querySelector('svg');
    //renderedImage.attributes.setNamedItemNS("http://www.w3.org/2000/svg", "xmlns");
    renderedImage.setAttribute("xmlns", "http://www.w3.org/2000/svg");
}