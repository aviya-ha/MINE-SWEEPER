'use strict'

const MINE = '💣'
const EMPTY = ' '
const MARK = '📌'

var gBoard
var gLevel = { size: 4, mines: 2 }
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gIsVictory

function onInit() {
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function play() {
    gBoard = runGeneration(gBoard)
    renderBoard(gBoard)
}

console.table(buildBoard(gLevel.size))

function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.size; i++) {
        board.push([])
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShow: false,
                isMine: false,
                isMarked: false
            }
        }

    }

    board[0][0].isMine = true
    board[0][1].isMine = true
    // board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = true
    // board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = true
    setMinesNegsCount(board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            var cell
            var className
            if (board[i][j].isMine) {
                className = 'mine'
                cell = MINE
            } else {
                className = board[i][j].minesAroundCount
                cell = board[i][j].minesAroundCount
            }
            if (board[i][j].minesAroundCount === 0 && !board[i][j].isMine) {
                className = 'empty'
                cell = EMPTY
            }

            strHTML += `<td id=${board[i][j].isShow} data-i=${i} data-j=${j} onmousedown="onCellClicked(this, ${i}, ${j} ,event)" class="cell ${className} ${cell} ">${cell}</td>\n`
        }
        strHTML += '</tr>'
    }

    const elBoard = document.querySelector('.board tbody')
    elBoard.innerHTML = strHTML
    // console.log('strHTML:', strHTML)

}

function checkGameOver(elCell, i, j) {
    if (checkVictory(elCell, i, j) || checkLose(elCell, i, j)) {
        gameOver()
    } else return
}

function gameOver(elCell, cellI, cellJ) {
    showModalEndGame()

}

function checkVictory(elCell, cellI, cellJ) {
    console.log('gBoard[cellI][cellJ]:', gBoard[cellI][cellJ])
    if (gBoard[cellI][cellJ].isMine && elCell.id === 'true') return false
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (!(currCell.isMine && currCell.isMarked) || !(!currCell.isMine && currCell.isShow)) {
                return false
            }
        }
    }
    gIsVictory = true
    return true
}

function checkLose(elCell, cellI, cellJ) {
    if (elCell.innerText === MINE) {

        gIsVictory = false
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[i].length; j++) {
                if (gBoard[i][j] === MINE) {
                    showCellContent(gBoard[i][j], i, j)
                }
            }
        }
    return true
    }
    return false
}


function showModalEndGame() {
    const elModal = document.querySelector('.end-game-modal')
    const elModalSpan = document.querySelector('.end-game-modal .win-or-lose')
    console.log('elModalSpan:', elModalSpan)
    elModal.style.display = 'block'
    if (gIsVictory) {
        elModalSpan.innerText = 'you won'
    } else {
        elModalSpan.innerText = 'you lost'
    }
}
