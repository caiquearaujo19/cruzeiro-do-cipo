import React, {useState, useEffect} from 'react'
import TopBar from '../../components/top-bar'
import { useParams } from "react-router-dom"
import PlayerMainInfo from '../../components/player/player-main-info'
import Averages from '../../components/player/averages'
import firebaseDb from '../../firebase'
import './style.scss'

export default function StatsScreen() {

  const [year, setYear] = useState(new Date().getFullYear().toString())
  const params = useParams()
  const [player, setPlayer] = useState({})

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
      <section className="player-screen__coming-soon">
        Em breve mais informações
      </section>
    </article>
  )
}