const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;

var engine,world;
var canvas;
var spaceship,spaceshipImage;

var backgroundImage;

var scene;

var edges; 

var spacecraftsgroup;

var spacecrafts,spacecraftImage ;

var score=0;

var asteroid,asteroidImage,asteroidGroup;

var sound;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,gameOverImage,restartImage,restart;
localStorage["HighestScore"]=0;



function preload(){
 spaceshipImage=loadImage("Player1225.webp");
 
 backgroundImage=loadImage("Space10.jpg");
 spacecraftImage=loadImage("space1.png");
 sound=loadSound("sound1.mp3");

asteroidImage=loadImage("asteroid.jpg");
gameOverImage=loadImage("go2.png");
restartImage=loadImage("restart1.webp");
}
function setup() {
  
 canvas= createCanvas(displayWidth-10,displayHeight-120);
 //createCanvas(1200,1000);
  scene=createSprite(0,0,displayWidth,displayHeight);
  scene.addImage(backgroundImage);
  scene.scale=3.5;
  scene.y=scene.height/2;
  

  engine=Engine.create();
  world=engine.world;

  spaceship=createSprite(displayWidth/2,600,100,50);
  spaceship.addImage(spaceshipImage);
  spaceship.scale=0.4;

  gameOver=createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage(gameOverImage);
  gameOver.scale=4;


  restart=createSprite(displayWidth/2,displayHeight/2+150);
  restart.addImage(restartImage);
  restart.scale=0.4;
  
  gameOver.visible=false;
  restart.visible=false;

  spacecraftsgroup=new Group();
  
  asteroidGroup=new Group();
}

function draw() {
  background(0); 
  
  scene.velocityY=-3; 

  if(scene.y<0){
  scene.y=scene.height/2;  
}

Engine.update(engine);

  if(gameState===PLAY){
    spaceship.velocityY=0;
    spaceship.velocityX=0;

    
  if(keyDown("UP_ARROW")){

    spaceship.velocityY=-7;
    spaceship.velocityX=0;
  }

  if(keyDown("DOWN_ARROW")){

    spaceship.velocityY=7;
    spaceship.velocityX=0;
  }

  if(keyDown("LEFT_ARROW")){

    spaceship.velocityY=0;
    spaceship.velocityX=-7;
  }
  if(keyDown("RIGHT_ARROW")){

    spaceship.velocityY=0;
    spaceship.velocityX=7;
  }

  if(spacecraftsgroup.collide(spaceship)){
    sound.play();
    score=score+1;
    spacecrafts.destroy();

    
    
    }

    edges=createEdgeSprites();
    spaceship.bounceOff(edges);
    
  spawnSpaceCrafts();

  spawnAsteroids();

    if(asteroidGroup.isTouching(spaceship)){

    gameState=END; 
   
    }
  }
   
   else if (gameState===END){
   spacecraftsgroup.destroyEach(0);
   asteroidGroup.destroyEach(0);


    spaceship.velocityX=0;
    spaceship.velocityY=0;

    scene.velocityX=0;
    scene.velocityY=0;
    
   gameOver.visible=true;
   restart.visible=true;


   if(mousePressedOver(restart)){
     reset();

   }
   }
   

  
 

 
 
  drawSprites();

  fill("white");
  textSize(40);
 text("Score:" +score,1000,50);

 fill("white");
  textSize(40);
 text("Highest Score:" +localStorage["HighestScore"],100,50);
}


function spawnAsteroids(){
  if(frameCount%50===0){
    asteroid=createSprite(1000,100,200,100);
    asteroid.x=Math.round(random(80,2000));
    asteroid.addImage(asteroidImage);
    asteroid.scale=0.08;
    
    asteroid.velocityY=3;
    asteroid.lifetime=150;
    asteroidGroup.add(asteroid);
  
  }
  
  
  }

function spawnSpaceCrafts(){
if(frameCount%80===0){
  spacecrafts=createSprite(1000,100,200,100);
  spacecrafts.x=Math.round(random(80,2000));
  spacecrafts.addImage(spacecraftImage);
  spacecrafts.scale=0.5
  
   spacecrafts.velocityY=3;
   spacecrafts.lifetime=150;
   spacecraftsgroup.add(spacecrafts);

}


}

function reset(){
gameState=PLAY;
gameOver.visible=false;
restart.visible=false;

if(localStorage["HighestScore"]<score){
  localStorage["HighestScore"]=score;

}

console.log(localStorage["HighestScore"]);
score=0;


}