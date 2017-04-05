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
$('#clear').on('click',clearBets);
$('#deal').on('click',dealHand);

$('#hit').on('click',handleHit);
$('#stand').on('click',handleStand);

$('#start').on('click',init);

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
    message = "Both Player & House have Blackjack!";
    handInProgress = false;
  }
  else if (playerVal === 21) {
    handInProgress = false;
    message = `Player has Blackjack. You win $${pool*2}`;
    bank += pool * 2;
    pool = 0;
  }
  else if (houseVal === 21) {
    handInProgress = false;
    message = `House has Blackjack. You lose $${pool} `;
    pool = 0;
  }
  render();
}

init();
