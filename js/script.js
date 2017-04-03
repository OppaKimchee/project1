/*-- Variables --*/
var deck;
var shuffledDeck;
var ranNumGen;
var playerHand;
var houseHand;
var playerVal;
var houseVal;
var hit;
var bust;
var bank;
var bet;
var pool;

/*-- Initializer --*/
function init(){
  /*--!!!!remeber 1 is ACE which can equal to 1 or 11!!!!!--*/
  deck = [
    "H1","H2","H3","H4","H5","H6","H7","H8","H9","H10","H11","H12","H13",
    "D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13",
    "S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","S12","S13",
    "C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","C11","C12","C13"
  ]
  shuffledDeck = [];
  playerHand = [];
  houseHand = [];
  playerVal = 0;
  houseVal = 0;
  hit = false;
  bust = false;
  bank = 1000;
  bet = 0;
  pool = 0;
}

/*-- Game Logic --*/
function start(){
  //shuffle deck on game start
  shuffledDeck = shuffle(deck);
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
      check(playerHand, playerVal);
      check(houseHand, houseVal);
      ace(playerHand);
      ace(houseHand);
      bust = true;
    }
    //would u like to stay or hit
    if(hit === true){
      deal(playerHand);
    }
    else{
      deal(houseHand);
    }
  }


//******careful of ace = 1 or 11*********
//playerVal = card1 + card2
//houseVal = card1 + card2 ***only show one card***
//check is 21? no? then ask player to hit or stand
//



init();
start();
