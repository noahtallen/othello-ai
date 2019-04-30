import * as React from 'react';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import GameInfo from './GameInfo'
import { ReversiCell, ReversiBoard, Scores, Coordinate } from './models';
import * as Reversi from './GameBoardHelpers'

type Props = {
    boardSize: number,
    playerColor: ReversiCell
}

export default function GameContainer({ boardSize, playerColor }: Props) {
    if (boardSize % 2 !== 0) {
        throw new Error('Board size was not an even number.')
    }
    const aIColor = Reversi.getOppositeCellType(playerColor)
    const [gameState, setGameState] = React.useState<ReversiBoard>(Reversi.generateGameBoard(boardSize, playerColor))
    const [score, setScore] = React.useState<Scores>(Reversi.countScores(gameState))
    const [isAiPlaying, setIsAiPlaying] = React.useState(false)
    const [infoMessage, setInfoMessage] = React.useState<string>('')

    const startAiMove = async () => {
        if (!isAiPlaying) {
            setIsAiPlaying(true)
            const newBoard = await Reversi.makeAiMove(gameState)
            setGameState(newBoard)
            setIsAiPlaying(false)    
        }
        setInfoMessage('')
    }

    const onClickCell = (coord: Coordinate) => {
        setInfoMessage('')
        if (!isAiPlaying) {
            const newBoard = Reversi.handleCellClick(gameState, coord, playerColor)
            if (newBoard) {
                setGameState(newBoard)    
                setScore(Reversi.countScores(newBoard))
                startAiMove()    
            } else {
                setInfoMessage('Invalid move. Please try again.')
            }
        } else {
            setInfoMessage('Please wait for the AI to finish.')
        }
    }

    return <Wrapper>
        <GameInfo playerColor={playerColor} score={score} currentTurn={isAiPlaying ? aIColor : playerColor} />
        <GameBoard gameState={gameState} onClickCell={onClickCell} infoMessage={infoMessage}/>
    </Wrapper>
}

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