// https://www.redblobgames.com/grids/hexagons/
// https://www.redblobgames.com/grids/hexagons/implementation.html

const size = 30;  // each hexagon has radius (center to point)
let width = Math.sqrt(3) * size;    // pointy-top orientation
let height = 2 * size;
let halfWidth = width / 2;
let quarterHeight = height / 4;

let horizontalSpacing = 3/4 * width;
let verticalSpacing = 3/4 * height;

let rows = 6;
let columns = 6;

let hexCenters = [];

let canvas = document.querySelector("#dragon");
paper.setup(canvas);

// load in hexes
let hexes = [];

const loadSVG = () => {
    paper.project.importSVG('./p1_1.svg', (svg) => {
        hexes[0] = svg;
    });
    paper.project.importSVG('./p1_2.svg', (svg) => {
        hexes[1] = svg;
    });
    paper.project.importSVG('./p1_3.svg', (svg) => {
        hexes[2] = svg;
    });
    paper.project.importSVG('./p1_4.svg', (svg) => {
        hexes[3] = svg;
    });
}
const getRandHex = () => {
    let chance = Math.random();
    if (chance <= 0.25) {
        return hexes[0].clone();
    } else if (chance <= 0.5) {
        return hexes[1].clone();
    } else if (chance <= 0.75) {
        return hexes[2].clone();
    } else {
        return hexes[3].clone();
    }
}
const exportSVG = () => {
    document.body.appendChild(paper.project.exportSVG());
    let renderedImage = document.querySelector('svg');
    //renderedImage.attributes.setNamedItemNS("http://www.w3.org/2000/svg", "xmlns");
    renderedImage.setAttribute("xmlns", "http://www.w3.org/2000/svg");
}
const drawHexes = () => {
    // offset every even row, push it right by 1/2 width
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            // if even row, offset by half width
            let point, path;
            // https://github.com/makeit-labs/hexagon-grid
            let countOfEvenRows = Math.floor(i / 2);
            let countOfOddRows = i - countOfEvenRows;
            let yPoint = 2 * size * countOfOddRows + size * countOfEvenRows;
            let xPoint = (size * 2 * Math.sqrt(3/4)) * j;
            if (i % 2 == 0) {
                xPoint += size * Math.sqrt(3/4);
                yPoint += size / 2;
            }
            point = new paper.Point(xPoint + size, yPoint + size);
            path = getRandHex();
            //path = paper.Path.RegularPolygon(point, 6, size);
            path.scale(0.37);
            
            if (j % 2 == 0) {
                //path.rotate(240);
                path.scale(-1);
            }

            path.position = point;
            path.strokeColor = 'black';
        }
    }

    hexes[0].scale(0.0001);
    hexes[1].scale(0.0001);
    hexes[2].scale(0.0001);
    hexes[3].scale(0.0001);

    exportSVG();
}

loadSVG();
setTimeout(drawHexes, 500);



