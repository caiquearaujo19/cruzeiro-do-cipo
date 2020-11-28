import React from 'react'
import './style.scss'

import SectionTitle from '../../section-title'

export default function GoalsCount() {

  const numbers = [
    {
      value: 26,
      title: "Gols feitos"
    },
    {
      value: 18,
      title: "Gols sofridos"
    }
  ]

  const renderNumber = (item, index) => {
    return(
      <div key={index} className="goals-count__numbers__item">
        <div className="goals-count__numbers__item__value">{item.value}</div>
        <div className="goals-count__numbers__item__title">{item.title}</div>
      </div>
    )
  }

  return (
    <article className="goals-count">
      <SectionTitle title="Gols"/>
      <div className="goals-count__numbers">
        {numbers.map((item, i) => (renderNumber(item, i)))}
      </div>
    </article>
  )
}