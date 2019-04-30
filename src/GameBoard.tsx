import * as React from 'react';
import styled from 'styled-components';
import { ReversiBoard, ReversiCell, Coordinate } from './models';

type BoardProps = {
    gameState: ReversiBoard,
    onClickCell: (coord: Coordinate) => void,
    infoMessage: string
}

// Note: I used the indices for keys in this case because the index
// of an individual cell or row should never change. Though you'd
// nromally have a real id of some sort, the unique identifier in
// this case is actually the index!. 
export default function GameBoard({ gameState, onClickCell, infoMessage }: BoardProps) {
    return (
    <TableArea>
        <InfoText>{infoMessage}</InfoText>
        <Table>
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
    font-style: italic;
    height: 20px;
    margin-top: 0px;
    margin-bottom: 15px;
    line-height: 20px;
`

const Table = styled.table`
    border-collapse: collapse;
    border-spacing: 0px;
`
const cellSize = 100
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