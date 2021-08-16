import React, {useState, useEffect} from 'react'
import NextMatch from '../../components/home/next-match'
import LatestReports from '../../components/home/latest-reports'
import MainTabs from '../../components/main-tabs'
import firebaseDb from '../../firebase'
import './style.scss'

export default function HomeScreen() {

  const [nextMatch, setNextMatch] = useState({});
  const [loadingNextMatch, setLoadingNextMatch] = useState(false);
  const [reports, setReports] = useState({});

  useEffect(() => {
    setLoadingNextMatch(true);
    firebaseDb.child('next-match').on('value', snapshot => {
      if(snapshot.val() !== null) {
        setNextMatch({
          ...snapshot.val()
        });
        setLoadingNextMatch(false);
      }
    })
    firebaseDb.child('reports').on('value', snapshot => {
      if(snapshot.val() !== null) {
        setReports({
          ...snapshot.val()
        })
      }
    })
  }, [])

  return (
    <article className="home-screen">
      <NextMatch data={nextMatch} loading={loadingNextMatch}/>
      <LatestReports reports={reports}/>
      <MainTabs activeTab={0}/>
    </article>
  )
}