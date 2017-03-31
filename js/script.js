/*-- Variables --*/
var deck;
var shuffledDeck;
var ranNumGen;
var playerHand;
var houseHand;
var playerVal;
var houseVal;
var bank;
var bet;
var pool;

/*-- Initializer --*/
function init(){
  /*--!!!!remeber 1 is ACE which can equal to 1 or 11!!!!!--*/
  deck = [
    { 1 : 'H', 2 : 'H', 3 : 'H', 4 : 'H', 5 : 'H', 6 : 'H',  7 : 'H', 8 : 'H', 9 : 'H', 10 : 'H', 11 : 'H', 12 : 'H', 13 : 'H'},
    { 1 : 'D', 2 : 'D', 3 : 'D', 4 : 'D', 5 : 'D', 6 : 'D',  7 : 'D', 8 : 'D', 9 : 'D', 10 : 'D', 11 : 'D', 12 : 'D', 13 : 'D'},
    { 1 : 'S', 2 : 'S', 3 : 'S', 4 : 'S', 5 : 'S', 6 : 'S',  7 : 'S', 8 : 'S', 9 : 'S', 10 : 'S', 11 : 'S', 12 : 'S', 13 : 'S'},
    { 1 : 'C', 2 : 'C', 3 : 'C', 4 : 'C', 5 : 'C', 6 : 'C',  7 : 'C', 8 : 'C', 9 : 'C', 10 : 'C', 11 : 'C', 12 : 'C', 13 : 'C'},
  ];
  shuffledDeck = {};
  playerHand = {}
  houseHand = {}
  playerVal = 0;
  houseVal = 0;
  bank = 1000;
  bet = 0;
  pool = 0;
}

/*-- Game Logic --*/


