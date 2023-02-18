import { createNoise2D } from 'https://unpkg.com/simplex-noise@4.0.1/dist/esm/simplex-noise.js';

let canvas = document.querySelector('#schotter');
paper.setup(canvas);

// programattically alter the rotation by altering angle by a noise value
// as the loops progress, i will increase the offset
let rotationNoise = createNoise2D();

// bring in my svg
let mySVG;
// https://codepen.io/andywise/pen/MqxLVr?editors=1010
paper.project.importSVG('./schotter.svg', schotter);



function exportSVG() 
{
    document.body.appendChild(paper.project.exportSVG());
    let renderedImage = document.querySelector('svg');
    //renderedImage.attributes.setNamedItemNS("http://www.w3.org/2000/svg", "xmlns");
    renderedImage.setAttribute("xmlns", "http://www.w3.org/2000/svg");
}

function schotter(svg) 
{
    mySVG = svg;

    let gridWidth = 38;        // squares will be 10x10 and right next to each other
    //let radius = 20;
    let rotationOffset = 0.7;
    let positionOffset = 20;
    // 12 columns by 22 rows 
    for (let i = 0; i < 22; i++)
    {
        // we want a bunch of squares
        for (let j = 0; j < 12; j++)
        {
            // setup
            let point = new paper.Point((j * gridWidth) + positionOffset + (i * 0.5), (i * gridWidth) + positionOffset + (j * 0.7));
            let rotation = i * rotationNoise(i,j) + (rotationNoise(i,j) * (rotationOffset * i)) * 8;

            let path = mySVG.clone();
            path.scale(0.23 + (rotationNoise(i,j) * (i * 0.02)));
            path.position = point;
            path.rotate(rotation, point);
        }
    }
    mySVG.scale(0.0001);    // get rid of the big one
    exportSVG();
}