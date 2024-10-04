import {useState,useEffect} from 'react'

export default function useFetchPokemon() {
  const [unusedPokemon, setUnusedPokemon] = useState([])
  const [toCard, setToCard] = useState([])

  useEffect(() => {
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

  return {toCard, setToCard, unusedPokemon}
}
