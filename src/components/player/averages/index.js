import React from 'react'
import SectionTitle from '../../section-title'
import './style.scss'

export default function Averages({player}) {

    const goalAverage = (player.goals / player.matches).toFixed(2)
    const assitAverage = (player.assists / player.matches).toFixed(2)

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