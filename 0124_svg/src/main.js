// head
var topLeft = new Point(50, 50);
var size = new Size(150, 150);
var rectangle = new Rectangle(topLeft, size);
var path = new Path.Ellipse(rectangle);
path.fillColor = 'black';

// ears
var location = new Point(75,70);
var earL = new Path.RegularPolygon(location, 3, 25);
earL.rotate(-45, location);
earL.fillColor = 'black';
var location = new Point(180, 70);
var earR = new Path.RegularPolygon(location, 3, 25);
earR.rotate(45, location);
earR.fillColor = 'black';

// body
location = new Point(75, 150);
size = new Size(100, 200);
rectangle = new Rectangle(location, size);
var shape = new Shape.Rectangle(rectangle);
shape.fillColor = 'black';

// front legs
location = new Point(75, 150);
size = new Size(25, 250);
rectangle = new Rectangle(location, size);
shape = new Shape.Rectangle(rectangle);
shape.fillColor = 'black';
location = new Point(125, 150);
rectangle = new Rectangle(location, size);
shape = new Shape.Rectangle(location, size);
shape.fillColor = 'black';

// hind leg
location = new Point(100, 220);
size = new Size(100, 175);
rectangle = new Rectangle(location, size);
path = new Path.Ellipse(rectangle);
path.rotate(-20, new Point(200, 160));
path.fillColor = 'black';
location = new Point (160, 375);
size = new Size(105, 25);
rectangle = new Rectangle(location, size);
shape = new Shape.Rectangle(rectangle);
shape.fillColor = 'black';

// tail
var tail = [
    new Point(150, 300),
    new Point(250, 375),
    new Point(325, 250),
    new Point(325, 250),
    new Point(360, 200),
    new Point(400, 175)
]
// lol this technically counts as iteration :sob:
for (var i = 0; i < tail.length; i+=3)
{
    path = new Path.Arc(tail[i], tail[i+1], tail[i+2]);
    path.strokeWidth = 15;
    path.strokeColor = 'black';
}

document.body.appendChild(project.exportSVG());