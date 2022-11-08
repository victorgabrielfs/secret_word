import './styles.css'
import { useState } from 'react'
import { useEffect } from 'react';

export const GameScreen = ({lives, setLives, score, setScore, chooseNewWord, wordLetters, category}) => {
    
    
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [rightLetters, setRightLetters] = useState([]);


    useEffect(() => { 
        console.log(rightLetters.length)
        console.log(wordLetters.length)      
        if(rightLetters.length === [...new Set(wordLetters)].length) {
            chooseNewWord()
            setRightLetters([])
            setWrongLetters([])
            setGuessedLetters([])
            setScore(current => current + 10)
        }
    }, [rightLetters])

    function handleButtonClick(e) {
        e.preventDefault()
        if (!wrongLetters.includes(inputValue) && !wordLetters.includes(inputValue)) {
            setGuessedLetters(current => [...current, inputValue])
            setWrongLetters(current => [...current, inputValue])
            setLives(current => current - 1)
            setInputValue('')
        }     
        if (wordLetters.includes(inputValue) && !guessedLetters.includes(inputValue)) {
            setGuessedLetters(current => [...current, inputValue])
            setRightLetters(current => [...current, inputValue])
            setScore(current => current + 1)
            setInputValue('')   
        }
        setInputValue('')


    }
    
    return (
        <div className="game">
            <p className='points'>
                Pontos:
                <span>{score}</span>
            </p>
            <p className='lives'>
                Tentativas restantes:
                <span>{lives}</span>
            </p>
            <h1>Adivinhe a palavra</h1>
            <h3 className='tip'>
                Dica sobra palavra <span>{category}</span>
            </h3>
            <div className="wordContainer">
                {wordLetters.map((letter, index) => (
                    rightLetters.includes(letter) ? (
                        <span key={index} className="letter">{letter}</span>
                        ) : (   
                        <span key={index} className="blankSquare"></span>
                        )    
                    )
                )}    
            </div>
            <div className="letterContainer">
                <p>Tente adivinhar uma letra</p>
                <form>
                    <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} type="text" name='letter' maxLength={1}
                    required/>
                    <button onClick={handleButtonClick}>Jogar</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, index) => (
                    <span key={index}>{letter}, </span>
                ))}
            </div>
        </div>
    );
}
