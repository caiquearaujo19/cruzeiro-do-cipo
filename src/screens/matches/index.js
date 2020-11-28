import React from 'react'
import './style.scss'

import MatchCount from '../../components/matches/match-count'
import MatchesList from '../../components/matches/matches-list'
import MainTabs from '../../components/main-tabs'

export default function MatchesScreen() {

  const numbers = {
    matches: 16,
    wins: 8,
    draws: 4,
    loses: 4
  }

  const matches = [
    {
      id: 0,
      date: '06/09/2020',
      away: false,
      homeTeam: {
        name: 'Cruzeiro do Cipó',
        goals: 1
      },
      awayTeam: {
        name: 'Palmeiras do Bomfim',
        emblemShape: 0,
        goals: 2
      }
    },
    {
      id: 1,
      date: '13/09/2020',
      away: false,
      homeTeam: {
        name: 'Cruzeiro do Cipó',
        goals: 1
      },
      awayTeam: {
        name: 'PSG do Carrapicho',
        emblemShape: 0,
        goals: 0
      }
    },
    {
      id: 2,
      date: '20/09/2020',
      away: false,
      homeTeam: {
        name: 'Cruzeiro do Cipó',
        goals: 0
      },
      awayTeam: {
        name: 'Santos da Alívio',
        emblemShape: 4,
        goals: 0
      }
    }
  ]

  return (
    <article className="matches-screen">
      <MatchCount numbers={numbers}/>
      <MatchesList matches={matches}/>
      <MainTabs activeTab={1}/>
    </article>
  )
}