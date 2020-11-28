import React from 'react'
import './style.scss'

export default function PlayerAvatar({photo, size}) {
  return (
    <div
      className="player-avatar"
      style={{
        backgroundImage: `url(${photo})`,
        height: `${size}px`,
        width: `${size}px`
      }}
    />
  )
}