import React from 'react'
import SectionTitle from '../../section-title'
import { positions } from '../../../utils/js-utils/constants'
import './style.scss'

export default function LineUp({players}) {

    return (
        <section className="line-up">
            <SectionTitle title="Escalação" color="blue"/>
            <ul className="line-up__list">
                {players && players.length ? players.map((player, i) => (
                    <li className="line-up__list__item" key={player}>
                        <div className="line-up__list__item__position">{positions[i].pos}</div>
                        {player}
                    </li>
                )) : null}
            </ul>
        </section>
    )
}