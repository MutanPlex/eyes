const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let eyes = [];
let theta;

const mouse = {
    x: undefined,
    y: undefined
}
let colors = ["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#4B0082","#9400D3"];
window.addEventListener('mousemove', event =>{
    mouse.x = event.x;
    mouse.y = event.y;
});

class Eye {

    constructor(x,y,radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

        let iris_dx = mouse.x - this.x;
        let iris_dy = mouse.y - this.y;
        theta = Math.atan2(iris_dy,iris_dx);
        let iris_x = this.x + Math.cos(theta) * this.radius / 10;
        let iris_y = this.y + Math.sin(theta) * this.radius / 10;
        ctx.beginPath();
        ctx.arc(iris_x,iris_y,this.radius/2,0,Math.PI*2,true);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();

        let pupil_dx = mouse.x - this.x;
        let pupil_dy = mouse.y - this.y;
        theta = Math.atan2(pupil_dy,pupil_dx);
        let pupil_x = this.x + Math.cos(theta) * this.radius / 5;
        let pupil_y = this.y + Math.sin(theta) * this.radius / 5;
        ctx.beginPath();
        ctx.arc(pupil_x,pupil_y,this.radius/4,0,Math.PI*2,true);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();

    }
}
function init(){
    eyes = [];
    let overlap = false;
    let numberOfEyes = 200;
    let protection = 15000;
    let counter = 0;

    //create eyes
    while(eyes.length < numberOfEyes && counter < protection){
        let eye = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.floor(Math.random() * 100) + 10
        }
        overlap = false;
        for(let i = 0; i < eyes.length; i++){
            let previousEye = eyes[i];
            let dx = eye.x - previousEye.x;
            let dy = eye.y - previousEye.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < eye.radius + previousEye.radius){
                overlap = true;
                break;
            }
        }
        if(!overlap){
            eyes.push(new Eye(eye.x,eye.y,eye.radius));
        }
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < eyes.length; i++){
        eyes[i].draw();
    }
}
init();
animate();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})