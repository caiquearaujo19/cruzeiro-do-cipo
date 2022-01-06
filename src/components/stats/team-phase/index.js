import React, {useState, useEffect} from 'react'
import './style.scss'

import SectionTitle from '../../section-title'

export default function TeamPhase({numbers, changeYear}) {

  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [percentage, setPercentage] = useState(0)
  const [stats, setStats] = useState([])

  useEffect(() => {
    setStats(numbers ?? [])
  }, [numbers])

  useEffect(() => {
    let result = 0
    if(stats.length && stats[0].value > 0) {
      let points = (stats[1].value * 3) + stats[2].value
      let totalPoints = stats[0].value * 3
      result = (points / totalPoints) * 100
    }
    setPercentage(result.toFixed(0))
  }, [stats])

  const renderNumber = (item, index) => {
    return (
      <div key={index} className="team-phase__numbers__item">
        <div className="team-phase__numbers__item__value">{item.value}</div>
        <div className="team-phase__numbers__item__title">{item.title}</div>
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
    <article className="team-phase">
      <SectionTitle title="Aproveitamento"/>
      <select className="team-phase__year-select" value={year} onChange={yearChange}>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
      </select>
      <div className="team-phase__percentage">{percentage}%</div>
      <div className="team-phase__numbers">
        {stats.length ? stats.map((item, i) => (renderNumber(item, i))) : null}
      </div>
    </article>
  )
}