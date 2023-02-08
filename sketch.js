var cooldrink1,cooldrinkimg
var forest
var kid
var zombie
var watermelon
var ground
var gameState = "play"
var energy 
var rand
var monstergroup
var monster
var bullet
var bulletimg
var score = 0
var energyamount = 0
var gameover

function preload() {
 energy2img = loadImage ("assets/energy2.png");
 forest = loadAnimation ("assets/bg_landscape06.png","assets/pine_trees.png");
 kidimg = loadAnimation ("assets/shooter_1.png","assets/shooter_2.png","assets/shooter_3.png");
 monsterimg = loadAnimation ("assets/monster_1.png", "assets/monster_2.png");
 energy1img = loadImage("assets/energy1.png");
 groundimg = loadImage ("assets/ground2.png");
 bulletimg = loadImage ("assets/bullet1.png");
 gameoverimg = loadImage ("assets/sprite_0.png");




  
}

function setup () {
createCanvas(800,800);

ground=createSprite (300, 190, 600, 20) ;
ground.addImage ("ground",groundimg) ;
ground.velocityX = -7

ground2 = createSprite (300, 220,600,20);
ground2.visible = false

kid = createSprite(250,190)
kid.addAnimation("kid", kidimg)
kid.scale = 0.2

gameover = createSprite (450,125)
gameover.addImage("gameover", gameoverimg)
gameover.scale = 0.2
gameover.visible = false

monstergroup = new Group ()
energygroup = new Group ()
bulletgroup = new Group ()
}


function draw() {
  background(255,255,255);  

  text ("score"+score,25,25)
  text ("energyamount"+energyamount, 700,25)
   if (gameState === "play") {
    

   
 if (ground.x<0) {
ground.x = ground.width/2
 }


spawnEnergy() 
spawnmonster()




if (keyDown("UP_ARROW")) {

  kid.velocityY=-10


}
kid.velocityY+=0.5;


if (keyDown("ENTER")) {

bullet = createSprite (250,150, 35,45)
bullet.addImage ("bullet",bulletimg)
bullet.scale = 0.1

bullet.velocityX = 10
bulletgroup.add(bullet)
}

if (keyDown("space")) {

kid.velocityY = -7
kid.velocityY +=0
}
if (bulletgroup.isTouching(monstergroup)) {
monstergroup.destroyEach ()
score += 5
  } 

  if (score >= 150) { 
  monstergroup.setVelocityXEach(-10)
  ground.velocityX = -12
  energygroup.setVisible = false
  if (frameCount %25 === 0) {
    monster = createSprite (800,190)
  monster.addAnimation ("monster",monsterimg)
  monster.scale = 0.05
  monster.velocityX = -5
  monster.velocityX *= 3.5
  monstergroup.add(monster)
  if (keyDown("ENTER")) {

    bullet = createSprite (250,150, 35,45)
    bullet.addImage ("bullet",bulletimg)
    bullet.scale = 0.1
    
    bullet.velocityX = 7
    bulletgroup.add(bullet)
    }
 
   }
  }

if (kid.isTouching(monstergroup)) {
gameState = "end"

}

if (energygroup.isTouching(kid)) {

energyamount += 1
energygroup.setVisibleEach(false)
}


   }
else if (gameState === "end") {
  gameover.visible = true
  kid.visible = false
  ground.velocityX = 0
  energygroup.setVelocityXEach(0);
  monstergroup.setVelocityXEach(0);
  bulletgroup.setVelocityXEach(0);
  background("red")
}
kid.collide(ground2)
drawSprites()

}


function spawnmonster () {
  if (frameCount %50 === 0) {
    monster = createSprite (800,190)
  monster.addAnimation ("monster",monsterimg)
  monster.scale = 0.05
  monster.velocityX = -5
  monster.velocityX *= 3.5
  monstergroup.add(monster)
 
   }
  

  }
  


  
function spawnEnergy() {

if (frameCount %125 === 0) {

energy = createSprite (800,180);
energy.velocityX = -5
var rand = Math.round(random(1,2))
switch(rand) {

  case 1 : energy.addImage(energy1img) ; 
  break ; 
  case 2 : energy.addImage (energy2img) ; 
  break ; 
  default : break ; 
}
energy.scale = 0.1
energy.lifetime=170
energygroup.add(energy) ;

}
}
