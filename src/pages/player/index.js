import React, {useState, useEffect, useCallback} from 'react'
import TopBar from '../../components/top-bar'
import { useParams } from "react-router-dom"
import PlayerMainInfo from '../../components/player/player-main-info'
import Averages from '../../components/player/averages'
import firebaseDb from '../../firebase'
import { useAppStore } from '../../AppStore'
import Goalkeeper from '../../components/player/goalkeeper'
import PlayerMatches from '../../components/player/matches'
import './style.scss'

export default function StatsScreen() {

  const params = useParams()
  const [player, setPlayer] = useState({})
  const [matches, setMatches] = useState({})
  const [playerMatches, setPlayerMatches] = useState({})

  const {year} = useAppStore()

  const playedAsAStarter = useCallback((match) => {
    return match.lineUp.includes(player.name)
  }, [player])

  const playedAsAReserve = useCallback((match) => {
    let played = false
    match.substitutions.forEach(subs => {
      if(subs.in === player.name) {
        played = true
      }
    })
    return played
  }, [player])

  useEffect(() => {
    firebaseDb.child(`players/${params.id}`).once('value').then(snapshot => {
      if(snapshot.val() !== null) {
        setPlayer(snapshot.val())
      }
    })
  }, [params.id])

  useEffect(() => {
    firebaseDb.child('matches').orderByChild("year").equalTo(year).on('value', snapshot => {
      if(snapshot.val !== null) {
        setMatches({
          ...snapshot.val()
        })
      }
    })
  }, [year])

  useEffect(() => {
    if(matches) {
      let matchesPlayed = Object.values(matches).filter(match => playedAsAStarter(match) || playedAsAReserve(match))
      setPlayerMatches(matchesPlayed)
    }
  }, [matches, playedAsAStarter, playedAsAReserve])

  return (
    <article className="player-screen">
      <TopBar/>
      <PlayerMainInfo player={player}/>
      <Averages player={player}/>
      {
        player[year] && player[year].goalkeeper ?
          <Goalkeeper
            matches={player[year].goalkeeper.matches}
            cleanSheets={player[year].goalkeeper.cleanSheets}
            goalsConceded={player[year].goalkeeper.goalsConceded}
          />
        : null
      }
      <PlayerMatches matches={playerMatches} player={player}/>
    </article>
  )
}