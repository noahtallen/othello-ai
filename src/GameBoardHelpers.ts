import { ReversiBoard, ReversiCell, Scores, Coordinate } from './models'
import Directions from './Directions'

export function getOppositeCellType(cell: ReversiCell): ReversiCell {
    return cell === ReversiCell.Black ? ReversiCell.White : ReversiCell.Black
}

export function setInitialCells(board: ReversiBoard, playerColor: ReversiCell): ReversiBoard {
    // Set the initial game pieces:
    const center1 = board.length / 2 - 1
    const center2 = board.length / 2
    const aiColor = playerColor === ReversiCell.White ? ReversiCell.Black : ReversiCell.White
    board[center1][center1] = playerColor
    board[center1][center2] = aiColor
    board[center2][center1] = aiColor
    board[center2][center2] = playerColor
    return board
}

export function generateGameBoard(boardSize: number, playerColor: ReversiCell): ReversiBoard {
    const getEmpties = () => Array(boardSize).fill(ReversiCell.Empty)
    // We do a fill and then a map in order to create new instances
    // of the empties array. Otherwise, each row will reference the
    // same object in memory.
    const fullBoard = Array(boardSize).fill(0).map( getEmpties )
    return setInitialCells(fullBoard, playerColor)
}

// Call this function to update the board with new info.
// board is the existing board.
// coord is the clicked coordinate of the cell on the board
// user is the user (i.e. ReversiCell.Black) who "clicked" the cell
// Returns null if the move was invalid
// Returns the new board if the move was valid
export function handleCellClick(board: ReversiBoard, coord: Coordinate, user: ReversiCell): ReversiBoard | null {
    if (!isEmptyCell(board, coord)) {
        return null
    }

    // If there are no cells to convert, return null because
    // it was an invalid move:
    const cellsToConvert = getCellsToConvert(board, coord, user)
    if (!cellsToConvert.length) {
        return null
    }

    // Convert each cell including the clicked cell
    const newBoard = [ ...board ] // Needs to be a new memory reference or it won't update
    newBoard[coord.i][coord.j] = user
    cellsToConvert.forEach(({ i, j }) => {
        newBoard[i][j] = user
    })
    return newBoard
}

function getCell(board: ReversiBoard, coord: Coordinate): ReversiCell {
    return board[coord.i][coord.j]
}

function isEmptyCell(board: ReversiBoard, coord: Coordinate): boolean {
    return coord.i < board.length &&
        coord.j < board.length &&
        coord.i >= 0 &&
        coord.j >= 0 &&
        getCell(board, coord) === ReversiCell.Empty
}

function isFilledCell(board: ReversiBoard, coord: Coordinate): boolean {
    return coord.i < board.length &&
        coord.j < board.length &&
        coord.i >= 0 &&
        coord.j >= 0 &&
        getCell(board, coord) !== ReversiCell.Empty
}

function getCellsToConvert(board: ReversiBoard, startingCoordinate: Coordinate, placedCellType: ReversiCell): Array<Coordinate> {
    // Short cut: There are no cells to convert if
    // you tap on an empty cell
    if (!isEmptyCell(board, startingCoordinate)) {
        return []
    }
    
    const oppositeCell = getOppositeCellType(placedCellType)

    // Iterates through each of the possible directions away
    // from the starting coordinate. Then, we go through the
    // cells in that direction using the `nextCoord` function
    return Directions.map(nextCoord => {
        let coord = nextCoord(startingCoordinate)
        let cellsToConvert: Array<Coordinate> = []
        // Stop whenever we hit an invalid cell (empty or over the board)
        for( coord; isFilledCell(board, coord); coord = nextCoord(coord) ) {
            if (getCell(board, coord) === placedCellType) {
                // If we hit our own color, return the cells we found
                return cellsToConvert
            } else if (getCell(board, coord) === oppositeCell) {
                // If we hit the opposite color, save it for conversion
                cellsToConvert.push(coord)
            }
        }
        // If we get to this point, we  hit an invalid cell (blank, or over the board)
        // so we don't want to convert anything.
        return []
    }).flat()
}

export function countScores(board: ReversiBoard): Scores {
    const allCells: Array<ReversiCell> = board.flat()
    return allCells.reduce((total, curCell) => {
        const isBlack = curCell === ReversiCell.Black
        const isWhite = curCell === ReversiCell.White
        return {
            white: isWhite ? total.white + 1 : total.white,
            black: isBlack ? total.black + 1 : total.black
        }
    }, { white: 0, black: 0})
}

export async function makeAiMove(board: ReversiBoard, aiColor: ReversiCell): Promise<ReversiBoard> {
    // @TODO fill this in. Currently simulates a one second wait
    // Make sure to call `handleCellClick` once we determine which cell to click.
    // `getCellsToConvert` might be helpful for seeing how many possible cells you
    // could convert from a move
    let didMove = false
    return new Promise((resolve, reject) => {
        for (let i = 0; i < board.length; i++) {
            if (didMove) {
                break
            }
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === ReversiCell.Empty) {
                    const newBoard = handleCellClick(board, {i, j}, aiColor)
                    if (newBoard) {
                        resolve(newBoard)
                        didMove = true
                        break
                    }    
                }
            }
        }
        reject(new Error('No cells found for the AI'))
    })
}

export function areValidMoves(board: ReversiBoard): boolean {
    let blackHasMoves = false
    let whiteHasMoves = false
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            const blackMoves = getCellsToConvert(board, {i, j}, ReversiCell.Black)
            const whiteMoves = getCellsToConvert(board, {i, j}, ReversiCell.White)
            if (blackMoves.length) {
                blackHasMoves = true
            }
            if (whiteMoves.length) {
                whiteHasMoves = true
            }
            // As soon as both players have possible valid moves, return true
            if (whiteHasMoves && blackHasMoves) {
                return true
            }
        }
    }
    return blackHasMoves && whiteHasMoves
}