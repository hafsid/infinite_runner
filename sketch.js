var edges;
var back,backImg;
var bob, bobImg, bobpImg, bobpause;
var coin, coinImg, coinpImg, coinpause;
var obstacle, ob1, ob2, ob3, ob4, ob5, ob6, ob7;
var invisibleGround;
var gamestate="start";
var score=0;
var playbimg, playb, pausebimg, pauseb, startbimg, startb;
var winimg, win;
var overimg, over;
var collectsound, collect;
var losesound, lose;

function preload(){

  backImg = loadImage("images/back.jpg");
  bobImg = loadAnimation("images/runner_01.png","images/runner_02.png","images/runner_03.png","images/runner_04.png","images/runner_05.png","images/runner_06.png","images/runner_07.png","images/runner_08.png");
  bobpImg= loadAnimation("images/bob_pause.png");
  coinImg = loadAnimation("images/ccc_03.png","images/ccc_04.png","images/ccc_05.png","images/ccc_06.png","images/ccc_07.png","images/ccc_08.png");
  coinpImg= loadAnimation("images/coin_pause.png");

  ob1= loadImage("images/ob_03.png");
  ob2= loadImage("images/ob_05.png");
  ob3= loadImage("images/ob_07.png");
  ob4= loadImage("images/ob_08.png");
  ob5= loadImage("images/ob_09.png");
  ob6= loadImage("images/ob_10.png");
  ob7= loadImage("images/ob_11.png");

  overimg= loadImage("images/gameover.png");
  winimg= loadImage("images/win.png");
  
  playbimg= loadImage("images/play.png");
  pausebimg= loadImage("images/pause.png");
  startbimg= loadImage("images/start.png");

  collect= loadSound("sounds/collect.mp3");
  lose= loadSound("sounds/lose.mp3");
}

function setup(){
  createCanvas(600,600);
  
  back = createSprite(100,100);
  back.addImage("bg",backImg);
  back.scale = 1.5;
////////////
  invisibleGround= createSprite(80,550,200,20);
  invisibleGround.visible= false;
////////////
  over= createSprite(300,300);
  over.addImage("overrr",overimg);
  over.visible= false;

  startb= createSprite(300,300,40,40);
  startb.addImage("startbb",startbimg);
  startb.scale= 1/2;

  pauseb= createSprite(500,30,40,40);
  pauseb.addImage("pausebb",pausebimg);
  pauseb.scale= 3/20;

  playb= createSprite(550,30,40,40);
  playb.addImage("playbb",playbimg);
  playb.scale= 3/20;
  playb.visible= false;
//////////
  bob= createSprite(70,480);
  bob.addAnimation("bobs",bobImg);

  bob.addAnimation("bobpausee",bobpImg);
///////////
  obGroup= new Group();
  coinGroup= new Group();
/////////
  edges = createEdgeSprites();
}

function draw(){
  background("lightgray");  
  
  if(gamestate === "start"){

    startb.visible=true;
    back.velocityX =0;
    bob.velocityY=0;
    obGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);   
    bob.visible=false;

    if(mousePressedOver(startb)){
      gamestate="play";
    }

  }
     if(gamestate==="play"){
    bob.changeAnimation("bobs",bobImg);
    bob.visible= true;
    back.velocityX = -(8+ score/10);
    startb.visible= false;
    if(back.x <0){
      back.x = back.width/2;
    }

    if(keyDown("space")){
      bob.velocityY= -15;
    }
    bob.velocityY+=0.5;
  
    if(obGroup.isTouching(bob)){
      gamestate="end";
      lose.play();
    }
    if(coinGroup.isTouching(bob)){
      coinGroup[0].destroy();
      score+=1;
      collect.play();
  }
   console.log(back.velocityX);
    coiny();
    spawnOb();

  if(mousePressedOver(pauseb)&& gamestate==="play"){
      gamestate="pause";
    }
  }
  if(gamestate==="pause"){
    bob.changeAnimation("bobpausee",bobpImg);
    coin.changeAnimation("coinpausee",coinpImg);
    back.velocityX =0;
    bob.velocityY=0;
    obGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    playb.visible= true;

    if(mousePressedOver(playb)&& gamestate==="pause"){
      gamestate="play";
      playb.visible= false;
      obGroup.setVelocityXEach(-5);
      coinGroup.setVelocityXEach(-5);
    }
  }

  if(gamestate==="end"){
     over.visible= true;
     back.velocityX=0;
     bob.changeAnimation("bobpausee",bobpImg);
     coin.changeAnimation("coinpausee",coinpImg);
     obGroup.setVelocityXEach(0);
     coinGroup.setVelocityXEach(0);
  }
  
  bob.collide(invisibleGround);

  drawSprites();

  text(mouseX+","+mouseY,mouseX,mouseY);

  textSize(30);
  text("SCORE: "+score,60,40);
}

function coiny(){
  if(frameCount %80===0){
    coin= createSprite(650,380);
    coin.addAnimation("coins",coinImg);
    coin.addAnimation("coinpausee",coinpImg);

    coin.velocityX= -(8+ score/10);
    coin.scale= 0.18;

    coinGroup.add(coin);
  }
}

function spawnOb(){
  if(frameCount %100===0){
    obstacle= createSprite(610,518);
    obstacle.velocityX= -(8+ score/10);

    var rand= Math.round(random(1,7));

    switch(rand){
      case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
      break;
      case 3: obstacle.addImage(ob3);
      break;
      case 4: obstacle.addImage(ob4);
      break;
      case 5: obstacle.addImage(ob5);
      break;
      case 6: obstacle.addImage(ob6);
      break;
      case 7: obstacle.addImage(ob7);
      break;
      default:break;
    }
    obGroup.add(obstacle);
    obGroup.lifetime= -10;
  }
}