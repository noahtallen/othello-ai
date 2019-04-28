import { OthelloBoard, OthelloCell, Scores } from './models'


export function setInitialCells(board: OthelloBoard, playerColor: OthelloCell): OthelloBoard {
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

export function generateGameBoard(boardSize: number, playerColor: OthelloCell): OthelloBoard {
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
export function handleCellClick(board: OthelloBoard, i: number, j: number, user: OthelloCell): OthelloBoard {
    const newBoard = [ ...board ] // Needs to be a new memory reference or it won't update
    newBoard[i][j] = user
    // @TODO: handle the conversion of existing cells
    return newBoard
}

export function countScores(board: OthelloBoard): Scores {
    const allCells: Array<OthelloCell> = board.flat()
    return allCells.reduce((total, curCell) => {
        const isBlack = curCell === OthelloCell.Black
        const isWhite = curCell === OthelloCell.White
        return {
            white: isWhite ? total.white + 1 : total.white,
            black: isBlack ? total.black + 1 : total.black
        }
    }, { white: 0, black: 0})
}

export async function makeAiMove(board: OthelloBoard): Promise<OthelloBoard> {
    // @TODO fill this in
    setTimeout(() => Promise.resolve(board), 2000)
}