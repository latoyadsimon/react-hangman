import { useState, useEffect } from "react";
import wordsList from './words.json'
import './App.css'



function App () {
  const [puzzle, setPuzzle] = useState(grabPuzzleWord())
  const [guessedLetters, setGuessLetters] = useState([])
  const [incorrectLetters, setIncorrectLetters] = useState([])

function grabPuzzleWord() {
    return wordsList[Math.floor(Math.random() * wordsList.length)].toLowerCase() 
}

function handleSubmit(event) {
  event.preventDefault()
  const formData = Object.fromEntries(new FormData(event.target))
  const letter = formData.InputData
  event.target.reset()
  if(guessedLetters.includes(letter)){
    alert("You already guessed this letter!")
    return
  }
  setGuessLetters([...guessedLetters, letter])
  if(!puzzle.includes(letter)) {

    setIncorrectLetters([...incorrectLetters, letter])
  }

  console.log(formData.InputData)
}

useEffect(() => {
    if(incorrectLetters.length > 6) {
        alert("GAME OVER")
        setPuzzle(grabPuzzleWord())
        setGuessLetters([])
        setIncorrectLetters([])
        const id = setTimeout(() => setIncorrectLetters([]), 500)
        return () => clearTimeout(id);
    }

}, [incorrectLetters])




return (
  <>
  <div className="App">
    <h1>Hangman</h1>
  </div>

  <div>
    {puzzle}
  </div>

<div >
  <h2 className="puzzleWord">{ [...puzzle].map((char, index) => (
    <span key={index}>
      {guessedLetters.includes(char) ? char: "_"}
    </span>
  )) }</h2>
</div>

    <div>
      <form onSubmit={handleSubmit}>
      <input name="InputData" type="text" placeholder="Enter Letter"/>
      <button type="submit">Submit</button>
      </form>
    </div>

<h2 className="guess">{ [...incorrectLetters].map((char, index) => (
    <span key={index}>
      {char}
    </span>
  )) }</h2>

</>
)

}




export default App