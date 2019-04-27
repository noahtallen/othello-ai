import * as React from 'react';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import GameInfo from './GameInfo'
import { OthelloCell, OthelloBoard } from './models';

type Props = {
    boardSize: number,
    playerColor: OthelloCell
}

function setInitialCells(board: OthelloBoard, playerColor: OthelloCell): OthelloBoard {
    // Set the initial game pieces:
    const center1 = board.length / 2 - 1
    const center2 = board.length / 2
    const aiColor = playerColor === OthelloCell.White ? OthelloCell.Black : OthelloCell.White
    board[center1][center1] = playerColor
    board[center1][center2] = aiColor
    board[center2][center1] = aiColor
    board[center2][center2] = playerColor
    return board
}

function generateGameBoard(boardSize: number, playerColor: OthelloCell): OthelloBoard {
    const getEmpties = () => Array(boardSize).fill(OthelloCell.Empty)
    // We do a fill and then a map in order to create new instances
    // of the empties array. Otherwise, each row will reference the
    // same object in memory.
    const fullBoard = Array(boardSize).fill(0).map( getEmpties )
    return setInitialCells(fullBoard, playerColor)
}

// Call this function to update the board with new info.
// board is the existing board.
// i is the row index
// j is the column index
// user is the user (i.e. OthelloCell.Black) who "clicked" the cell
function handleCellClick(board: OthelloBoard, i: number, j: number, user: OthelloCell): OthelloBoard {
    const newBoard = [ ...board ] // Needs to be a new memory reference or it won't update
    newBoard[i][j] = user
    // @TODO: handle the conversion of existing cells
    return newBoard
}

export default function GameContainer({ boardSize, playerColor }: Props) {
    if (boardSize % 2 !== 0) {
        throw new Error('Board size was not an even number.')
    }
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [gameState, setGameState] = React.useState<OthelloBoard | null>(null)
    const startGame = () => {
        setGameState(generateGameBoard(boardSize, playerColor))
        setIsPlaying(true)
    }

    const onClickCell = (i: number, j: number) => {
        if (isPlaying && gameState) {
            const newBoard = handleCellClick(gameState, i, j, playerColor)
            console.log(newBoard)
            setGameState(newBoard)    
        }
    }

    return <Wrapper>
        {!isPlaying && <StartButton onClick={startGame}>Start a Game</StartButton>}
        {isPlaying && gameState && <GameInfo playerColor={playerColor} />}
        {isPlaying && gameState && <GameBoard gameState={gameState} onClickCell={onClickCell}/>}
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