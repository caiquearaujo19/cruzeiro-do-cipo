import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ArrowRightIcon from '../../../assets/icons/right.svg'
import SectionTitle from '../../section-title'
import PlayersRankingListItem from './players-ranking-list-item'
import {
  orderListByGoals,
  orderListByAssists,
  orderListByCleanSheets
} from '../../../utils/js-utils/sorters'
import './style.scss'

export default function PlayersRanking({year, title, icon, list, seeMorePath}) {

  const [listPreview, setListPreview] = useState([])

  useEffect(() => {
    switch(title) {
      case "Artilheiros":
        list.sort(orderListByGoals)
        break
      case "Assistências":
        list.sort(orderListByAssists)
        break
      case "Goleiros":
        list.sort(orderListByCleanSheets)
        break
      default:
        break
    }
    setListPreview(list.slice(0, 3))
  }, [list, title])

  return (
    <article className="players-ranking">
      <SectionTitle title={title} color="blue" icon={icon}/>
      <ul className="players-ranking__list">
        {listPreview.map((item, i) => (
          <PlayersRankingListItem key={i} year={year} item={item} context={title} ranking={i + 1}/>
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