/*-- Variables --*/
var deck;
var shuffledDeck;
var playerHand;
var houseHand;
var playerVal;
var houseVal;
var bust;
var bank;
var confirm;
var pool;


/*-- Cached Elements --*/



/*-- Event Listeners --*/


/*-- Initializer --*/
function init(){
  deck = createDeck();
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
  while(bust === false && !bankrupt()){
    //bankrupt();
    handleBets();
    $('#hit').on('click',hitBtn);
    $('#stand').on('click',standBtn);
    check(playerHand, houseHand);
    bustCheck(playerHand);

    //bust = winCheck();
    //check(houseHand, houseVal);
    //bust = WinLoss();
    bust = true;
  }
  render();
}

init();
start();
