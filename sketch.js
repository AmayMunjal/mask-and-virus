var PLAY = 1;
var END = 0;
var gameState = PLAY;
var player,playerImg
var player, player_running, player_collided;
var ground, invisibleGround, groundImage;
var virus,virusImg,mask,maskImg
var maskGroup, cloudImage;
var virusGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound, collidedSound;
var rand
var gameOver, restart;


function preload(){
  //jumpSound = loadSound("assets/sounds/jump.wav")
  //collidedSound = loadSound("assets/sounds/collided.wav")
  
  
  
  playerImg = loadImage("PlayerStanding.png")
  maskImg = loadImage("mask1.png")
  virusImg = loadImage("virus1.png")
  
  groundImage = loadImage("ground2.png");
  
  
 // gameOverImg = loadImage("assets/gameOver.png");
  //restartImg = loadImage("assets/restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  /*sun = createSprite(width-50,100,10,10);
  sun.addAnimation("sun", sunAnimation);
  sun.scale = 0.1*/
  
  player = createSprite(50,height-70,20,50);
  player.addImage(playerImg)
  player.scale = 0.5
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  virusGroup = new Group()
  maskGroup = new Group()
/*  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;*/
  
 
  // invisibleGround.visible =false

  
  
  score = 0;
}

function draw() {
  //player.debug = true;
  background("blue");
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if(  (keyDown("space") || touches.length > 0 )&& player.y  >= height-120){
    //  jumpSound.play()
      player.velocityY = -10;
       touches = [];
    }
    
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    player.collide(invisibleGround);
    rand = Math.round(random(1,2))
    if (rand === 1){
      spawnMask()
    }
    else if(rand === 2){
      spawnObstacles()
      
    }

  
    if(virusGroup.isTouching(player)){
        //collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
   // gameOver.visible = true;
  //  restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    maskGroup.setVelocityXEach(0);
    virusGroup.setVelocityXEach(0);
    
   
    
    //set lifetime of the game objects so that they are never destroyed
    maskGroup.setLifetimeEach(-1);
    virusGroup.setLifetimeEach(-1);
    
    if(touches.length>0) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var virus = createSprite(600,height-95,20,30);
    virus.addImage(virusImg)
    virus.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    virus.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles

    
    //assign scale and lifetime to the obstacle           
    virus.scale = 0.3;
    virus.lifetime = 300;
    virus.depth = player.depth;
    player.depth +=1;
    //add each obstacle to the group
    virusGroup.add(virus);
  }
}
function spawnMask() {
  if(frameCount % 60 === 0) {
    var mask = createSprite(600,height-95,20,30);
    mask.addImage(maskImg)
    mask.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    mask.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles

    
    //assign scale and lifetime to the obstacle           
    mask.scale = 0.3;
    mask.lifetime = 300;
    mask.depth = player.depth;
    player.depth +=1;
    //add each obstacle to the group
    maskGroup.add(mask);
  }
}
function reset(){
 /* gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  player.changeAnimation("running",player_running);
  
  score = 0;*/
  
}
