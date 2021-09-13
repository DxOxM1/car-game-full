class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.fuel = 185;
    this.score = 0;
    this.life = 185;
  }
  //players - player1 player2
// update the player name, rank, player xposition and yposition in the database
  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank : this.rank,
      score: this.score,
      life: this.life
    });
  }
  //read the playerCount value in the database
  getCount(){
    database.ref("playerCount").on("value", (data)=>{
      playerCount = data.val()
    })
  }
  //writing the playerCount value to the database
  updateCount(state){
    database.ref("/").update({
      playerCount: state
    })
  }

  getCarsAtEnd(){
    database.ref("carsAtEnd").on("value", (data)=>{
      this.rank = data.val()
    })
  }
  //writing the carsatend value to the database
  static updateCarsAtEnd(state){
    database.ref("/").update({
      carsAtEnd: state
    })
  }

  getDistance(){
    database.ref("players/player"+this.index).on("value", (data)=>{
      var data = data.val()
      this.positionX = data.positionX
      this.positionY = data.positionY
    })
  }
  //writing the playerCount value to the database
  updateDistance(){
    database.ref("players/player"+this.index).update({
      positionX : this.positionX,
      positionY : this.positionY,
      rank : this.rank,
      score: this.score,
      life: this.life
    })
  }
  
  //collect all the players information from the database
  static getPlayersInfo() {
    database.ref("players").on("value", data => {
      allPlayers = data.val();
    });
  }
}
