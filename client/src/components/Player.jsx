import { useState } from 'react'

import '../App.css'

export default function Player(props) {

  const [chipCount, setChipCount] = useState(props.chips)

  const bet = () => {
    const chips = chipCount - 5

    return chips
  }

  return (
    <div className='players--player'>
      <h1>Player{props.playerNumber}: {props.name}</h1>
      {props.dealer && <h2>Dealer</h2>}
      <h3>Cards: {props.cards}</h3>
      <h5>Chips: {chipCount}</h5>
      <button onClick={()=> setChipCount(bet())}>Bet</button>
    </div>
  );
}