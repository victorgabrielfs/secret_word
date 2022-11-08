import './styles.css'

export const EndScreen = ({score, retryGame}) => {
    return (
        <div className="end">
            <h1>Game Over</h1>
            <h3>Você fez {score} pontos</h3>
            <button onClick={(e) => retryGame()}>Recomeçar</button>
        </div>
    );
}