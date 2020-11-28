import React from 'react'
import './style.scss'

export default function MatchCount({numbers}) {

  const stats = [
    {
      title: "Vitórias",
      number: numbers.wins,
      color: '#219653'
    },
    {
      title: "Empates",
      number: numbers.draws,
      color: '#828282'
    },
    {
      title: "Derrotas",
      number: numbers.loses,
      color: '#EB5757'
    },
  ]

  return (
    <section className="match-count">
      <div className="match-count__matches">{numbers.matches} jogos no ano</div>
      <div className="match-count__stats">
        {stats.map((stat, i) => (
          <div key={i} className="match-count__stats__item">
            <div className="match-count__stats__item__number" style={{backgroundColor: stat.color}}>
              {stat.number}
            </div>
            <div className="match-count__stats__item__title">{stat.title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}