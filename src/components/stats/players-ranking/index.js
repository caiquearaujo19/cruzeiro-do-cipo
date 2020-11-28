import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

import ArrowRightIcon from '../../../assets/icons/right.svg'

import SectionTitle from '../../section-title'
import PlayersRankingListItem from './players-ranking-list-item'

export default function PlayersRanking({title, icon, list, seeMorePath}) {

  const listPreview = list.slice(0, 3)

  return (
    <article className="players-ranking">
      <SectionTitle title={title} color="blue" icon={icon}/>
      <ul className="players-ranking__list">
        {listPreview.map((scorer, i) => (
          <PlayersRankingListItem key={i} item={scorer}/>
        ))}
      </ul>
      <footer className="players-ranking__footer">
        <Link className="players-ranking__footer__btn-see-more" to={seeMorePath}>
          Ver todos
          <img className="players-ranking__footer__btn-see-more__icon" src={ArrowRightIcon} alt="Ver todos"/>
        </Link>
      </footer>
    </article>
  )
}