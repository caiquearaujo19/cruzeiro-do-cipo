import React from 'react'
import './style.scss'

import PlayerAvatar from '../../player-avatar'

export default function PlayerMainInfo({player}) {

  const numbers = [
    {
      value: 10,
      title: "Jogos"
    },
    {
      value: 8,
      title: "Gols"
    },
    {
      value: 4,
      title: "Assist."
    }
  ]

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