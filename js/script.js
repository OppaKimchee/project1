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
var bgm = new Audio('music/bgm.mp3');
bgm.loop = true;

/*-- Cached Elements --*/



/*-- Event Listeners --*/
$('#hundred').on('click',function(event){
  handleBets(100);
});
$('#twentyFive').on('click',function(event){
  handleBets(25);
});
$('#five').on('click',function(event){
  handleBets(5);
});
$('#one').on('click',function(event){
  handleBets(1);
});
$('#clear').on('click',clearBets);
$('#deal').on('click',dealHand);

$('#hit').on('click',handleHit);
$('#stand').on('click',handleStand);

$('#start').on('click',init);

$('#instructions').on('click',function(event){
  $('#info').toggle();
});

$('#bgm').on('click',function(event){
  bgm.play();
  $('#bgm').hide();
  $('#mute').show();
});
$('#mute').on('click',function(event){
  bgm.pause();
  $('#mute').hide();
  $('#bgm').show();
});

$('#logo').on('click',function(event){
  $('#table').html(`Created by: JUSTIN "THE KIMCHEE" KIM!<br>Honorable Mentions: Jim Clark, Jon Tamsut, AJ, Jerry.<br><img src="images/ga.png">`).css({"color":"white"});
})

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
  message = "";
  $('#playerBoard').html('');
  $('#houseBoard').html('');
  $('#info').hide();
  $('#mute').hide();
  render();
}

/*-- Game Logic --*/
function dealHand(){
  handInProgress = true;
  message = "";
  dealCards();
  playerVal = getHandVal(playerHand);
  houseVal = getHandVal(houseHand);
  if (playerVal === 21 && houseVal === 21) {
    message = "Both Player & House have Blackjack!";
    handInProgress = false;
  }
  else if (playerVal === 21) {
    handInProgress = false;
    message = `Player has Blackjack. You win $${pool*1.5}`;
    bank += pool + pool * 1.5;
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
