import './App.css';
import {StartScreen} from './components/StartScreen';
import {GameScreen} from './components/GameScreen';
import {EndScreen} from './components/EndScreen';
import { useState, useEffect } from 'react';
import {wordsList} from './data/wordsList';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]



function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedCategory, setPickedCategory] = useState('');
  const [pickedWordLetters, setPickedWordLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);

  const pickCategoryAndWord = () => {
    const categories = Object.keys(words);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomWord = words[randomCategory][Math.floor(Math.random() * words[randomCategory].length)];
    
    return {randomCategory, randomWord};
  }


  function startGame() {
    const {randomCategory, randomWord} = pickCategoryAndWord()
    setPickedCategory(randomCategory);
    setPickedWordLetters(randomWord.split('').map(letter => letter.toLowerCase()));
    setGameStage(stages[1].name);
  }

  function chooseNewWord() {
    const {randomCategory,randomWord} = pickCategoryAndWord()
    setPickedWordLetters(randomWord.split('').map(letter => letter.toLowerCase()));
    setPickedCategory(randomCategory);
  }

  function retryGame() {  
    setScore(0);
    setLives(5);
    chooseNewWord();
    setGameStage(stages[1].name);
  }

  useEffect(() => {
    if (lives === 0) {
      setGameStage(stages[2].name);
    }
  }, [lives])



  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <GameScreen lives={lives} setLives={setLives} score={score} setScore={setScore} setGameStage={setGameStage} chooseNewWord={chooseNewWord} category={pickedCategory} wordLetters={pickedWordLetters}/>}
      {gameStage === 'end' && <EndScreen retryGame={retryGame} score={score} />}
      
    </div>
  );
}

export default App;
