let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

// following this tutorial
// https://lautarolobo.xyz/blog/use-javascript-and-html5-to-code-a-fractal-tree/

// i am going to draw 4 2,500 iteration trees

ctx.fillStyle = "black";
ctx.fillRect(0,0,1280,720);

ctx.lineWidth = 1;

let a = 11;
let b = 12;
let c = 12;
let d = 7;

let count = 0;

function drawTree(x, y, length, angle, color, iterator) {
    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = color;
    

    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0,0);
    ctx.lineTo(0,-length);
    ctx.stroke();

    //console.log(iterator);

    console.log(count);

    count++;
    iterator -= 1;
    if (iterator <=0)
    {
        ctx.restore();
        return;
    }

    // if (length < 10)
    // {
    //     ctx.restore();
    //     return;
    // }

    drawTree(0, -length, length*0.8, -20, color, iterator);
    drawTree(0, -length, length*0.8, 20, color, iterator);

    ctx.restore();
}

drawTree(1000, 720, 200, -20, "green", a);
drawTree(700, 720, 150, 35, "blue", b);
drawTree(400, 720, 120, -10, "red", c);
drawTree(200, 720, 75, 40, "purple", d);

let span = document.querySelector("#branches");
span.innerHTML = count;