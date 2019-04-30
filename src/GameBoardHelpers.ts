import { OthelloBoard, OthelloCell, Scores, Coordinate } from './models'
import Directions from './Directions'

export function getOppositeCellType(cell: OthelloCell): OthelloCell {
    return cell === OthelloCell.Black ? OthelloCell.White : OthelloCell.Black
}

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
// coord is the clicked coordinate of the cell on the board
// user is the user (i.e. OthelloCell.Black) who "clicked" the cell
// Returns null if the move was invalid
// Returns the new board if the move was valid
export function handleCellClick(board: OthelloBoard, coord: Coordinate, user: OthelloCell): OthelloBoard | null {
    const newBoard = [ ...board ] // Needs to be a new memory reference or it won't update

    // If there are no cells to convert, return null because
    // it was an invalid move:
    const cellsToConvert = getCellsToConvert(board, coord, user)
    if (!cellsToConvert.length) {
        return null
    }

    // Convert each cell including the clicked cell
    newBoard[coord.i][coord.j] = user
    cellsToConvert.forEach(({ i, j }) => {
        newBoard[i][j] = user
    })
    return newBoard
}

function getCellsToConvert(board: OthelloBoard, startingCoordinate: Coordinate, placedCellType: OthelloCell): Array<Coordinate> {

    const oppositeCell = getOppositeCellType(placedCellType)

    function getCell(coord: Coordinate): OthelloCell {
        return board[coord.i][coord.j]
    }

    function isValidCell(coord: Coordinate): boolean {
        return coord.i < board.length &&
            coord.j < board.length &&
            getCell(coord) !== OthelloCell.Empty
    }

    // Iterates through each of the possible directions away
    // from the starting coordinate. Then, we go through the
    // cells in that direction using the `nextCoord` function
    return Directions.map(nextCoord => {
        let coord = nextCoord(startingCoordinate)
        let cellsToConvert: Array<Coordinate> = []
        // Stop whenever we hit an invalid cell (empty or over the board)
        for( coord; isValidCell(coord); coord = nextCoord(coord) ) {
            if (getCell(coord) === placedCellType) {
                // If we hit our own color, return the cells we found
                return cellsToConvert
            } else if (getCell(coord) === oppositeCell) {
                // If we hit the opposite color, save it for conversion
                cellsToConvert.push(coord)
            }
        }
        // If we get to this point, we  hit an invalid cell (blank, or over the board)
        // so we don't want to convert anything.
        return []
    }).flat()
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
    // @TODO fill this in. Currently simulates a one second wait
    // Make sure to call `handleCellClick` once we determine which cell to click.
    // `getCellsToConvert` might be helpful for seeing how many possible cells you
    // could convert from a move
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(board), 1000)
    })
}