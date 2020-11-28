import React from 'react'
import './style.scss'

import SectionTitle from '../../section-title'
import Emblem from '../../emblem'

export default function NextMatch({data}) {
  return (
    <section className="next-match">
      <SectionTitle title="Próximo jogo"/>
      <div className="next-match__emblems">
        <div className="next-match__emblems__home"><Emblem shape={data.away ? data.adversary.emblemShape : undefined}/></div>
        <div className="next-match__emblems__vs">VS</div>
        <div className="next-match__emblems__away"><Emblem shape={!data.away ? data.adversary.emblemShape : undefined}/></div>
      </div>
      <div className="next-match__info">
      <div className="next-match__info__adversary">{data.adversary.name}</div>
        <div className="next-match__info__place-and-date">
          <div className="next-match__info__place-and-date__place">{data.away ? 'Fora de casa' : 'Em casa'}</div>
          <div className="next-match__info__place-and-date__date">{data.date}</div>
        </div>
      </div>
    </section>
  )
}