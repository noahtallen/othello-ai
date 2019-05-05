import * as React from 'react';
import styled from 'styled-components';
import * as Reversi from './GameBoardHelpers'
import { ReversiBoard, ReversiCell, Coordinate, Scores } from './models';
import GameOver from './GameOver';

type BoardProps = {
    gameState: ReversiBoard,
    onClickCell: (coord: Coordinate) => void,
    infoMessage: string
    score: Scores
    playerColor: ReversiCell
    isAiPlaying: boolean
}

// Note: I used the indices for keys in this case because the index
// of an individual cell or row should never change. Though you'd
// nromally have a real id of some sort, the unique identifier in
// this case is actually the index!. 
export default function GameBoard({ isAiPlaying, gameState, onClickCell, infoMessage, score, playerColor }: BoardProps) {
    
    return (
    <TableArea>
        <InfoText>{infoMessage}</InfoText>
        <Table>
            {!isAiPlaying && !Reversi.areValidMoves(gameState) && <GameOver score={score} playerColor={playerColor}/> }
            <tbody>{gameState.map((row, i) =>
                <tr key={i} >
                    {row.map((cell, j) => {
                        const boundCellClickHandler = () => onClickCell({i, j})
                        return <GameCell cell={cell} key={j} onClick={boundCellClickHandler}/>
                    })}
                </tr>
            )}</tbody>
        </Table>
    </TableArea>
    )
}

type CellProps = {
    cell: ReversiCell,
    onClick: () => void
}
const GameCell = ({ cell, onClick }: CellProps) => {
    let content = null
    if (cell !== ReversiCell.Empty) {
        content = <Puck isWhite={cell === ReversiCell.White} />
    }
    return <Cell onClick={onClick}>{content}</Cell>
}


const TableArea = styled.div`
    display: flex;
    flex-direction: column;
`
const InfoText = styled.p`
    font-size: 15px;
    height: 20px;
    margin-top: 0px;
    margin-bottom: 15px;
    color: #9F2042;
    line-height: 20px;
`

const Table = styled.table`
    border-collapse: collapse;
    border-spacing: 0px;
    position: relative;
`
const cellSize = 70
const Cell = styled.td`
    width: ${cellSize}px;
    height: ${cellSize}px;
    border: 1px solid gray;
    padding: 0px;
    margin: 0;
    text-align: center;
`

type PuckProps = {
    isWhite: boolean
}
const puckSize = cellSize - 20
export const Puck = styled.div<PuckProps>`
    margin: auto;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    width: ${puckSize}px;
    height: ${puckSize}px;
    border-radius: ${puckSize / 2}px;
    background-color: ${props => props.isWhite ? 'white' : 'black'};
`