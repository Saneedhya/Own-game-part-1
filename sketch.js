var backImage,backgr;
var player, player_running;
var ground,ground_img;

var CarrotGroup, CarrotImage;
var obstaclesGroup, obstacle_img;
var carrot;
var gameOver;
var score=0;


function preload(){
  backImage=loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

 CarrotImage = loadImage("carrot.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  carrotGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(carrotGroup.isTouching(player)){
      carrotGroup.destroyEach();
    score = score + 1;
    }
    //switch(score){
        //case 10: player.scale=0.12;
               // break;
        //case 20: player.scale=0.14;
                //break;
        //case 30: player.scale=0.16;
                //break;
        //case 40: player.scale=0.18;
                //break;
        //default: break;
    //}
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawncarrots();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
    //player.scale=0.08;
    player.velocityY=0;
    player.velocityX=0;
    ground.velocityX=0;
    obstaclesGroup.destroyEach();
    carrotGroup.destroyEach();
    player.visible = false;
    background(0);
    stroke("black");
    textSize(40);
    fill("black");
    text("GameOver: " , 200,50);
    // score=score-2;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawncarrots() {
  //write code here to spawn the food
  if (frameCount % 120 === 0) {
     carrot = createSprite(600,250,40,10);
    carrot.y = random(120,200);    
    carrot.addImage(CarrotImage);
    carrot.scale = 0.5;
    carrot.velocityX = -5;
     //assign lifetime to the variable
    carrot.lifetime = 300;
    player.depth = carrot.depth + 1;
    
    //add each carrot to the group
    carrotGroup.add(carrot);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
