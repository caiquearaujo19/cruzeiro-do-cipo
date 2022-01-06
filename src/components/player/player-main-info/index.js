import React, {useState, useEffect} from 'react'
import './style.scss'

import PlayerAvatar from '../../player-avatar'

export default function PlayerMainInfo({player, changeYear}) {

  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [numbers, setNumbers] = useState([])

  useEffect(() => {
    setNumbers([
      {
        value: player[year] ? player[year].matches : 0,
        title: "Jogos"
      },
      {
        value: player[year] ? player[year].goals : 0,
        title: "Gols"
      },
      {
        value: player[year] ? player[year].assists : 0,
        title: "Assist."
      }
    ])
  }, [player, year])

  const renderNumber = (item, index) => {
    return (
      <div key={index} className="player-main-info__numbers__item">
        <div className="player-main-info__numbers__item__value">{item.value}</div>
        <div className="player-main-info__numbers__item__title">{item.title}</div>
      </div>
    )
  }

  useEffect(() => {
    changeYear(year)
  }, [year, changeYear])

  const yearChange = (event) => {
    setYear(event.target.value)
  }

  return (
    <section className="player-main-info">
      <select className="player-main-info__year-select" value={year} onChange={yearChange}>
        { player["2021"] ? <option value="2021">2021</option> : null}
        <option value="2022">2022</option>
      </select>
      <PlayerAvatar photo={player.photo} size={70}/>
      <div className="player-main-info__name">{player.name}</div>
      <div className="player-main-info__numbers">
        {numbers.map((item, i) => (renderNumber(item, i)))}
      </div>
    </section>
  )
}