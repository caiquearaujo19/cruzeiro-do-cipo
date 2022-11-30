import React, {useState, useEffect} from 'react'
import TopBar from '../../components/top-bar'
import SectionTitle from '../../components/section-title'
import {ReactComponent as MatchesIcon} from '../../assets/icons/matches.svg'
import PlayersRankingListItem from '../../components/stats/players-ranking/players-ranking-list-item'
import firebaseDb from '../../firebase'
import {orderListByNumberOfMatches} from '../../utils/js-utils/sorters'
import {useAppStore} from '../../AppStore'
import './style.scss'

export default function MostMatchesScreen() {
  
  const title = "Mais jogos"
  const icon = <MatchesIcon className="section-title__icon"/>
  const [mostMatches, setMostMatches] = useState({})

  const {year} = useAppStore()

  useEffect(() => {
    firebaseDb.child('players').on('value', snapshot => {
      if(snapshot.val !== null) {
        let players = snapshot.val()
        let mostMatchesList = []
        Object.keys(players).forEach(id => {
          let player = players[id]
          if(player[year]) {
            mostMatchesList.push(
              {
                id: id,
                ...player
              }
            )
          }
        })
        mostMatchesList.sort(orderListByNumberOfMatches(year))
        setMostMatches(mostMatchesList)
      }
    })
  }, [year])

  return (
    <article className="most-matches-screen">
      <TopBar />
      <header className="most-matches-screen__header">
        <SectionTitle title={title} color="blue" icon={icon}/>
      </header>
      <ul className="most-matches-screen__list">
        {Object.keys(mostMatches).map(id => (
          <PlayersRankingListItem key={id} item={mostMatches[id]} context={title}/>
        ))}
      </ul>
    </article>
  )
}