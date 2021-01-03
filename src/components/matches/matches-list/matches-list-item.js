import React from 'react'
import {Link} from 'react-router-dom'
import './style.scss'

import Emblem from '../../emblem'

export default function MatchesListItem({matchId, match}) {

  const goalsCipo = match.away ? match.awayTeam.goals : match.homeTeam.goals
  const goalsAdversary = !match.away ? match.awayTeam.goals : match.homeTeam.goals

  return (
    <li className="matches-list-item">
      <Link className="matches-list-item__content" to={`/match/${matchId}`}>
        <div className="matches-list-item__content__date">{match.date}</div>
        <div className="matches-list-item__content__info">
          <div className="matches-list-item__content__info__home-team-name">{match.homeTeam.name}</div>
          <div className="matches-list-item__content__info__team-emblem">
            <Emblem shape={match.homeTeam.emblemShape} colorful={true}/>
          </div>
          <div
            className={`matches-list-item__content__info__result ${
              goalsCipo === goalsAdversary ? 'matches-list-item__content__info__result--draw' :
              goalsCipo > goalsAdversary ? 'matches-list-item__content__info__result--win' :
              'matches-list-item__content__info__result--lose'
            }`}
            >
            {match.homeTeam.goals} - {match.awayTeam.goals}
          </div>
          <div className="matches-list-item__content__info__team-emblem">
            <Emblem shape={match.awayTeam.emblemShape} colorful={true}/>
          </div>
          <div className="matches-list-item__content__info__away-team-name">{match.awayTeam.name}</div>
        </div>
      </Link>
    </li>
  )
}