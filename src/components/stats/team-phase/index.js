import React, {useState, useEffect} from 'react'
import './style.scss'

import SectionTitle from '../../section-title'

export default function TeamPhase(numbers) {

  const stats = numbers["numbers"]
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    if(stats.length) {
      let points = (stats[1].value * 3) + stats[2].value
      let totalPoints = stats[0].value * 3
      let result = (points / totalPoints) * 100
      setPercentage(result.toFixed(0))
    }
  }, [stats])

  const renderNumber = (item, index) => {
    return (
      <div key={index} className="team-phase__numbers__item">
        <div className="team-phase__numbers__item__value">{item.value}</div>
        <div className="team-phase__numbers__item__title">{item.title}</div>
      </div>
    )
  }

  return (
    <article className="team-phase">
      <SectionTitle title="Aproveitamento"/>
      <div className="team-phase__percentage">{percentage}%</div>
      <div className="team-phase__numbers">
        {stats.length ? stats.map((item, i) => (renderNumber(item, i))) : null}
      </div>
    </article>
  )
}