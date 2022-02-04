import React, {useState, useEffect} from 'react'
import {ReactComponent as ScorersIcon} from '../../assets/icons/scorers.svg'
import {ReactComponent as AssistsIcon} from '../../assets/icons/assists.svg'
import {ReactComponent as GoalkeepersIcon} from '../../assets/icons/goalkeepers.svg'
import TeamPhase from '../../components/stats/team-phase'
import GoalsCount from '../../components/stats/goals-count'
import Loader from '../../components/loader'
import PlayersRanking from '../../components/stats/players-ranking'
import MainTabs from '../../components/main-tabs'
import firebaseDb from '../../firebase'
import './style.scss'

export default function StatsScreen() {

  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [matches, setMatches] = useState({})
  const [numbers, setNumbers] = useState([])
  const [goalsCount, setGoalsCount] = useState([])
  const [players, setPlayers] = useState({})
  const [scorers, setScorers] = useState([])
  const [assists, setAssists] = useState([])
  const [goalkeepers, setGoalkeepers] = useState([])
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
    firebaseDb.child('players').on('value', snapshot => {
      if(snapshot.val !== null) {
        setPlayers({
          ...snapshot.val()
        })
      }
    })
  }, [year])

  useEffect(() => {
    let cipoGoals
    let adversaryGoals
    let wins = 0
    let draws = 0
    let loses = 0
    let goalsScored = 0
    let concededGoals = 0
    if(Object.keys(matches).length > 0) {
      Object.keys(matches).forEach(id => {
        cipoGoals = matches[id].away ? matches[id].awayTeam.goals : matches[id].homeTeam.goals
        adversaryGoals = matches[id].away ? matches[id].homeTeam.goals : matches[id].awayTeam.goals
        goalsScored = goalsScored + cipoGoals
        concededGoals = concededGoals + adversaryGoals
        if(cipoGoals > adversaryGoals) {wins++}
        else if(cipoGoals === adversaryGoals) {draws++}
        else if(cipoGoals < adversaryGoals) {loses++}
      })
    }
    
    setNumbers([
      {title: "Jogos", value: Object.keys(matches).length},
      {title: "Vitórias", value: wins},
      {title: "Empates", value: draws},
      {title: "Derrotas", value: loses},
    ])
    setGoalsCount([
      {title: "Gols feitos", value: goalsScored},
      {title: "Gols sofridos", value: concededGoals}
    ])
  }, [matches])

  useEffect(() => {
    let scorersList = []
    let assistsList = []
    let goalkeepersList = []
    if(Object.keys(players).length > 0) {
      Object.keys(players).forEach(id => {
        let player = {
          id: id,
          ...players[id]
        }
        if(player[year]) {
          if(player[year].goals > 0) {scorersList.push(player)}
          if(player[year].assists > 0) {assistsList.push(player)}
          if(player[year].goalkeeper) {goalkeepersList.push(player)}
        }
      })
    }
    setScorers(scorersList)
    setAssists(assistsList)
    setGoalkeepers(goalkeepersList)
  }, [players, year])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <article className="stats-screen">
      <section className="stats-screen__container">
        <TeamPhase numbers={numbers} changeYear={setYear}/>
        <GoalsCount goals={goalsCount}/>
        { loading ?
          <div className='stats-screen__container__loader-container'>
            <Loader />
          </div>
        :
        <div className='stats-screen__container__rankings'>
            <PlayersRanking
              year={year}
              title="Artilheiros" 
              icon={<ScorersIcon className="section-title__icon"/>}
              list={scorers}
              seeMorePath={`/top-scorers?year=${year}`}/>
            <PlayersRanking
              year={year}
              title="Assistências"
              icon={<AssistsIcon className="section-title__icon"/>}
              list={assists}
              seeMorePath={`/top-assists?year=${year}`}/>
            <PlayersRanking
              year={year}
              title="Goleiros"
              icon={<GoalkeepersIcon className="section-title__icon"/>}
              list={goalkeepers}
              seeMorePath={`/goalkeepers?year=${year}`}/>
          </div>
        }
        <MainTabs activeTab={2}/>
      </section>
    </article>
  )
}