import { useState } from 'react'

import '../App.css'

export default function Player(props) {

  const [chipCount, setChipCount] = useState(props.chips)
  

  const handleBet = () => {

    if (chipCount > 0){

      const chips = chipCount - 5
      const pot = props.potCount + 5

      setChipCount(chips)
      props.setPotCount(pot)
    }
    
  }
  




  return (
    <div className='players--player'>
      <h1>Player{props.playerNumber}: {props.name}</h1>
      <h3>Cards: {props.cards}</h3>
      <h5>Chips: {chipCount}</h5>
      {props.dealer && <h2>Dealer</h2>}

      <div>
        <button>Check</button>
        <button onClick={handleBet}>Bet</button>
        <button>Fold</button>
      </div>
    </div>
  );
}