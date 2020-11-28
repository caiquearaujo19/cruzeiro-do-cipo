import React from 'react'
import './style.scss'

import SectionTitle from '../../section-title'

export default function TeamPhase() {

  const numbers = [
    {
      value: 16,
      title: "Jogos"
    },
    {
      value: 8,
      title: "Vitórias"
    },
    {
      value: 4,
      title: "Empates"
    },
    {
      value: 4,
      title: "Derrotas"
    }
  ]

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
      <div className="team-phase__percentage">58%</div>
      <div className="team-phase__numbers">
        {numbers.map((item, i) => (renderNumber(item, i)))}
      </div>
    </article>
  )
}