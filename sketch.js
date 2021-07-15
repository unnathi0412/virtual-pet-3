//Create variables here
var dog, happyDog, sadDog, garden, washroom;

var foodS, foodStock;

var database;

var fedTime, lastFed, feed, addFood, foodObj, currentTime;

var gameState, readState;

function preload()
{
  //load images here
  sadDog = loadImage ("images/Dog.png");
  happyDog= loadImage ("images/Happy.png");
  garden = loadImage ("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  bedroom = loadImage("images/Bed Room.png");
}

function setup() {
	createCanvas(400, 500);
  
  database = firebase.database();

  foodObj = new Food ();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });

  dog = createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);
}

function draw() {  

  currentTime = hour();

  if(currentTime ==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime ==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime <= (lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  } 
  else{
    update("Hungry")
    foodObj.display();
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updatefoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

    foodObj.updatefoodStock(foodObj.getfoodStock()- 1);

  database.ref('/').update({
    food : foodObj.getfoodStock(),
    feedTime : hour(),
    gameState: "Hungry"
  })
}

function addFoodS(){
  foodS ++ ;
  database.ref('/').update({
    food : foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState : state
  })
}
