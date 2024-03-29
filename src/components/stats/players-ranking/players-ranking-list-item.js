import React from 'react'
import {Link} from 'react-router-dom'
import PlayerAvatar from '../../player-avatar'
import './players-ranking-list-item.scss'

export default function PlayersRankingListItem({item, context}) {
  return (
    <li className="players-ranking-list-item">
      <Link className="players-ranking-list-item__content" to={`/player/${item.id}`}>
        <PlayerAvatar size={40} photo={item.photo}/>
        <div className="players-ranking-list-item__content__name">{item.name}</div>
        <div className="players-ranking-list-item__content__value">
          {context === "Artilheiros" ? item.goals : item.assists}
        </div>
      </Link>
    </li>
  )
}