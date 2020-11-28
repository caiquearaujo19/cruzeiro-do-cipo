import React from 'react'
import './style.scss'

import SectionTitle from '../../section-title'
import ReportsListItem from './reports-list-item'

export default function LatestReports({reports}) {
  return (
    <section className="latest-reports">
      <SectionTitle title="Últimos informes" color="blue"/>
      <ul className="latest-reports__list">
        {reports.map(item => (
          <ReportsListItem key={item.id} data={item}/>
        ))}
      </ul>
    </section>
  )
}