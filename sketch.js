var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

//declaring global variables
var ground;
var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight=300;

var particle;
var score = 0;
var turn = 0;

var gameState = "play";

function setup() {
  //creating canvas
  createCanvas(800, 800);

  //creating the engine
  engine = Engine.create();
  world = engine.world;

  //creating the gorund onject
  ground = new Ground(width/2,height,width,20);

  //creating the division objects
  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //creating the plinko objects
  //top level
  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,75));
  }

  //level 2
  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,175));
  }

  //level 3
  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }

  //level 4
  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,375));
  }
   
}
 

function draw() {
  background("black");

  //displaying score
  fill("white");
  textSize(25)
  text("Score : "+score, 20, 30);

  //displaying scores as per divisions
  fill("white");
  textSize(23);
  text("500", 25, 520);
  text("500", 105, 520);
  text("500", 180, 520);
  text("500", 260, 520);
  text("100", 340, 520);
  text("100", 420, 520);
  text("100", 500, 520);
  text("200", 580, 520);
  text("200", 660, 520);
  text("200", 740, 520);

  //updating the engine
  Engine.update(engine);

  //displaying the ground
  ground.display();

  //checking the game states
  if (gameState === "end"){
    textSize(45);
    text("Game Over", 300, 450);
  }

  //displaying the divisions
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
 
  //displaying the plinkos
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  //creating the particle objects
   /*if(frameCount%60===0){
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
     score++;
   }
 
  //displaying the particles
  for (var j = 0; j < particles.length; j++) {
     particles[j].display();
  }*/

  //mousePressed();

  if (particle != null){
    particle.display();
    if (particle.body.position.y > 760){
      if (particle.body.position.x < 300 && particle.body.position.x > 0){
        score+=500;
        particle = null;
        if(turn>=5){
          gameState = "end";
        }
      }
      
      else if(particle.body.position.x < 530 && particle.body.position.x > 301){
        score+=100;
        particle = null;
        if(turn>=5){
          gameState = "end";
        }
      }

      else if(particle.body.position.x < 800 && particle.body.position.x > 531){
        score+=200;
        particle = null;
        if(turn>=5){
          gameState = "end";
        }
      }
    }
  }
  
}


function mousePressed(){
  if (gameState!=="end"){
    turn++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}

