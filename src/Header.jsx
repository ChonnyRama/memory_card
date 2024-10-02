import React from 'react'

export default function Header({
  currentScore,
  highScore
}) {

  return (
    <header>
      <h1>Spoopy Guesser</h1>
      <div className='scoreboard'>
        <div className='score high'>
          High Score: {highScore}
        </div>
        <div className='score current'>
          Current Score: {currentScore}
        </div>
      </div>
    </header>
  )
}
