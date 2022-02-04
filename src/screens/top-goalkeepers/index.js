import React, {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom"
import TopBar from '../../components/top-bar'
import SectionTitle from '../../components/section-title'
import {ReactComponent as GoalkeepersIcon} from '../../assets/icons/goalkeepers.svg'
import PlayersRankingListItem from '../../components/stats/players-ranking/players-ranking-list-item'
import firebaseDb from '../../firebase'
import {orderListByCleanSheets} from '../../utils/js-utils/sorters'
import './style.scss'

export default function TopGoalkeepersScreen() {

  const query = useQuery()
  const year = query.get("year")
  const title = "Goleiros"
  const icon = <GoalkeepersIcon className="section-title__icon"/>
  const [topGoalkeepers, setTopGoalkeepers] = useState({})

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    firebaseDb.child('players').on('value', snapshot => {
      if(snapshot.val !== null) {
        let players = snapshot.val()
        let goalkeepersList = []
        Object.keys(players).forEach(id => {
          let player = players[id]
          if(player[year] && player[year].goalkeeper) {
            goalkeepersList.push(
              {
                id: id,
                ...player
              }
            )
          }
        })
        goalkeepersList.sort(orderListByCleanSheets)
        setTopGoalkeepers(goalkeepersList)
      }
    })
  }, [query, year])

  return (
    <article className="top-goalkeepers-screen">
      <TopBar />
      <header className="top-goalkeepers-screen__header">
        <SectionTitle title={title} color="blue" icon={icon}/>
      </header>
      <ul className="top-goalkeepers-screen__list">
        {Object.keys(topGoalkeepers).map(id => (
          <PlayersRankingListItem key={id} year={year} item={topGoalkeepers[id]} context={title}/>
        ))}
      </ul>
    </article>
  )
}