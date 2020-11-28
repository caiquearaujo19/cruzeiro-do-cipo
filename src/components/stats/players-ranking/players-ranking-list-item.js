import React from 'react'
import {Link} from 'react-router-dom'
import './style.scss'

import PlayerAvatar from '../../player-avatar'

export default function PlayersRankingListItem({item}) {
  return (
    <li className="players-ranking-list-item">
      <Link className="players-ranking-list-item__content" to={`/player/${item.id}`}>
        <PlayerAvatar size={40} photo={item.photo}/>
        <div className="players-ranking-list-item__content__name">{item.name}</div>
        <div className="players-ranking-list-item__content__value">{item.value}</div>
      </Link>
    </li>
  )
}