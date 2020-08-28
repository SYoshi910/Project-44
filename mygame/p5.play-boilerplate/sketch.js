var player, camx, health;
var camSpeed;
var test;
var ground, isJumping, isGrounded;
var enemies = [];
var platforms = [];
var score = 0;
var gameState = "play";
var second = 166;
var timer = 30;
var defaultTime = 30;
var shurikens = [];
var toggle = false;
var shuriken;
var damageCount, healthbar;
function setup() {
  createCanvas(1600,800);
  player = createSprite(500,700,100,100);
  player.shapeColor = "lime";
  playSpeed = 0;
  camSpeed = 0;
  health = 300;
  //healthbar = createSprite(800,70,health*2,100);
  ground = createSprite(camera.position.x+ 800,800,1600,20);
  isJumping = true;
  isGrounded = true;
  platform = new Platform(1800,575,8);
  platforms.push(platform);

  platform2 = new Platform(2500,430,5);
  platforms.push(platform2);

  platform3 = new Platform(3400,500,12);
  platforms.push(platform3);

  platform4 = new Platform(4000,300,4);
  platforms.push(platform4);

  platform5 = new Platform(5000,400,6);
  platforms.push(platform5);
  
  platform6 = new Platform(6200,600,20);
  platforms.push(platform6);

  platform7 = new Platform(7200,400,3);
  platforms.push(platform7);

  platform8 = new Platform(7700,300,2);
  platforms.push(platform8);

  platform9 = new Platform(8300,400,1);
  platforms.push(platform9);

  platform10 = new Platform(9000,815,10);
  platforms.push(platform10);

  enemy = new Enemy(1900,400);
  enemies.push(enemy);

  

  enemy2 = new Enemy(2550,500);
  enemies.push(enemy2);

  

  enemy3 = new Enemy(3550,420);
  enemies.push(enemy3);

  

  enemy4 = new Enemy(5050,300);
  enemies.push(enemy4);


  enemy5 = new Enemy(6000,400);
  enemies.push(enemy5);

  enemy6 = new Enemy(6600,400);
  enemies.push(enemy6);

  

  enemy7 = new Enemy(8700,750);
  enemies.push(enemy7);
  
}

function draw() {
  background(20,20,20); 
  camera.position.x += camSpeed;
  //healthbar.width = health*2;
  if(gameState == "play"){
    if(frameCount % 166 == 0 && timer >= 0){
      timer -= 1;
    }
    if(timer == 0){
      gameState = "end";
    }
    
    camera.off();
    textSize(40);
    fill("white");
    if(timer <= 10){
      fill("red");
    }
    text(timer, 40, 50);
    camera.on();
    if(keyDown("d")){
      player.velocityX = 5;
     // camSpeed = 5;
    }
    if(keyWentUp("d")){
      player.velocityX = 0;
      camSpeed = 0;
    }
    if(keyDown("d") && player.x >= camera.position.x + 250){
      player.velocityX = 5;
      camSpeed = 5;
    }
    
    ground.x = camera.position.x;
    if(keyDown("a") && player.x >= 101){
      player.velocityX = -5;
      //camSpeed = -5;
    }
    if((keyDown("a") && player.x <= camera.position.x - 500) && camera.position.x >= 801){
      player.velocityX = -5;
      camSpeed = -5;
    }
  //  console.log(camera.position.x);
    if(keyWentUp("a")){
      player.velocityX = 0;
      camSpeed = 0;
    }
    if(mouseDown() && toggle == false && shuriken == undefined){
      shuriken = new Shuriken();
      toggle = true;
    }
    if(mouseWentUp()){
      toggle = false;
    }
    if(keyDown("SPACE") && !isJumping){ 
      player.velocityY = -8;
      isJumping = true;
      //console.log("jumped");
      isGrounded = false;
    }
    if(isJumping){
      player.velocityY += 0.12;
    }
    if(player.y >= 738){
      isJumping = false;
      isGrounded = true;
    }
    enemies.forEach(element =>{
      if(element.enemy.y <= 738){
        element.enemy.velocityY += 0.12;
      }
      element.enemy.collide(ground);
      for(var i = 0; i < platforms.length; i++){
        element.enemy.collide(platforms[i].plat);
      }
      
      if(camera.position.x >= element.enemy.x - 849){
        element.active(true);
      }
      if(shuriken != null){
        if(element.enemy.isTouching(shuriken.ken)){
          element.health -= 50;
          shuriken.ken.destroy();
          shuriken = null;
        }
      }
     /* if(element.enemy.isTouching(player)){
        damageCount += 1;
      }
      else{
        damageCount = 0;
      }
      if(damageCount >= 166){
        health -= 1;
      }*/
      if(element.health == 0){
        element.enemy.destroy();
        element.health = 1;
        element.bar.destroy();
        element = null;
        score += 1;
      }
    })
    if(shuriken != undefined){
      shuriken.display();
      if(shuriken.ken.x > camera.position.x + 1000 || shuriken.ken.x < camera.position.x - 1000 || shuriken.ken.y > height || shuriken.ken.y < 0){
        shuriken.ken.destroy();
        shuriken = null;
      }
      
    }
    /*platforms.forEach(element =>{
      player.collide(element);
      if(player.y == element.y - 75 && player.x + 50 >= element.x - element.width/2 && player.x - 50 <= element.x + element.width/2 ){
        isJumping = false;
        console.log(player.x);
        if(player.x + 50 <= element.x - element.width/2 || player.x - 50 >= element.x + element.width/2){
          isJumping = true;
        }
      }
    })*/
    for(var element in platforms){
      player.collide(platforms[element].plat);
      if(player.y == platforms[element].plat.y - 75 && player.x + 50 >= platforms[element].plat.x - platforms[element].plat.width/2 && player.x - 50 <= platforms[element].plat.x + platforms[element].plat.width/2 ){
        isJumping = false;
        platforms[element].plat.shapeColor = "yellow";
        console.log(health);
        if(player.x + 50 <= platforms[element].plat.x - platforms[element].plat.width/2 || player.x - 50 >= platforms[element].plat.x + platforms[element].plat.width/2){
          isJumping = true;
        }
      }
      if(platforms[element].plat.shapeColor == "yellow" && platforms[element].score == true){
        score += 1;
        platforms[element].score = false;
      }
      //console.log(platforms[element].y);
    }
    if(score == 16){
      gameState = "win";
    }
  }
  if(gameState == "win"){
    player.velocityX = 0;
    player.velocityY = 0;
    textSize(40);
    fill("lime");
    if(defaultTime >= 16){
      text("You Won! Press Space to Play Again at a Harder Difficulty", camera.position.x - 520,500);
      camSpeed = 0;
      if(keyWentUp("SPACE")){
        score = 0;
        camera.position.x = 800;
        player.x = 300;
        player.y = 700;
        enemies.forEach(i =>{
          i.enemy.destroy();
          i.bar.destroy();
          i = null;
        })
        enemies = new Array;
        enemy = new Enemy(1900,400);
        enemies.push(enemy);

        enemy2 = new Enemy(2550,500);
        enemies.push(enemy2);

        enemy3 = new Enemy(3550,420);
        enemies.push(enemy3);

        enemy4 = new Enemy(5050,300);
        enemies.push(enemy4);

        enemy5 = new Enemy(6000,400);
        enemies.push(enemy5);

        enemy6 = new Enemy(6600,400);
        enemies.push(enemy6);

        enemy7 = new Enemy(8700,750);
        enemies.push(enemy7);
        platforms.forEach(i =>{
          i.plat.shapeColor = "blue";
          i.score = true;
        })
        isJumping = true;
        isGrounded = false;
        gameState = "play";
        defaultTime -= 5
        timer = defaultTime;
        second = 166;
      }
    }
    else{
      text("You Are a True Ninja Warrior! Press Space Again to Play in MASTER MODE", camera.position.x - 650,500);
      camSpeed = 0;
      if(keyWentUp("SPACE")){
        score = 0;
        camera.position.x = 800;
        player.x = 300;
        player.y = 700;
        enemies.forEach(i =>{
          i.enemy.destroy();
          i.bar.destroy();
          i = null;
        })
        enemies = new Array;
        enemy = new Enemy(1900,400);
        enemies.push(enemy);

        enemy2 = new Enemy(2550,500);
        enemies.push(enemy2);

        enemy3 = new Enemy(3550,420);
        enemies.push(enemy3);

        enemy4 = new Enemy(5050,300);
        enemies.push(enemy4);

        enemy5 = new Enemy(6000,400);
        enemies.push(enemy5);

        enemy6 = new Enemy(6600,400);
        enemies.push(enemy6);

        enemy7 = new Enemy(8700,750);
        enemies.push(enemy7);
        platforms.forEach(i =>{
          i.plat.shapeColor = "blue";
          i.score = true;
        })
        isJumping = true;
        isGrounded = false;
        gameState = "play";
        defaultTime -= 5
        timer = defaultTime;
        second = 166;
      }
    }
  }
  else if(gameState == "end"){
    player.velocityX = 0;
    player.velocityY = 0;
    textSize(40);
    fill("red");
    text("Too bad, you Lost! Press Space to Try Again", camera.position.x - 400,500);
    camSpeed = 0;
    if(keyWentUp("SPACE")){
      score = 0;
      camera.position.x = 800;
      player.x = 300;
      player.y = 700;
      enemies.forEach(i =>{
        i.enemy.destroy();
        i.bar.destroy();
        i = null;
      })
      enemies = [];
      enemy = new Enemy(1900,400);
      enemies.push(enemy);

      enemy2 = new Enemy(2550,500);
      enemies.push(enemy2);

      enemy3 = new Enemy(3550,420);
      enemies.push(enemy3);

      enemy4 = new Enemy(5050,300);
      enemies.push(enemy4);

      enemy5 = new Enemy(6000,400);
      enemies.push(enemy5);

      enemy6 = new Enemy(6600,400);
      enemies.push(enemy6);

      enemy7 = new Enemy(8700,750);
      enemies.push(enemy7);
      platforms.forEach(i =>{
        i.plat.shapeColor = "blue";
        i.score = true;
      })
      isJumping = true;
      isGrounded = false;
      gameState = "play";
      timer = defaultTime;
      second = 166;
      console.log("hola");
    }
  }
  console.log(score);
  player.collide(ground);
 // console.log(player.y);
  
  drawSprites();
  
}
