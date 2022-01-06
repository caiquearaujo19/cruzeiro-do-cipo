import React, {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom"
import TopBar from '../../components/top-bar'
import SectionTitle from '../../components/section-title'
import {ReactComponent as AssistsIcon} from '../../assets/icons/assists.svg'
import PlayersRankingListItem from '../../components/stats/players-ranking/players-ranking-list-item'
import firebaseDb from '../../firebase'
import './style.scss'

export default function TopAssistsScreen() {
  const title = "Assistências"
  const icon = <AssistsIcon className="section-title__icon"/>
  const [topAssists, setTopAssists] = useState({})

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const query = useQuery();

  useEffect(() => {
    let year = query.get("year")
    firebaseDb.child('players').on('value', snapshot => {
      if(snapshot.val !== null) {
        let players = snapshot.val()
        let assistsList = []
        Object.keys(players).map(id => {
          let assist = players[id]
          if(assist[year] && assist[year].assists > 0) {
            assistsList.push(
              {
                id: id,
                ...assist
              }
            )
          }
        })
        assistsList.sort(orderListByAssists)
        setTopAssists(assistsList)
      }
    })
  }, [])

  const orderListByAssists = (a, b) => {
    if(a.assists < b.assists) {return 1}
    if(b.assists < a.assists) {return -1}
    return 0
  }

  return (
    <article className="top-scorers-screen">
      <TopBar />
      <header className="top-scorers-screen__header">
        <SectionTitle title={title} color="blue" icon={icon}/>
      </header>
      <ul className="top-scorers-screen__list">
        {Object.keys(topAssists).map(id => (
          <PlayersRankingListItem key={id} item={topAssists[id]} context={title}/>
        ))}
      </ul>
    </article>
  )
}