import React from 'react'
import './style.scss'

import SectionTitle from '../../section-title'
import MatchEventsListItem from './match-events-list-item'

export default function MatchEvents({scorers, assists}) {

  return (
    <section className="match-events">
      <SectionTitle title="Gols e assistências" color="blue"/>
      <ul className="match-events__list">
        {scorers.map((player, i) => (
          <MatchEventsListItem key={i} scorer={player} assist={assists[i]}/>
        ))}
      </ul>
    </section>
  )
}