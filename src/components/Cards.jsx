import React, { useEffect, useState } from 'react'

export default function Cards({
  values,
  onPokemon,
  onScore
}) {
  const [sprite, setSprite] = useState(0)
  const [typing, setTyping] = useState([])
  
  useEffect(() => {

    const fetchImages = async () => {
      const result = await fetch(values.url)
      const data = await result.json()
      setSprite(data.sprites.front_default)
      const typeImages = await Promise.all(
        data.types
          .map((type) => type.type.url)
          .map(async (url) => {
            const result = await fetch(url)
            const data = await result.json()
            return data.sprites['generation-vi']['x-y']['name_icon']
          })
      );
      setTyping(typeImages)
    }
    fetchImages()
    
  }, [values.url])



  function capitalizeFirstLetter() {
    return values.name.charAt(0).toUpperCase() + values.name.slice(1)
  }
  
  return (
    <>
      <button
        onClick={() => onPokemon(values.name)}  
      >
        <img src={sprite} alt={values.name} />
      </button>
      <div className='pokemon-info'>
        {capitalizeFirstLetter()}
        <div className='typing'>
          {typing.map((type,index) => (
            <img key={index} src={type} alt={values.name + 'type' + {index}} />
          ))}
        </div>
      </div>
    </>
  )
}
