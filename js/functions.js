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
  render();
}

function clearBets(){
  bank += pool;
  pool = 0;
  render();
}

/*-- Hit or Stand --*/
function handleHit(event){
  playerHand.push(shuffledDeck.pop());
  playerVal = getHandVal(playerHand);
  if (playerVal >= 21) doHandOver();
  render();
}

function handleStand(event){
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
  render();
}

function doHandOver(){
  handInProgress = false;
  while(houseVal < 17){
    houseHand.push(shuffledDeck.pop());
    houseVal = getHandVal(houseHand);
  }
  if (playerVal > 21){
      message = `You lost $${pool}, Please Place Your Bets Again!`;
      pool = 0;
  } else if (houseVal > 21) {
    message = `You win $${pool}! Please Place Your Bets Again.`;
    bank += pool*2;
    pool = 0;
  }
  else if (playerVal === houseVal){
    message = "Tied!";
    bank += pool;
    pool = 0;
  }
  else if (playerVal > houseVal){
    message = `You win $${pool}!`;
    bank += pool*2;
    pool = 0;
  }
  else {
    message = `You lost $${pool}, Please Place Your Bets Again!`;
    pool = 0;
  }

  if(shuffledDeck.length < 14) {
    message += " New Deck in play!";
    shuffledDeck = shuffle(createDeck());
  }
  render();
}

/*-- compute and return the value of the passed hand --*/
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
  if(!pool){

    $('#display').text("Please Place Your Bets");
    console.log(pool)
    $('#deal').hide();
  }
  else{
    $('#deal').show();
  }

  handInProgress ? $('.playerProgress').hide() : $('.playerProgress').show();
  handInProgress ? $('#hitStandDisplay').show() : $('#hitStandDisplay').hide();
  if (playerHand.length) renderHands();
  $('#display').text(message);
  if(handInProgress) $('#house span').text(houseHand[1].rank);
  if (!handInProgress) $('#house span').text(houseVal);
  $('#player span').text(playerVal);
  $('#bank').text(`$${bank}`);
  $('#pool').text(`$${pool}`);
  console.log(bank)
  if(bank < 1 && pool === 0) message = "Sorry, you're bankrupt! Please go to the ATM and feed me more please... I mean press start to play again.";
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
