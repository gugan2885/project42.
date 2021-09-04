var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1
var blast;
function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading=createElement("h1");
  scoreboard=createElement("h1");
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  scoreboard.html("Score: "+score);
  scoreboard.style('color:blue');
  scoreboard.position(width-200,20);

  heading.html("life: "+life);
  heading.style('color:red');
  heading.position(width-300,20);


  if(gameState===1){
    gun.y=mouseY  
    if (keyDown("space")) {
      shootBullet();
      
    }
    if(frameCount % 80===0){
      drawBlueBubble();
    }
    if(frameCount % 100===0){
      drawRedBubble();
    }
    if(blueBubbleGroup.collide(bulletGroup)){
      HandleBubbleCollision(blueBubbleGroup);
     
    }
    if(redBubbleGroup.collide(bulletGroup)){
      HandleBubbleCollision(redBubbleGroup);
     
    }
    if(blueBubbleGroup.collide(backBoard)){
      HandleGameOver(blueBubbleGroup);
      
    }
    if(redBubbleGroup.collide(backBoard)){
      HandleGameOver(redBubbleGroup);
     
    }
    drawSprites();
   
  }
 
 
}
function shootBullet() {
   bullet= createSprite(100, 400, 60, 10);
  bullet.addImage(bulletImg);
//  bullet.x = 260;
  bullet.y=gun.y;
  bullet.velocityX = 4;
  bullet.lifetime = 70;
  bullet.scale = 0.3;
  bulletGroup.add(bullet);
}
function drawBlueBubble() {
  var bluebubble= createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
 // bluebubble.addImage("g",blastImg);
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  bluebubble.scale = 0.1;
  blueBubbleGroup.add(bluebubble);
}
function drawRedBubble() {
  var redbubble= createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
 // redbubble.addImage("f",blastImg);
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redbubble.scale = 0.1;
  redBubbleGroup.add(redbubble);
}
function HandleBubbleCollision(bubbleGroup){
     if(life>0){
       score=score+1;
     }

     blast=createSprite(bullet.x+70,bullet.y,60,10);
     blast.addImage(blastImg);
     blast.scale=0.4;
     blast.lifetime=10;

     bulletGroup.destroyEach();
     bubbleGroup.destroyEach();

}
function HandleGameOver(bubbleGroup){
      life=life-1;

      if(life===0){
       // gameState=2;
        swal({
          title: `Game Over`,
          text: "Oops you lost the game....!!!",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
          imageSize: "100x100",
          confirmButtonText: "Thanks For Playing"
        });
      
    }
    
    bulletGroup.destroyEach();
     bubbleGroup.destroyEach();
}

