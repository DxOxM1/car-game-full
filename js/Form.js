class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("Play");
    this.titleImg = createImg("./assets/title.png");
    this.greeting = createElement("h1");
    this.reset = createButton("Reset")
  }

  setElementsPosition() {
    this.titleImg.position(120,50);
    this.input.position(width / 2 - 110, height / 2 - 80);
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    this.greeting.position(width / 2 - 400, height / 2 - 100);
    this.reset.position(width - 100, 100)
  }

  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }
  //usual function 
  //function(){}
//Arrow function: ()=>{}

  buttonPress(){
    this.playButton.mousePressed(()=>{
    this.input.hide();
    this.playButton.hide();
      var message = "Hey there "+this.input.value() + " wait for another player to join the session"
      this.greeting.html(message)
      playerCount = playerCount + 1
      player.name = this.input.value()
      player.index = playerCount
      player.addPlayer();
      player.updateCount(playerCount);
      player.getDistance();
    })
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.buttonPress()
    this.reset.mousePressed(()=>{
      database.ref("/").set({
        playerCount: 0,
        gameState : 0,
        players: {},
        carsAtEnd:0
      })
      window.location.reload()
    })
  }
}
