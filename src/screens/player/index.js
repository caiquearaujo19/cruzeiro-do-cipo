import React, {useState, useEffect} from 'react'
import TopBar from '../../components/top-bar'
import { useParams } from "react-router-dom"
import PlayerMainInfo from '../../components/player/player-main-info'
import Averages from '../../components/player/averages'
import firebaseDb from '../../firebase'
import './style.scss'
import Goalkeeper from '../../components/player/goalkeeper'

export default function StatsScreen() {

  const [year, setYear] = useState(new Date().getFullYear().toString())
  const params = useParams()
  const [player, setPlayer] = useState({})

  useEffect(() => {
    let savedyear = sessionStorage.getItem('year')
    if(savedyear) {
      setYear(savedyear)
    }
  }, [])

  useEffect(() => {
    firebaseDb.child(`players/${params.id}`).once('value').then(snapshot => {
      if(snapshot.val() !== null) {
        setPlayer(snapshot.val())
      }
    })
  }, [params.id])


  return (
    <article className="player-screen">
      <TopBar/>
      <PlayerMainInfo player={player} changeYear={setYear}/>
      <Averages player={player} year={year}/>
      {
        player[year] && player[year].goalkeeper ?
          <Goalkeeper
            matches={player[year].goalkeeper.matches}
            cleanSheets={player[year].goalkeeper.cleanSheets}
            goalsConceded={player[year].goalkeeper.goalsConceded}
          />
        : null
      }
      <section className="player-screen__coming-soon">
        Em breve mais informações
      </section>
    </article>
  )
}