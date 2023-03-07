// https://stackoverflow.com/questions/29793849/how-to-create-a-simple-l-system-in-processing
// https://en.wikipedia.org/wiki/L-system#Stochastic_grammars
// https://observablehq.com/d/25846933bdd9d5b1


// const rules = ({
//     'd': 'r44d4n0d',
//     'r': 'nd0g4d',
//     '4': '4',
//     'g': '4ddr4ng0r4g',
//     '0': '0',
//     'n': '4g0rdd4g'
// });
// const rules = ({
//     'd': 'dr4g0n',
//     'r': '4nd40grrr4d',
//     '4': '4',
//     'g': 'ggg',
//     '0': '0',
//     'n': 'dr4g4ddd'
// });
// const rules = ({
//     'd': 'dr4gn',
//     'r': 'rn4',
//     '4': '4',
//     'g': 'gg0gnd4',
//     '0': '0',
//     'n': '4d0'
// });
const rules = ({
    'd': 'nr4ng0',
    'r': 'n4g4ddddddddddddddddddn',
    '4': '4',
    'g': 'ngdrn0d',
    '0': '0',
    'n': '4ndng'
});
// const rules = ({
//     'd': 'ngggggdgg',
//     'r': 'dnd0nn44',
//     '4': '4',
//     'g': '4d0n',
//     '0': '0',
//     'n': 'rnrdd4d'
// });

const iterations = 5;
const start = 'r4g';
let angle = 55;
let startingPoint = [-500,100];
let currentAngle = 360;
let lineLength = 5;
let points = [startingPoint];
let stateStack = [];

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

let bigString = expand(iterations,start);

//let startingPoint = [-200, -200];


const newPosition = () => {
    const currentPosition = points.slice(-1)[0];
    const nextPoint = [
        currentPosition[0] + lineLength * Math.cos(currentAngle * Math.PI / 180),
        currentPosition[1] + lineLength * Math.sin(currentAngle * Math.PI / 180),
    ];
    return nextPoint;
}
const moveForward = () => {
    points.push(newPosition());
}
const turnRight = () => {
    currentAngle += angle;
}
const turnLeft = () => {
    currentAngle -= angle;
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
    'd': moveForward,
    'r': turnRight,
    '4': () => {
        push();
        turnLeft();
    },
    'g': turnLeft,
    '0': () => {
        pop();
        turnRight();
    },
    'n': () => {}
};

for (let i = 0; i < bigString.length; i++) {
    const letter = bigString[i];

    const interpret = drawingRules[letter];
    interpret();
}




const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
polyline.setAttribute('points', points.join(' '));
polyline.setAttribute('fill', 'none');
polyline.setAttribute('stroke', 'black');
polyline.setAttribute('stroke-width', '2px');

// add the polyline to the svg
const svg = document.querySelector('svg');
svg.appendChild(polyline);