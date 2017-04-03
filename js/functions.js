/*-- Random Number Generator to pick cards from 0 - 51 (array index) --*/
function ranNumGen(n){
  return Math.floor(Math.random() * n);
}

/*-- Shuffle --*/
function shuffle(array) {
  var c = array.length, t, r;

  // While there remain elements to shuffle…
  while (c) {
    // Pick a remaining element…
    r = Math.floor(Math.random() * c--);
    // And swap it with the current element.
    t = array[c];
    array[c] = array[r];
    array[r] = t;
  }
  return array;
}

/*-- Ace Promp --*/
function ace(hand){
  var aces = ["H1", "D1", "S1", "C1"];
  if(hand === playerHand){
    for (var i = 0; i < aces.length; i++){
      if(playerHand.includes(aces[i])){
        alert("Ace: would u like a 1 or 11?");
      }
    }
  }
  return;
}

/*-- deal card to player depending on passed value --*/
function deal(player){
  if(player === playerHand){
    playerHand.push(shuffledDeck[0]);
    shuffledDeck.splice(0,1);
  }
  else{
    houseHand.push(shuffledDeck[0])
    shuffledDeck.splice(0,1);
  }
}

/*-- check for bust or not --*/
function check(hand, val){
  for(var i = 0; i < hand.length; i++){
    var numVal = parseInt(hand[i].substring(1,hand.length));
    switch (numVal){
      case 1: ace(hand); break;
      case 2: val += numVal; break;
      case 3: val += numVal; break;
      case 4: val += numVal; break;
      case 5: val += numVal; break;
      case 6: val += numVal; break;
      case 7: val += numVal; break;
      case 8: val += numVal; break;
      case 9: val += numVal; break;
      case 10: val += numVal; break;
      case 11: val += 10; break;
      case 12: val += 10; break;
      case 13: val += 10; break;
      default:  break;
    }
  }
  return player > 21 ? bust = true : bust = false;
}
