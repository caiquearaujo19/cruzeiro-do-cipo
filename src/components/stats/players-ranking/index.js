import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ArrowRightIcon from '../../../assets/icons/right.svg'
import SectionTitle from '../../section-title'
import PlayersRankingListItem from './players-ranking-list-item'
import './style.scss'

export default function PlayersRanking({year, title, icon, list, seeMorePath}) {

  const [listPreview, setListPreview] = useState([])

  useEffect(() => {
    if(title === "Artilheiros") {list.sort(orderListByGoals)}
    else {list.sort(orderListByAssists)}
    setListPreview(list.slice(0, 3))
  }, [list, title])

  const orderListByGoals = (a, b) => {
    if(a.goals < b.goals) {return 1}
    if(b.goals < a.goals) {return -1}
    return 0
  }

  const orderListByAssists = (a, b) => {
    if(a.assists < b.assists) {return 1}
    if(b.assists < a.assists) {return -1}
    return 0
  }

  return (
    <article className="players-ranking">
      <SectionTitle title={title} color="blue" icon={icon}/>
      <ul className="players-ranking__list">
        {listPreview.map((scorer, i) => (
          <PlayersRankingListItem key={i} year={year} item={scorer} context={title}/>
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