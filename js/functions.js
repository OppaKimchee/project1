/*-- Create the Original Deck, this deck is ordered --*/
function createDeck(){
  var deck = [];
  ['h','d','s','c'].forEach(function(suit){
    for(var rank = 2; rank <= 11; rank++){
      if(rank === 10){
        ['10','J','Q','K'].forEach(function(face){
          deck.push({ rank: rank, card: suit + face });
        });
      }
      else if(rank === 11){
        deck.push({rank: rank, card: suit + 'A' });
      }
      else{
        deck.push({rank: rank, card: suit + 0 + rank });
      }
    };
  });
  return deck;
}

/*-- Shuffle --*/
function shuffle(cards){
  var c = cards.length, t, r;

  // While there remain elements to shuffle…
  while (c) {
    // Pick a random element…
    r = Math.floor(Math.random() * c--);
    // And swap it with the current element.
    t = cards[c];
    cards[c] = cards[r];
    cards[r] = t;
  }
  return cards;
}

/*-- Bets --*/
function handleBets(bet){
  if(bank >= bet){
    bank -= bet;
    pool += bet;
  }
}

/*-- bankrupt --*/
function bankrupt(){
  if(bank < 10){
    $('display').text("Sorry, you're bankrupt!");
    return true;
  }
  return false;
}

/*-- Hit or Stand --*/
function handleHit(event){
  playerHand.push(shuffledDeck.pop());
  playerVal = getHandVal(playerHand);
  if (playerVal > 21) doHandOver();
  render();
}

function standBtn(event){
  doHandOver();
}
/*-- deal card to player depending on passed value --*/
function dealCards(){
  playerHand = [];
  houseHand = [];
  playerHand.push(shuffledDeck.pop());
  houseHand.push(shuffledDeck.pop());
  playerHand.push(shuffledDeck.pop());
  houseHand.push(shuffledDeck.pop());
}

function doHandOver() {
  handInProgress = false;
  if (playerVal > 21) {
    if (bank >= pool) {
      bank -= pool;
    } else {
      pool = 0;
    }
    message = "You Lose";
  } else if (houseVal > 21) {
    bank += pool;
    message = "You Won!";
  } else if (playerVal === houseVal) {
    message = "Tied!";
  } else if (playerVal > houseVal) {
    bank += pool;
    message = "You Won!";
  } else {
    if (bank >= pool) {
      bank -= pool;
    } else {
      pool = 0;
    }
    message = "Your Lose";
  }
  render();
}

/*-- check hand value for cross checking with bust --*/
function getHandVal(hand){
  var val = 0;
  var aceCount = 0;
  for(var i = 0; i < hand.length; i++){
    val += hand[i].rank;
    if (hand[i].rank === 11) aceCount++;
  }
  while (val > 21 && aceCount) {
    val -= 10;
    aceCount--;
  }
  return val;
}

function render() {
  handInProgress ? $('#betDisplay').hide() : $('#betDisplay').show();
  handInProgress ? $('#hitStandDisplay').show() : $('#hitStandDisplay').hide();
  if (playerHand.length) renderHands();
  $('#display').text(message);
  if (!handInProgress) $('#house span').text(houseVal);
  $('#player span').text(playerVal);




}

function renderHands() {
  $('#playerBoard').html('');
  $('#houseBoard').html('');
  playerHand.forEach(function(card) {
    $('#playerBoard').append(`<div class="card ${card.card}"></div>`)
  });
  houseHand.forEach(function(card, idx) {
    if (idx === 0 && handInProgress) {
      $('#houseBoard').append(`<div class="card back"></div>`)
    } else {
      $('#houseBoard').append(`<div class="card ${card.card}"></div>`)
    }
  });
}

