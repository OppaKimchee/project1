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
    };//forloop
  });//forEach function()
  return deck;
}//deck()

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
function handleBets(){
  if(bank >= 10){
    $('#a10').on('click',function(event){
      pool += 10;
      bank -= 10;
    });
  }

  if(bank >= 100){
    $('#a100').on('click',function(event){
      pool += 100;
      bank -= 100;
    })
  }

  $('#m100').on('click',function(event){
    if(pool >= 100){
      pool -= 100;
      bank += 100;
    }
  });

  $('#m10').on('click',function(event){
    if(pool >=10){
      pool -= 10;
      bank += 10;
    }
  });

  $('#confirm').on('click',function(event){
    $('#m10').off();
    $('#m100').off();
    $('#a10').off();
    $('#a100').off();
  });
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
function hitBtn(event){
  $('#hit').off();
  $('#stand').off();
  return deal(playerHand);
}
function standBtn(event){
  $('#stand').off();
  $('#hit').off();
  $('.card').removeClass('back')
  return
}
/*-- deal card to player depending on passed value --*/
function deal(player){
  if(player === playerHand){
    playerHand.push(shuffledDeck[0]);
    //add card
    $('#playerBoard').append(`<div class="card ${shuffledDeck[0].card}"></div>`)
    shuffledDeck.splice(0,1);
  }
  else{
    //add card
    if(houseHand.length === 0){
      $('#houseBoard').append(`<div class="card ${shuffledDeck[0].card} back"></div>`)
      shuffledDeck.splice(0,1);
      houseHand.push(shuffledDeck[0])
    }
    else{
      houseHand.push(shuffledDeck[0])
      $('#houseBoard').append(`<div class="card ${shuffledDeck[0].card}"></div>`)
      shuffledDeck.splice(0,1);
    }
  }
}

/*-- check hand value for cross checking with bust --*/
function check(playerHand, houseHand){
  playerVal = 0; // reset player val to 0
  for(var i = 0; i < playerHand.length; i++){
    playerVal += playerHand[i].rank;
  }
  bustCheck(playerHand);

  houseVal = 0;
  for(var i = 0; i < houseHand.length; i++){
    houseVal += houseHand[i].rank;
  }
  bustCheck(houseHand);
}

// two bust vars, playerBust, houseBust
// set bust vars during bustCheck
// after check() returns, check bust vars
// if a bust var === true, other has won
// if no bust vars are true, compare hand values
// highest wins, add pot to winner bank
// delete switch statement

/*-- Check to see if hand was busted --*/
function bustCheck(hand){
  var playerBust = false;
  var houseBust = false;

  if (playerVal > 21) {
    ace(playerHand);
    // check if player is busted
    if(playerVal > 21){
      $('#display').text("BUST!!!!!!!!!!!!!!!");
      playerBust = true;
    }
  }

  if(houseVal > 21){
    ace(houseHand);
    if(houseVal > 21 ){
      $('#display').text("Player Wins");
      houseBust = true;
    }
  }
}

/*-- Ace Promp --*/
function ace(hand){
  if(hand === playerHand){
    for (var i = 0; i < playerHand.length; i++){
      if(playerHand[i].rank === 11){
        playerHand[i].rank = 1;
        playerVal -= 10;
        break;
      }
    }
  }
  else{
    for(var i = 0; i < houseHand.length; i++){
      if(houseHand[i].rank === 11){
        houseHand[i].rank = 1;
        houseHand -= 10;
        break;
      }
    }
  }
}

function render() {

}

