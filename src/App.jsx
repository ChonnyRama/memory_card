import { useState } from 'react'
import './App.css'
import Header from './Header'
import Content from './Content'

function App() {
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  function onScore(value) {
    setCurrentScore(value)
    if (value > highScore) {
      setHighScore(value)
    }
  }

  return (
    <>
      <Header
        currentScore={currentScore}
        highScore={highScore}
      />
      <Content
        currentScore={currentScore}
        highScore={highScore}
        onScore={onScore}
      />
    </>
  )
}

export default App
