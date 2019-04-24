import * as React from 'react';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import { OthelloCell, OthelloBoard } from './models';

type Props = {
    boardSize: number
}

function generateGameBoard(boardSize: number): OthelloBoard {
    const getEmpties = () => Array(boardSize).fill(OthelloCell.Empty)
    // We do a fill and then a map in order to create new instances
    // of the empties array. Otherwise, each row will reference the
    // same object in memory.
    const fullBoard = Array(boardSize).fill(0).map( getEmpties )

    // Set the initial game pieces:
    const center1 = boardSize / 2 - 1
    const center2 = boardSize / 2
    fullBoard[center1][center1] = OthelloCell.White
    fullBoard[center1][center2] = OthelloCell.Black
    fullBoard[center2][center1] = OthelloCell.Black
    fullBoard[center2][center2] = OthelloCell.White

    console.log(fullBoard)
    return fullBoard
}

export default function GameContainer({ boardSize }: Props) {
    if (boardSize % 2 !== 0) {
        throw new Error('Board size was not an even number.')
    }
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [gameState, setGameState] = React.useState<OthelloBoard | null>(null)
    const startGame = () => {
        setGameState(generateGameBoard(boardSize))
        setIsPlaying(true)
    }
    return <Wrapper>
        {!isPlaying && <StartButton onClick={startGame}>Start a Game</StartButton>}
        {isPlaying && gameState && <GameBoard gameState={gameState} />}
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`