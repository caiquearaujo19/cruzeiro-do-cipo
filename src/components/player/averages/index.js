import React from 'react'
import SectionTitle from '../../section-title'
import './style.scss'

export default function Averages({player, year}) {

    const goalAverage = player[year] ? (player[year].goals / player.matches).toFixed(2): 0
    const assitAverage = player[year] ? (player[year].assists / player.matches).toFixed(2) : 0

    const renderItem = (value, title) => {
        return(
        <div className="averages__numbers__item">
            <div className="averages__numbers__item__value">{value}</div>
            <div className="averages__numbers__item__title">{title}</div>
        </div>
        )
    }

    return (
        <article className="averages">
        <SectionTitle title="Médias"/>
        <div className="averages__numbers">
            {renderItem(goalAverage, "Gols por jogo")}
            {renderItem(assitAverage, "Assist. por jogo")}
        </div>
        </article>
    )
}