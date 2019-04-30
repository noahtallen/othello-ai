import * as React from 'react';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import GameInfo from './GameInfo'
import { OthelloCell, OthelloBoard, Scores, Coordinate } from './models';
import * as Othello from './GameBoardHelpers'

type Props = {
    boardSize: number,
    playerColor: OthelloCell
}

export default function GameContainer({ boardSize, playerColor }: Props) {
    if (boardSize % 2 !== 0) {
        throw new Error('Board size was not an even number.')
    }
    const aIColor = Othello.getOppositeCellType(playerColor)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [gameState, setGameState] = React.useState<OthelloBoard | null>(null)
    const [score, setScore] = React.useState<Scores>({white: 0, black: 0})
    const [isAiPlaying, setIsAiPlaying] = React.useState(false)
    const [infoMessage, setInfoMessage] = React.useState<string>('')

    const startGame = () => {
        const newBoard = Othello.generateGameBoard(boardSize, playerColor)
        setGameState(newBoard)
        setScore(Othello.countScores(newBoard))
        setIsPlaying(true)
    }

    const startAiMove = async () => {
        setInfoMessage('')
        if (isPlaying && gameState && !isAiPlaying) {
            setIsAiPlaying(true)
            const newBoard = await Othello.makeAiMove(gameState)
            setGameState(newBoard)
            setIsAiPlaying(false)    
        }
    }

    const onClickCell = (coord: Coordinate) => {
        setInfoMessage('')
        if (isPlaying && gameState && !isAiPlaying) {
            const newBoard = Othello.handleCellClick(gameState, coord, playerColor)
            if (newBoard) {
                setGameState(newBoard)    
                setScore(Othello.countScores(newBoard))
                startAiMove()    
            } else {
                setInfoMessage('Invalid move. Please try again.')
            }
        }
    }

    return <Wrapper>
        {!isPlaying && <StartButton onClick={startGame}>Start a Game</StartButton>}
        {isPlaying && gameState && <GameInfo playerColor={playerColor} score={score} currentTurn={isAiPlaying ? aIColor : playerColor} />}
        {isPlaying && gameState && <GameBoard gameState={gameState} onClickCell={onClickCell} infoMessage={infoMessage}/>}
    </Wrapper>
}

const StartButton = styled.button`
    width: 200px;
    cursor: pointer;
    height: 60px;
    border-radius: 4px;
    background-color: black;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
    border: none;
    font-weight: bold;
    color: white;
    font-size: 1.4em;
    &:hover {
        background-color: gray;
    }
`

const Wrapper = styled.div`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`