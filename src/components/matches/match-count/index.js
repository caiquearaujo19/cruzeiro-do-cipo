import React, { useEffect, useState } from 'react'
import './style.scss'

export default function MatchCount({numbers, changeYear}) {

  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [stats, setStats] = useState([]);

  useEffect(() => {
    setStats([
      {
        title: "Vitórias",
        number: numbers.wins ?? 0,
        color: '#219653'
      },
      {
        title: "Empates",
        number: numbers.draws ?? 0,
        color: '#828282'
      },
      {
        title: "Derrotas",
        number: numbers.loses ?? 0,
        color: '#EB5757'
      },
    ])
  }, [numbers])

  useEffect(() => {
    changeYear(year)
  }, [year, changeYear])

  const yearChange = (event) => {
    setYear(event.target.value)
  }

  return (
    <section className="match-count">
      <div className='match-count__left'>
        <select className="match-count__left__year-select" value={year} onChange={yearChange}>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
        <div className="match-count__left__matches">{numbers.matches ?? 0} jogos no ano</div>
      </div>
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