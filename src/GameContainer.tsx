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
    setIsPlaying: (isPlaying: boolean) => void
}

export default function GameContainer({ boardSize, playerColor, aiKind, setIsPlaying }: Props) {
    if (boardSize % 2 !== 0 || boardSize < 0) {
        throw new Error('Board size is not a valid number.')
    }
    const player2Color = Reversi.getOppositeCellType(playerColor)
    const [gameState, setGameState] = React.useState<ReversiBoard>(Reversi.generateGameBoard(boardSize, playerColor))
    const [score, setScore] = React.useState<Scores>(Reversi.countScores(gameState))
    const [isPlayer2Turn, setisPlayer2Turn] = React.useState(false)
    const [infoMessage, setInfoMessage] = React.useState<string>('')
    const [isGameOver, setIsGameOver] = React.useState(false)

    const startAiMove = async (gameState: ReversiBoard) => {
        if (!isPlayer2Turn) {
            setisPlayer2Turn(true)
            // Check for the AI:
            preTurnCheck(true, gameState)
            try {
                setInfoMessage('')
                const newBoard = await Reversi.makeAiMove(gameState, aiKind, player2Color)
                setGameState(newBoard)
                setScore(Reversi.countScores(newBoard))
                setisPlayer2Turn(false)
                // Check once it's back to the current player:
                preTurnCheck(false, newBoard)    
            } catch (e) {
                setInfoMessage('The AI couldn\'t make a move')
            }
        }
    }

    const onClickCell = (coord: Coordinate) => {
        setInfoMessage('')
        if (!isPlayer2Turn || aiKind === AIKind.Human) {
            const player = isPlayer2Turn ? player2Color : playerColor
            const newBoard = Reversi.applyMove(gameState, coord, player)
            if (newBoard) {
                setGameState(newBoard)    
                setScore(Reversi.countScores(newBoard))
                if (aiKind !== AIKind.Human) {
                    startAiMove(newBoard)    
                } else {
                    setisPlayer2Turn(!isPlayer2Turn)
                    // Check for the next player if it's human vs human:
                    preTurnCheck(!isPlayer2Turn, newBoard)
                }
            } else {
                setInfoMessage('Invalid move. Please try again.')
            }
        } else {
            setInfoMessage('Please wait for the AI to finish.')
        }
    }

    const preTurnCheck = (isPlayer2Turn: boolean, gameState: ReversiBoard) => {
        const curPlayer = isPlayer2Turn ? player2Color : playerColor
        const otherPlayer = isPlayer2Turn ? playerColor : player2Color
        const areValidMoves = Reversi.doesPlayerHaveValidMoves(gameState, curPlayer)
        if (!areValidMoves) {
            const canOtherPlayerMove = Reversi.doesPlayerHaveValidMoves(gameState, otherPlayer)
            if (canOtherPlayerMove) {
                // Give turn back to other player since you can't play
                if (aiKind !== AIKind.Human) {
                    startAiMove(gameState)
                } else {
                    setisPlayer2Turn(!isPlayer2Turn)
                }
            } else {
                // Game Over if neither party can  make moves at this point
                setIsGameOver(true)
            }
        }
    }

    return <Wrapper>
        <GameInfo
            playerColor={playerColor}
            score={score}
            aiKind={aiKind}
            setIsPlaying={setIsPlaying}
            currentTurn={isPlayer2Turn ? player2Color : playerColor} />
        <GameBoard
            gameState={gameState}
            onClickCell={onClickCell}
            isGameOver={isGameOver}
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