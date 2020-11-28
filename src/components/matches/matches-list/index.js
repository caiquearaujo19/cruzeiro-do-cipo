import React from 'react'
import './style.scss'

import MatchesListItem from './matches-list-item'

export default function MatchesList({matches}) {
  return (
    <ul className="matches-list">
      {matches.map(match => (
        <MatchesListItem key={match.id} match={match} />
      ))}
    </ul>
  )
}