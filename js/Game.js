class Game {
  constructor() {
    this.leaderboardTitle = createElement("h2")
    this.leader1 = createElement("h2")
    this.leader2 = createElement("h2")
    this.playermoving = false
    this.leftKeyActive = false

  }
  //reading the gamestate value from the database
  getState(){
    database.ref("gameState").on("value", function(data){
      gameState = data.val()
    })
  }
  //writing the gamestate value to the database
  updateState(state){
    database.ref("/").update({
      gameState: state
    })
  }
  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.getCount()
    car1 = createSprite(width /2 - 100, height - 100)
    car1.addImage(carImage1)
    car1.scale = 0.07
    car2 = createSprite(width /2 + 100, height - 100)
    car2.addImage(carImage2)
    car2.scale = 0.07
    cars = [car1, car2]
    fuelGroup = new Group()
    powerGroup = new Group()
    obstacleGroup = new Group()
    this.addSprites(fuelGroup, 5, fuelimg, 0.02)
    this.addSprites(powerGroup, 15, powerimg, 0.09)
    this.addSprites(obstacleGroup, 6, obstacleimg, 0.04)
    
  }

  addSprites(group, number, img, scale){
    for(var i = 0; i < number; i ++){
      var x = random(width/2 - 150, width/2 + 150)
      var y = random(-height*4.5,height - 400)
      var object = createSprite(x, y)
      object.addImage(img)
      object.scale = scale
      group.add(object)
    }
  }

  //!== not equal
  play(){
    form.hide()
    Player.getPlayersInfo()
    player.getCarsAtEnd()
    this.leaderboardTitle.html("Leaderboard")
    this.leaderboardTitle.position(95,140)
    this.leader1.position(95,180)
    this.leader2.position(95,230)
    if(allPlayers!== undefined){
      background("lightblue")
      image(TheEntireMap, 0, -height*5,width,height*6)
      this.showFuelBar()
      this.showLife()
    
      var leader1, leader2
      var players = Object.values(allPlayers)
      if (
        (players[0].rank === 0 && players[1].rank === 0) ||
        players[0].rank === 1
      ) {
        leader1 =
        players[0].rank +
        "     " +
        players[0].name + 
        "     "+ 
        players[0].score 
        leader2 =
        players[1].rank +
        "     " +
        players[1].name +
        "     "+ 
        players[1].score 
      }

      if (players[1].rank === 1) {
        leader2 =
        players[0].rank +
        "     " +
        players[0].name +
        "     "+ 
        players[0].score 
        leader1 =
        players[1].rank +
        "     " +
        players[1].name  +
        "     "+ 
        players[1].score 

      }
      this.leader1.html(leader1);
      this.leader2.html(leader2);
      var index = 0
      for(var i in allPlayers){
        index = index+1
        var x = allPlayers[i].positionX
        var y = height - allPlayers[i].positionY
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
        if(allPlayers[i].life<=0){
          gameState = 2
      swal({
        title: "Game Over your car crashed",
        text: "play again"
      })
        }
        if(index===player.index){
          this.handleFuel(index)
          this.handlePower(index)
          this.handleCarACollisionWithCarB(index);
      this.handleObstacleCollision(index);
          camera.position.y = cars[index - 1].position.y
        }
      }
      if(keyIsDown(UP_ARROW)){
        player.positionY = player.positionY+10
        player.updateDistance()
        this.playerMoving = true
      }
      if(keyIsDown(LEFT_ARROW) &&player.positionX>500){
        this.leftKeyActive = true
        player.positionX = player.positionX-5
        player.updateDistance()
      }
      if(keyIsDown(RIGHT_ARROW) &&player.positionX<width-500){
        this.leftKeyActive = false
        player.positionX = player.positionX+5
        player.updateDistance()
      }
      var finishline = height*6-100
      if(player.positionY > finishline){
        gameState = 2
        player.rank = player.rank+1
        Player.updateCarsAtEnd(player.rank)
        player.updateDistance()
        swal({
          title: "Congratulations you win the game",
          text: "Rank: "+player.rank
        })
      }
      drawSprites()
    }
  }

  handleFuel(index){
   cars[index - 1].overlap(fuelGroup, function(a, b){
      player.fuel = 185
      b.remove()
    })
    if(player.fuel>0&&this.playerMoving){
      player.fuel = player.fuel - 0.3
    }
    if(player.fuel<=0){
      gameState = 2
      swal({
        title: "Game over your car ran out",
        text: "play again"
      })
    }
    
  }

  handlePower(index){
    cars[index - 1].overlap(powerGroup, function(a, b){
      player.score = player.score+20
      player.updateDistance()
      b.remove()
    })
  }

  showFuelBar() {
    push();
    image(fuelimg, width / 2 - 130, height - player.positionY - 250, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 250, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 250, player.fuel, 20);
    noStroke();
    pop();
  }

  showLife() {
    push();
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 300, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100, height - player.positionY - 300, player.life, 20);
    noStroke();
    pop();
  }

  handleObstacleCollision(index) {
    if (cars[index - 1].collide(obstacleGroup)) {
      if (this.leftKeyActive) {
        player.positionX += 100;
      } else {
        player.positionX -= 100;
      }

      //Reducing Player Life
      if (player.life > 0) {
        player.life -= 185 / 4;
      }

      player.updateDistance();
    }
  }

  handleCarACollisionWithCarB(index) {
    if (index === 1) {
      if (cars[index - 1].collide(cars[1])) {
        if (this.leftKeyActive) {
          player.positionX += 100;
        } else {
          player.positionX -= 100;
        }

        //Reducing Player Life
        if (player.life > 0) {
          player.life -= 185 / 4;
        }

        player.updateDistance();
      }
    }
    if (index === 2) {
      if (cars[index - 1].collide(cars[0])) {
        if (this.leftKeyActive) {
          player.positionX += 100;
        } else {
          player.positionX -= 100;
        }

        //Reducing Player Life
        if (player.life > 0) {
          player.life -= 185 / 4;
        }

        player.updateDistance();
      }
    }
  }
}

