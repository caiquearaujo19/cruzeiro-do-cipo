import React from 'react'
import SectionTitle from '../../section-title'
import MatchesListItem from '../../matches/matches-list/matches-list-item'
import './style.scss'

export default function MatchesHistory({matches}) {

  return (
    <section className="matches-history">
      <SectionTitle title="Histórico do confronto" color="blue"/>
      <ul className="matches-history__list">
        {Object.keys(matches).length ?
          Object.keys(matches).map(id => (
            <MatchesListItem key={id} matchId={id} match={matches[id]} />
          )).reverse()
        : <div className='matches-history__not-found'>
            Nenhum confronto registrado
          </div>
        }
      </ul>
    </section>
  )
}