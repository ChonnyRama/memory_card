import React, { useEffect, useState } from 'react'
import Cards from './components/Cards'
import useFetchPokemon from './hooks/useFetchPokemon'

export default function Content({
  onScore,
}) {
  const [selectedPokemon, setSelectedPokemon] = useState([])
  const { toCard, setToCard, unusedPokemon } = useFetchPokemon()


  function onPokemon(monName) {
    //function that triggers when a pokemon is clicked
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }

    const shuffledArray = shuffle([...toCard])
    setToCard(shuffledArray)

    if (!selectedPokemon.includes(monName)) {
      setSelectedPokemon((prevSelected) => {
        const updatedSelected = [...prevSelected, monName]
        onScore(updatedSelected.length)
        return updatedSelected
      })
    } else {
      setSelectedPokemon([])
      onScore(0)
    }
  }
    //add that pokemon's name to an array


    
    
  
  return (
    <div className='card-container'>
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
  )
}
