import React, {useState, useEffect} from 'react'
import './style.scss'

import PlayerAvatar from '../../player-avatar'

export default function PlayerMainInfo({player}) {

  const [numbers, setNumbers] = useState([])

  useEffect(() => {
    setNumbers([
      {
        value: player.matches,
        title: "Jogos"
      },
      {
        value: player.goals,
        title: "Gols"
      },
      {
        value: player.assists,
        title: "Assist."
      }
    ])
  }, [player])

  const renderNumber = (item, index) => {
    return (
      <div key={index} className="player-main-info__numbers__item">
        <div className="player-main-info__numbers__item__value">{item.value}</div>
        <div className="player-main-info__numbers__item__title">{item.title}</div>
      </div>
    )
  }

  return (
    <section className="player-main-info">
      <PlayerAvatar photo={player.photo} size={70}/>
      <div className="player-main-info__name">{player.name}</div>
      <div className="player-main-info__numbers">
        {numbers.map((item, i) => (renderNumber(item, i)))}
      </div>
    </section>
  )
}