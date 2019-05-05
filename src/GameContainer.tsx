import * as React from 'react';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import GameInfo from './GameInfo'
import { ReversiCell, ReversiBoard, Scores, Coordinate, AIKind } from './models';
import * as Reversi from './GameBoardHelpers'

type Props = {
    boardSize: number
    playerColor: ReversiCell
    aiKind: AIKind
}

export default function GameContainer({ boardSize, playerColor, aiKind }: Props) {
    if (boardSize % 2 !== 0 || boardSize < 0) {
        throw new Error('Board size is not a valid number.')
    }
    const player2Color = Reversi.getOppositeCellType(playerColor)
    const [gameState, setGameState] = React.useState<ReversiBoard>(Reversi.generateGameBoard(boardSize, playerColor))
    const [score, setScore] = React.useState<Scores>(Reversi.countScores(gameState))
    const [isPlayer2Turn, setisPlayer2Turn] = React.useState(false)
    const [infoMessage, setInfoMessage] = React.useState<string>('')

    const startAiMove = async () => {
        if (!isPlayer2Turn) {
            setisPlayer2Turn(true)
            try {
                setInfoMessage('')
                const newBoard = await Reversi.makeAiMove(gameState, aiKind, player2Color)
                setGameState(newBoard)
                setScore(Reversi.countScores(newBoard))
            } catch (e) {
                setInfoMessage('The AI couldn\'t make a move')
            }
            setisPlayer2Turn(false)
        }
    }

    const onClickCell = (coord: Coordinate) => {
        setInfoMessage('')
        if (!isPlayer2Turn || aiKind === AIKind.Human) {
            const player = isPlayer2Turn ? player2Color : playerColor
            const newBoard = Reversi.handleCellClick(gameState, coord, player)
            if (newBoard) {
                setGameState(newBoard)    
                setScore(Reversi.countScores(newBoard))
                if (aiKind !== AIKind.Human) {
                    startAiMove()    
                } else {
                    setisPlayer2Turn(!isPlayer2Turn)
                }
            } else {
                setInfoMessage('Invalid move. Please try again.')
            }
        } else {
            setInfoMessage('Please wait for the AI to finish.')
        }
    }
    return <Wrapper>
        <GameInfo
            playerColor={playerColor}
            score={score}
            aiKind={aiKind}
            currentTurn={isPlayer2Turn ? player2Color : playerColor} />
        <GameBoard
            gameState={gameState}
            onClickCell={onClickCell}
            isAiPlaying={isPlayer2Turn}
            infoMessage={infoMessage}
            score={score}
            playerColor={playerColor}/>
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

    @media (max-width: 900px) {
        flex-direction: column;
    }
`