/*-- Create the Original Deck, this deck is ordered --*/
function createDeck(){
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

/*-- Ace Promp --*/
function ace(hand){
  if(hand === playerHand){
    for (var i = 0; i < playerHand.length; i++){
      if(playerHand[i].rank === 11){
        playerVal -= 10;
      }
    }
    if(playerVal > 21){
      $('#display').text("BUST!!!!!!!!!!!!!!!");
      return true;
    }
  }
}

/*-- Bets --*/
function bets(){
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
    }
  });
  $('#m10').on('click',function(event){
    if(pool >=10){
      pool -= 10;
    }
  });

  $('#confirm').on('click',function(event){
  $('#m10').off();
  $('#m100').off();
  $('#a10').off();
  $('#a100').off();
  });
}

/*-- Hit or Stand --*/
function hitOrStand(event){
  console.log('hit')
  if(hit === true){

  }
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
    houseHand.push(shuffledDeck[0])
    //add card
    shuffledDeck.splice(0,1);
  }
}

/*-- check hand value for cross checking with bust --*/
function check(hand,val){
  if(val === playerVal){
    for(var i = 0; i < hand.length; i++){
      switch (hand[i].rank){
        case 2: playerVal += hand[i].rank;  break;
        case 3: playerVal += hand[i].rank;  break;
        case 4: playerVal += hand[i].rank;  break;
        case 5: playerVal += hand[i].rank;  break;
        case 6: playerVal += hand[i].rank;  break;
        case 7: playerVal += hand[i].rank;  break;
        case 8: playerVal += hand[i].rank;  break;
        case 9: playerVal += hand[i].rank;  break;
        case 10: playerVal += hand[i].rank; break;
        case 11: playerVal += hand[i].rank; break;
        default:  break;
      }
    bustCheck(playerHand);
    }
  }
  else{
    for(var i = 0; i < hand.length; i++){
      switch (hand[i].rank){
        case 2: houseVal += hand[i].rank;  break;
        case 3: houseVal += hand[i].rank;  break;
        case 4: houseVal += hand[i].rank;  break;
        case 5: houseVal += hand[i].rank;  break;
        case 6: houseVal += hand[i].rank;  break;
        case 7: houseVal += hand[i].rank;  break;
        case 8: houseVal += hand[i].rank;  break;
        case 9: houseVal += hand[i].rank;  break;
        case 10: houseVal += hand[i].rank; break;
        case 11: houseVal += hand[i].rank; break;
        default:  break;
      }
      bustCheck(houseHand);
    }
  }
}

/*-- Check to see if hand was busted --*/
function bustCheck(player){
  if(player === playerHand){
    return playerVal > 21 ? ace(playerHand) : bust = false;
  }
  else{
   return houseVal > 21 ? ace(houseHand) : bust = false;
  }
}
