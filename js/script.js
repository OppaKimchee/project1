/*-- Variables --*/
var deck;
var shuffledDeck;
var playerHand;
var houseHand;
var playerVal;
var houseVal;
var playerBust;
var houseBust;
var bank;
var pool;
var handInProgress;
var message;


/*-- Cached Elements --*/



/*-- Event Listeners --*/
$('#100').on('click',function(event){
  handleBets(100);
});
$('#25').on('click',function(event){
  handleBets(25);
});
$('#10').on('click',function(event){
  handleBets(10);
});
$('#1').on('click',function(event){
  handleBets(1);
});
// $('#confirm').on('click',function(event){
//   $('#m10').off();
//   $('#m100').off();
//   $('#a10').off();
//   $('#a100').off();
// });
$('#clear').on('click')
$('#deal').on('click',dealHand)

$('#hit').on('click',handleHit);
$('#stand').on('click',standBtn);

/*-- Initializer --*/
function init(){
  deck = createDeck();
  shuffledDeck = shuffle(deck);
  playerVal = 0;
  houseVal = 0;
  playerBust = false;
  houseBust = false;
  bank = 1000;
  pool = 0;
  handInProgress = false;
  playerHand = [];
  houseHand = [];
  render();
}

/*-- Game Logic --*/
function dealHand(){
  handInProgress = true;
  dealCards();
  playerVal = getHandVal(playerHand);
  houseVal = getHandVal(houseHand);
  if (playerVal === 21 && houseVal === 21) {
    handInProgress = false;
    message = "Both Player & House have Blackjack!";
  } else if (playerVal === 21) {
    handInProgress = false;
    message = "Player has Blackjack";
  } else if (houseVal === 21) {
    handInProgress = false;
    message = "House has Blackjack";
  }
  render();
}

init();
