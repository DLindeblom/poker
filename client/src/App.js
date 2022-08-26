import { React, useEffect, useState, useReducer } from 'react';
import Player from './components/Player';

import './App.css';


const playersArray = [
  {
    name: "Dan",
    hand: [],
    dealer: true,
    chips: 100
  },
  {
    name: "Brad",
    hand: [],
    dealer: false,
    chips: 100
  },
  {
    name: "Lee",
    hand: [],
    dealer: false,
    chips: 100
  },
  {
    name: "Jarrett",
    hand: [],
    dealer: false,
    chips: 100
  }];

const deck = ["As", "Ks", "Qs", "Js", "10s", "9s", "8s", "7s", "6s", "5s", "4s", "3s", "2s", "Ac", "Kc", "Qc", "Jc", "10c", "9c", "8c", "7c", "6c", "5c", "4c", "3c", "2c", "Ah", "Kh", "Qh", "Jh", "10h", "9h", "8h", "7h", "6h", "5h", "4h", "3h", "2h", "Ad", "Kd", "Qd", "Jd", "10d", "9d", "8d", "7d", "6d", "5d", "4d", "3d", "2d"];



function App() {

  const [players, setPlayers] = useState(playersArray);
  const [playersInHand, setPlayersInHand] = useState(playersArray);
  const [activePlayer, setActivePlayer] = useState(null)


  const [cards, setCards] = useState(null);
  const [flop, setFlop] = useState(null);
  const [turn, setTurn] = useState(null);
  const [river, setRiver] = useState(null);

  const [flopIsShown, setFlopIsShown] = useState(false);
  const [turnIsShown, setTurnIsShown] = useState(false);
  const [riverIsShown, setRiverIsShown] = useState(false);

  const [potCount, setPotCount] = useState(0);


  const shuffle = (cards) => {

    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      [cards[i], cards[j]] = [cards[j], cards[i]];

    }
    return cards;
  };

  useEffect(() => {

    setCards(shuffle(deck));

  }, []);

  const runDeal = (players, cards) => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].chips === 0) {
        players.splice(i, 1);
      }
    }

    players.map((player, playerIndex) => {
      
      player.hand = [];
      return player.hand.push(cards[playerIndex], cards[players.length + playerIndex]);
    });

    return players;

  };

  const runFlop = (cards) => {
    const deadCards = (players.length * 2) + 1;

    const flopCards = [cards[deadCards], cards[deadCards + 1], cards[deadCards + 2]];

    return flopCards;
  };

  const runTurn = (cards) => {
    const deadCards = (players.length * 2) + 5;

    const turnCard = [cards[deadCards]];

    return turnCard;
  };

  const runRiver = (cards) => {
    const deadCards = (players.length * 2) + 7;

    const riverCard = [cards[deadCards]];

    return riverCard;
  };

  const changeDealer = (players) => {

    for (let i = 0; i < players.length; i ++) {

      if (players[i].dealer && i === players.length - 1) {
        players[i].dealer = false;
        players[0].dealer = true;
        return;
      }
      
      if (players[i].dealer && i < players.length - 1) {
        players[i+1].dealer = true;
        players[i].dealer = false;
        return;
      } 
      
    }
  }

  const handleShuffle = () => {
    shuffle(deck)
  }

  const handleDeal = async () => {

    handleShuffle()

    setPlayers(runDeal(players, cards));
    setFlopIsShown(false);
    setTurnIsShown(false);
    setRiverIsShown(false);
    changeDealer(players);
    setPotCount(0)

  };

  const handleFlop = (event) => {
    setFlop(runFlop(cards));
    setFlopIsShown(true);
  };

  const handleTurn = (event) => {
    setTurn(runTurn(cards));
    setTurnIsShown(true);
  };

  const handleRiver = (event) => {
    setRiver(runRiver(cards));
    setRiverIsShown(true);
  };

  const onePlayer = playersInHand.map((player, playerIndex) => {
    return (
      <Player
        key={playerIndex}
        name={player.name}
        cards={player.hand}
        chips={player.chips}
        playerNumber={playerIndex + 1}
        dealer={player.dealer}
        players={playersInHand}
        setPotCount={setPotCount}
        potCount={potCount}
        setPlayersInHand={setPlayersInHand}
        
      />
    );
  });

  return (
    <>

      <div className="players">
        {onePlayer}
      </div>
      <div className="players">
        Pot: {potCount}
      </div>
      <div className="button">
        <button onClick={handleDeal}>Deal!</button>
      </div>
      <div className="button">
        {/* <button onClick={newHand}>New Hand!</button> */}
      </div>
      <div className="button">
        <div className="button--row"><button onClick={handleFlop}>Show me the Flop!</button></div>
        {flopIsShown && <div className="button--row"><button onClick={handleTurn}>Show me the Turn!</button></div>}
        {(flopIsShown && turnIsShown) && <div className="button--row"><button onClick={handleRiver}>Show me the River!</button></div>}
      </div>
      {flopIsShown && <div className="flop">
        <h2 className="flop--card">{flop[0]}</h2>
        <h2 className="flop--card">{flop[1]}</h2>
        <h2 className="flop--card">{flop[2]}</h2>
      </div>}

      {turnIsShown && <div className="turn">
        <h2>{turn}</h2>
      </div>}
      {riverIsShown && <div className="river">
        <h2>{river}</h2>
      </div>}
    </>
  );
}

export default App;
