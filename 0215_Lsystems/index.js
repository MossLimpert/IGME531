// https://stackoverflow.com/questions/29793849/how-to-create-a-simple-l-system-in-processing
// https://en.wikipedia.org/wiki/L-system#Stochastic_grammars
// https://observablehq.com/d/25846933bdd9d5b1
//

const rules = ({
    'd': 'r4g',
    'r': 'n0d4',
    '4': '4',
    'g': 'd00r',
    '0': '0',
    'n': '4g'
});



const iterations = 13;
const start = 'd0g';
const angle = 42;

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

const drawToPoints = (lindenmayerString) => {
    let startingPoint = [0, 0];
    let rotation = 0;
    let lineLength = 3;
    let points = [startingPoint];

    const moveForward = () => {
        const lastPoint = points[points.length - 1];
        const dx = Math.cos(rotation) * lineLength;
        const dy = Math.sin(rotation) * lineLength;
        points.push([lastPoint[0] + dx, lastPoint[1] + dy]);
    }

    const drawingRules = {
        'd': moveForward,
        'r': () => {
            rotation = rotation + angle * Math.PI / 180;
        },
        '4': 
    };
}