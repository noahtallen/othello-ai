import * as React from 'react';
import styled from 'styled-components';
import { OthelloBoard, OthelloCell } from './models';

type BoardProps = {
    gameState: OthelloBoard
}

// Note: I used the indices for keys in this case because the index
// of an individual cell or row should never change. Though you'd
// nromally have a real id of some sort, the unique identifier in
// this case is actually the index!. 
export default function GameBoard({ gameState }: BoardProps) {
    return <Table>
        <tbody>{gameState.map((row, i) =>
            <tr key={i} >
                {row.map((cell, j) => <GameCell cell={cell} key={j} />)}
            </tr>
        )}</tbody>
    </Table>
}

type CellProps = {
    cell: OthelloCell,
}
const GameCell = ({ cell }: CellProps) => {
    let content = null
    if (cell !== OthelloCell.Empty) {
        content = <Puck isWhite={cell === OthelloCell.White} />
    }
    return <Cell>{content}</Cell>
}

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
const Puck = styled.div<PuckProps>`
    margin: auto;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    width: ${puckSize}px;
    height: ${puckSize}px;
    border-radius: ${puckSize / 2}px;
    background-color: ${props => props.isWhite ? 'white' : 'black'};
`