import React, { useEffect, useState } from 'react'
import Cards from './components/Cards'

export default function Content({
  onScore,
}) {
  const [unusedPokemon, setUnusedPokemon] = useState([])
  const [toCard, setToCard] = useState([])
  const [selectedPokemon,setSelectedPokemon] = useState([])

  useEffect(() => {
    const pokemonArray = []
    const searchFilters = ['small', 'average', 'large', 'super', 'busted', 'totem' ]
    const fetchGhostTypes = async () => {
      const result = await fetch('https://pokeapi.co/api/v2/type/ghost')
      const data = await result.json()
      const ghostTypePokemon = data.pokemon
        .map((mon) => ({
        name: mon.pokemon.name,
        url: mon.pokemon.url,
        }))
        .filter((mon) => searchFilters.every((filter => !mon.name.includes(filter))));
      
      const selectedPokemon = [];
      while (selectedPokemon.length < 6) {
        const randomIndex = Math.floor(Math.random() * ghostTypePokemon.length)
        const selected = ghostTypePokemon.splice(randomIndex, 1)[0]
        selectedPokemon.push(selected)
      }
      setUnusedPokemon(ghostTypePokemon);
      setToCard(selectedPokemon);

    }
    fetchGhostTypes();
  }, [])


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
