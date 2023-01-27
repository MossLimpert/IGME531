//const { Point, Size, Rectangle, Path } = require("paper/dist/paper-core");

// for storing simplex noise values generating polygons... l8r
var punchArray = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

// position punches
var rows = [];
var row1 = [];
var a1 = new Point(93, 93);    // using 25px margins
var a2 = new Point(210, 93);
var a3 = new Point(317, 93);
var a4 = new Point(429, 93);
row1.push(a1);
row1.push(a2);
row1.push(a3);
row1.push(a4);
var row2 = [];
var b1 = new Point(93, 210);
var b2 = new Point(210, 210);
var b3 = new Point(317, 210);
var b4 = new Point(429, 210);
row2.push(b1);
row2.push(b2);
row2.push(b3);
row2.push(b4);

var size = new Size(45,45);

// body
location = new Point(75, 150);
size = new Size(100, 200);
rectangle = new Rectangle(location, size);
var shape = new Shape.Rectangle(rectangle);
shape.fillColor = 'black';

// draw punches
for (var j = 0; j < rows.length; j++) {
    var rectangle, path;
    for (var i = 0; i < rows[j].length; i++) {
        rectangle = new Rectangle(row[i], size);
        path = new Path.Ellipse(rectangle);
        path.fillColor = 'black';
    }
}
