import React, { useEffect, useState } from 'react'
import Cards from './components/Cards'
import useFetchPokemon from './hooks/useFetchPokemon'

export default function Content({
  onScore,
}) {
  const [selectedPokemon, setSelectedPokemon] = useState([])
  const [hasWinner, setHasWinner] = useState(true)
  const { toCard, setToCard, unusedPokemon, setUnusedPokemon } = useFetchPokemon()

  function shuffleCards() {
    const array = [...toCard]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    setToCard(array)
  }

  function onPokemon(monName) {
    shuffleCards()
    if (!selectedPokemon.includes(monName)) {
      setSelectedPokemon((prevSelected) => {
        const updatedSelected = [...prevSelected, monName]
        onScore(updatedSelected.length)
        if (updatedSelected.length >= 6) {
          onMilestone(9)
        }
        if (updatedSelected.length === 15) {
          onWin()
        }
        return updatedSelected
      })
    } else {
      setSelectedPokemon([])
      onScore(0)
      onMilestone(6)
    }
  }

  function onMilestone(numCards) {
    const newToCard = []
    const newUnused = [...unusedPokemon]
    while (newToCard.length < numCards) {
      const randomIndex = Math.floor(Math.random() * newUnused.length)
      const randomMon = newUnused.splice(randomIndex, 1)[0]
      newToCard.push(randomMon)
    }
    setToCard(newToCard)
    setUnusedPokemon(newUnused)
  }

  function onWin() {
    setHasWinner(!hasWinner)
    setSelectedPokemon([])
    onScore(0)
    onMilestone(6)

  }

  return (
    <>
      <div className={hasWinner ? 'win-box' : 'no-win'}>
        <span>You win!</span>
        <button
          onClick={onWin}
        >Replay</button>
      </div>
      <div className={hasWinner ? 'hide-win' : 'card-container'}>
        {toCard.map((pokemon) => (
          <div className='card' key={pokemon.name}>
            <Cards
              values={pokemon}
              onPokemon={(monName)=> onPokemon(monName)}
              onScore={onScore}
            />
          </div>
        ))}
      </div>
    </>

  )
}
