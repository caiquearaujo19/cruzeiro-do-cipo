import React, {useState, useEffect} from 'react'
import TopBar from '../../components/top-bar'
import { useParams } from "react-router-dom"
import PlayerMainInfo from '../../components/player/player-main-info'
import firebaseDb from '../../firebase'
import './style.scss'

export default function StatsScreen() {

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
      <PlayerMainInfo player={player}/>
      <section className="player-screen__coming-soon">
        Em breve mais informações
      </section>
    </article>
  )
}