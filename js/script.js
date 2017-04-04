/*-- Variables --*/
var deck = [];
var shuffledDeck;
var ranNumGen;
var playerHand;
var houseHand;
var playerVal;
var houseVal;
var hit;
var bust;
var bank;
var confirm;
var pool;

/*-- Initializer --*/
function init(){
  /*--!!!!remeber 1 is ACE which can equal to 1 or 11!!!!!--*/
  shuffledDeck = shuffle(deck);
  playerHand = [];
  houseHand = [];
  playerVal = 0;
  houseVal = 0;
  hit = false;
  bust = false;
  bank = 1000;
  confirm = true;
  pool = 0;
}

/*-- Game Logic --*/
function start(){
  //bets
  //show playerHand[0] on board
  deal(playerHand);
  //hide houseHand[0] on board
  deal(houseHand);
  //show playerHand[1] on board
  deal(playerHand);
  //show houseHand[1] on board
  deal(houseHand);

  while(bust === false){
    bets();
    check(playerHand, playerVal);
    check(houseHand, houseVal);
    bust = true;
  }
}

//create the deck
createDeck();
init();
start();
