import React, {useState, useEffect} from 'react'
import TopBar from '../../components/top-bar'
import MatchInfo from '../../components/match/match-info'
import MatchEvents from '../../components/match/match-events'
import { useParams } from "react-router-dom"
import firebaseDb from '../../firebase'
import './style.scss'

export default function MatchScreen() {

  const params = useParams()
  const [match, setMatch] = useState({})
  const [scorers, setScorers] = useState({})
  const [assists, setAssists] = useState({})

  useEffect(() => {
    firebaseDb.child(`matches/${params.id}`).once('value').then(snapshot => {
      if(snapshot.val() !== null) {
        setMatch(snapshot.val())
      }
    })
  }, [params.id])

  useEffect(() => {
    if(match.homeTeam !== undefined) {
      setScorers(match.away ? match.awayTeam.scorers : match.homeTeam.scorers)
      setAssists(match.away ? match.awayTeam.assists : match.homeTeam.assists)
    }
  }, [match])

  return (
    <article className="match-screen">
      <TopBar/>
      <MatchInfo match={match}/>
      <MatchEvents scorers={scorers} assists={assists}/>
    </article>
  )
}