import React from 'react'
import SectionTitle from '../../section-title'
import PlayerMatchItem from './player-match-item'
import './style.scss'

export default function PlayerMatches({matches, player}) {
  return (
    <section className="player-matches">
        <SectionTitle title="Jogos" color="blue"/>
        <ul className="matches-list">
            {Object.keys(matches).map(id => (
            <PlayerMatchItem key={id} matchId={id} match={matches[id]} player={player}/>
            )).reverse()}
        </ul>
    </section>
  )
}