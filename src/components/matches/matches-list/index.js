import React from 'react'
import './style.scss'

import MatchesListItem from './matches-list-item'

export default function MatchesList({matches}) {
  return (
    <ul className="matches-list">
      {Object.keys(matches).map(id => (
        <MatchesListItem key={id} matchId={id} match={matches[id]} />
      )).reverse()}
    </ul>
  )
}