import React, {useState, useEffect} from 'react'
import MatchCount from '../../components/matches/match-count'
import Loader from '../../components/loader'
import MatchesList from '../../components/matches/matches-list'
import MainTabs from '../../components/main-tabs'
import firebaseDb from '../../firebase'
import './style.scss'

export default function MatchesScreen() {

  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [numbers, setNumbers] = useState({})
  const [matches, setMatches] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let savedyear = sessionStorage.getItem('year')
    if(savedyear) {
      setYear(savedyear)
    }
  }, [])

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
    setLoading(true)
    if(matches) {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [matches])

  useEffect(() => {
    let cipoGoals
    let adversaryGoals
    let wins = 0
    let draws = 0
    let loses = 0
    if(Object.keys(matches).length > 0) {
      Object.keys(matches).forEach(id => {
        cipoGoals = matches[id].away ? matches[id].awayTeam.goals : matches[id].homeTeam.goals
        adversaryGoals = matches[id].away ? matches[id].homeTeam.goals : matches[id].awayTeam.goals
        if(cipoGoals > adversaryGoals) {wins++}
        else if(cipoGoals === adversaryGoals) {draws++}
        else if(cipoGoals < adversaryGoals) {loses++}
      })
    }
    setNumbers({
      matches: Object.keys(matches).length,
      wins: wins,
      draws: draws,
      loses: loses
    })
  }, [matches])

  return (
    <article className="matches-screen">
      <MatchCount numbers={numbers} changeYear={setYear}/>
      { loading ?
        <div className='matches-screen__loader-container'>
          <Loader />
        </div>
      :
      <div className='matches-screen__matches-list'>
        <MatchesList matches={matches}/>
      </div>
      }
      <MainTabs activeTab={1}/>
    </article>
  )
}