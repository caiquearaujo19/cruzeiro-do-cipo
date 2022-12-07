import React, {useState, useEffect} from 'react'
import NextMatch from '../../components/home/next-match'
import Loader from '../../components/loader'
import MatchesHistory from '../../components/home/matches-history'
import MainTabs from '../../components/main-tabs'
import firebaseDb from '../../firebase'
import './style.scss'

export default function HomeScreen() {

  const [nextMatch, setNextMatch] = useState({})
  const [loadingNextMatch, setLoadingNextMatch] = useState(false)
  const [matchesHistory, setMatchesHistory] = useState({})
  const [loadingHistory, setLoadingHistory] = useState(true)

  useEffect(() => {
    setLoadingNextMatch(true)
    firebaseDb.child('next-match').on('value', snapshot => {
      if(snapshot.val() !== null) {
        setNextMatch({
          ...snapshot.val()
        })
        setLoadingNextMatch(false)
      }
    })
  }, [])

  useEffect(() => {
    setLoadingHistory(true)
    if(nextMatch.adversary) {
      firebaseDb.child('matches').orderByChild('adversary').equalTo(nextMatch.adversary.name).on('value', snapshot => {
        if(snapshot.val() !== null) {
          setMatchesHistory({
            ...snapshot.val()
          })
        }
      })
    }
  }, [nextMatch])

  useEffect(() => {
    if(Object.keys(matchesHistory).length) {
      setLoadingHistory(false)
    }
  }, [matchesHistory])

  return (
    <article className="home-screen">
      <NextMatch data={nextMatch} loading={loadingNextMatch}/>
      { loadingHistory ?
        <div className='home-screen__loader-container'>
          <Loader />
        </div>
      :
        <div className='home-screen__matches-history'>
          <span>{matchesHistory[0]}</span>
          <MatchesHistory matches={matchesHistory}/>
        </div>
      }
      <MainTabs activeTab={0}/>
    </article>
  )
}