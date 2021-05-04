//Create variables here
var dog, happyDog, database, foodS, foodStock,happyDogImg,dogImg;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
	//load images here
  happyDogImg  = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png"); 
}

function setup() {
	createCanvas(1000, 400);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  foodObj = new Food();

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87);
  
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data) {
    lastFed = data.val();
  });

  textSize(15);
  fill ("black");
  text("FoodStock : "+ foodObj.getFoodStock(),500,20);

  if(lastFed >= 12) {
    text("Last feed : " + lastFed % 12 + " pm",350,20);

  }
  else if(lastFed === 0){
    text("Last feed : 12 AM",350,20);
  }
  else{
    text("Last feed : "+lastFed + "AM",350,20);
  }
 
 
  drawSprites();
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour ()
  });
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}


