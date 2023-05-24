const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
let bop = new Audio ('bop.m4a');





// context.fillStyle = "red";
// context.beginPath();
// context.arc( 300,350,100,0, Math.PI*2,false);

// context.closePath();
// context.fill();

function drawRect(x,y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);

}  
function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc( x,y,r,0, Math.PI*2,false);
    context.closePath();
    context.fill();
}
function drawText(text,x, y, color){
    context.fillStyle = color;
    context.font = "75px gill sans";
    context.fillText(text, x, y);
}

function drawNet(){
    for(let i = 0; i <=canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}


let rectX = 0;

function render(){
    drawRect(0,0,600,400, "black");
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    drawNet();
    drawCircle(ball.x, ball.y, ball.radius, ball.speed, ball.velocityX, ball.velocityY, ball.color);
    drawText(user.score, canvas.width/4, canvas.height/5, "WHITE");
    drawText(com.score, 3*canvas.width/4, canvas.height/5, "WHITE");
}
function game(){
    update(); //movement
    computerBrain();//computer simple ai
    render();
    updateScore();//updating score 
}

const framePerSecond = 50;

setInterval( game, 1000/framePerSecond ); // call game (); 50 times every 1000ms = 1 s


const user = {
    x: 0,
    y: canvas.height/2 - 100/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}
const com = {
    x: canvas.width - 10,
    y: canvas.height/2 - 100/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}
const net = {
    x:canvas.width/2 - 2/2,
    y: 0,
    width : 4,
    height : 10,
    color : "WHITE",
}
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius : 10,
    speed: 5,
    velocityX : .25,
    velocityY : .25,
    color : "WHITE",
}
function update(){
    // d/t * t = d
    ball.x += ball.velocityX * 1000/framePerSecond; 
    ball.y += ball.velocityY * 1000/framePerSecond; 
    if ( ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0 ){
         ball.velocityY *= -1;                               
    }
    if ( ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.velocityX *= -1;                         
   }
   let player = (ball.x < canvas.width/2) ? user : com;

   if( collision( ball, player)){
        bop.play();
        ball.velocityX*=-1
        ball.velocityY*=(Math.floor(Math.random() * 2) == 1) ? 1 : -1;
   }
}

function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;

    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    return (b.right == p.left || b.left == p.right) && b.top < p.bottom && b.bottom > p.top;
    

}

function computerBrain(){
    com.y = ball.y*.5;
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.speed = 5;
    //ball.velocityX = -ball.velocityX;

}
function updateScore(){
    // computer scored
    if(ball.x - ball.radius < 0){
        com.score++;
        resetBall();

    }
    // user scored
    else if( ball.x +ball.radius > canvas.width){
        user.score++;
        resetBall();
    }
}

window.addEventListener("keydown",movePaddle);

function movePaddle(evt){
    if(evt.keyCode == 38){
        if (user.y >= 0){
            // paddle up
            user.y -= 40;
        }
            
        
    } else if (evt.keyCode == 40){
        if (user.y + user.height <= canvas.height){
            // paddle down
            user.y += 40;
        }
    }    
}







