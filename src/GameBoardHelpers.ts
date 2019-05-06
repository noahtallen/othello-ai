import { ReversiBoard, ReversiCell, Scores, Coordinate, AIKind, HeuristicKind } from './models'
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
export function applyMove(board: ReversiBoard, coord: Coordinate, user: ReversiCell): ReversiBoard | null {
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
    const newBoard = board.map(row => [...row]) // Needs to be a new memory reference or it won't update
    
    newBoard[coord.i][coord.j] = user
    cellsToConvert.forEach(({ i, j }) => newBoard[i][j] = user)

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
    // Shortcut: There are no cells to convert if
    // you tap on a non-empty cell
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
    const white = ReversiCell.White
    const black = ReversiCell.Black

    const allCells: Array<ReversiCell> = board.flat()
    const initial = { [white]: 0, [black]: 0 }

    return allCells.reduce((total, curCell) => ({
        [white]: curCell === white ? total[white] + 1 : total[white],
        [black]: curCell === black ? total[black] + 1 : total[black]
    }), initial)
}

const aiFunctions: { [kind: number]: (board: ReversiBoard, aiColor: ReversiCell) => ReversiBoard | null } = {
    [AIKind.Human]: (board, aiColor) => { return null },
    [AIKind.PickFirst]: (board, aiColor) => {
        return getAllPossibleMoves(board, aiColor)[0];
    },
    [AIKind.OnePly]: (board, aiColor) => {
        const hKind = HeuristicKind.PuckPairity
        const cost = (x: ReversiBoard) => heuristics[hKind](x, aiColor)
        return getAllPossibleMoves(board, aiColor)
            .sort((a, b) => cost(b) - cost(a))[0];
    },
    [AIKind.MinMaxTree]: (board, aiColor) => {
        const hKind = HeuristicKind.PuckPairity
        return minimax(board, aiColor, heuristics[hKind])[0]
    },
}

function getAllPossibleMoves(board: ReversiBoard, aiColor: ReversiCell): ReversiBoard[] {
    let result: ReversiBoard[] = []
    
    for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board.length; j++) {
        if (board[i][j] === ReversiCell.Empty) {
            const newBoard = applyMove(board, {i, j}, aiColor)
            if (newBoard)
                result.push(newBoard)
        }
    }

    return result
}

// https://kartikkukreja.wordpress.com/2013/03/30/heuristic-function-for-reversiothello/
type HeuristicFunc = (board: ReversiBoard, aiColor: ReversiCell) => number
const heuristics: { [x: number /* HeuristicKind */]: HeuristicFunc } = {
    [HeuristicKind.PuckPairity]: (board, aiColor) => {
        let score = countScores(board)
        let otherPlayer = getOppositeCellType(aiColor)
    
        return (score[aiColor] - score[otherPlayer] ) / (score[aiColor] + score[otherPlayer])
    }
}

const MAX_MINIMAX_DEPTH = 5;
function minimax(board: ReversiBoard, aiColor: ReversiCell, heuristic: HeuristicFunc, depth: number = 0, isMaximizingPlayer: boolean = true, alpha: number = Number.NEGATIVE_INFINITY, beta: number = Number.POSITIVE_INFINITY): [ReversiBoard | null, number] {
    if (depth > MAX_MINIMAX_DEPTH || !areValidMoves(board))
        return [board, heuristic(board, aiColor)]

    var children = getAllPossibleMoves(board, aiColor)

    if (isMaximizingPlayer)
        return findBestMinimaxChild(children, aiColor, heuristic, isMaximizingPlayer, depth, alpha, beta, Math.max, Number.NEGATIVE_INFINITY)
    else
        return findBestMinimaxChild(children, aiColor, heuristic, isMaximizingPlayer, depth, alpha, beta, Math.min, Number.POSITIVE_INFINITY)
}

function findBestMinimaxChild(children: ReversiBoard[], aiColor: ReversiCell, heuristic: HeuristicFunc, isMaximizingPlayer: boolean, depth: number, alpha: number, beta: number, choose: (a: number, b: number) => number, initial: number): [ReversiBoard | null, number] {
    var bestBoard = null
    var bestVal = initial

    for (var i = 0; i < children.length; i++) {
        var [_, value] = minimax(children[i], aiColor, heuristic, depth+1, !isMaximizingPlayer, alpha, beta)

        bestVal = choose(bestVal, value)

        if (isMaximizingPlayer)
            alpha = choose(alpha, bestVal)
        else 
            beta = choose(beta, bestVal)

        if (bestVal == value)
            bestBoard = children[i]

        if (beta <= alpha)
            break
    }

    return [bestBoard, bestVal]
}


export async function makeAiMove(board: ReversiBoard, aiKind: AIKind, aiColor: ReversiCell, trackTime: boolean = true): Promise<ReversiBoard> {
    // @TODO fill this in.
    // Make sure to call `applyMove` once we determine which cell to click.
    // `getCellsToConvert` might be helpful for seeing how many possible cells you
    // could convert from a move
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let aiFunc = aiFunctions[aiKind];
            if (!aiFunc) {
                reject(new Error('AI "' + AIKind[aiKind]  + '" not supported.'))
                return
            }

            if (trackTime) {
                console.time('ai_turn_execution_time')
            }
            let newBoard = aiFunc(board, aiColor);
            if (trackTime && newBoard) {
                console.timeEnd('ai_turn_execution_time')
                console.log(`Number of Filled Cells: ${getNumberOfFilledCells(newBoard)}`)
            }
            if (newBoard)
                resolve(newBoard)
            else
                reject(new Error('No cells found for the AI'))
        }, 500);
    })
}

export function getNumberOfFilledCells(board: ReversiBoard): number {
    return board.flat().reduce((total, curCell) => total + (curCell !== ReversiCell.Empty ? 1 : 0), 0)
}

export function areValidMoves(board: ReversiBoard): boolean {
    let blackHasMoves = false
    let whiteHasMoves = false
    for (let i = 0; i < board.length; i++)
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
    return blackHasMoves && whiteHasMoves
}