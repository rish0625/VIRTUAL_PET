var dog, dogImage, happyDogImage, database, foodS, foodStock;

function preload()
{
	dogImage = loadImage("dogimages/Dog.png");
  happyDogImage = loadImage("dogimages/happydog.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250, 300, 30, 30);
  dog.addImage(dogImage);
  dog.scale = 0.3;

  database = firebase.database();
  
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  drawSprites();
  
  stroke("white");
  textSize(12);
  fill("white");
  text("Food Remaining: " + foodStock, 30, 150);

  stroke("white");
  textSize(20);
  fill("white");
  text("TIP: Press Up Arrow Key to feed your Dog!", 60, 50);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref("/").update({
    Food:x
  })
}



