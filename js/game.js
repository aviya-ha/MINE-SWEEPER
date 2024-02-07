'use strict'

const MINE = '💣'
const EMPTY = ' '
const MARK = '📌'

var gBoard
var gLevel = { size: 4, mines: 2 }
var gGame





function onInit() {
    gBoard = buildBoard()
    renderBoard(gBoard)
    // setMinesNegsCount(gBoard)
    // renderBoard(gBoard)
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

    board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = true
    board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = true
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

            strHTML += `<td id=${board[i][j].isShow} data-i=${i} data-j=${j} onclick="onCellClicked(this, ${i}, ${j} ,event)" class="cell ${className}">${cell}</td>\n`
        }
        strHTML += '</tr>'
    }

    const elBoard = document.querySelector('.board tbody')
    elBoard.innerHTML = strHTML
    // console.log('strHTML:', strHTML)

}


// function renderCell(cellI, cellJ, val) {
//     const elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
//     elCell.innerText = val
//     return elCell
// }

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].isMine) {
                var minesCount = countMinesAround(board, i, j)
                board[i][j].minesAroundCount = minesCount
            }
        }
    }

}

function countMinesAround(board, cellI, cellJ) {
    var count = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine) count++
        }
    }
    return count
}

/// needs to be called on left click
function onCellClicked(elCell, i, j , ev) {
    showCellContent(elCell, i, j)
    // if (ev.button === 1){
        if (gBoard[i][j].isMine) {
        gameOver(false)
    } else if (gBoard[i][j].minesAroundCount === 0) {
        expandShown(elCell, i, j)
        checkGameOver()
    } else {
        checkGameOver()
    // }
    // }
    // if (ev.button === 2){
    //     ev.button.preventDefault()
    //     if(!gBoard[i][j].isMarked){
    //         elCell.innerText = MARK

    //     }

    }


    // console.log('gBoard[i][j]:', gBoard[i][j])

    // console.table(gBoard)

}

/// needs to be called on right click
function onCellMarked(elCell) { }

function expandShown(elCell, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            gBoard[i][j].isShow = 'true'
            console.log('elCell:', elCell)
            const elCurrCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCurrCell.id = 'true'
        }
    }
}

function showCellContent(elCell, i, j) {
    gBoard[i][j].isShow = 'true'
    elCell.id = 'true'
}

// function renderCell(cellI, cellJ, val) {
//     const elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
//     elCell.innerText = val
// 
// }

function minesLocation() {

}


function checkGameOver() { }
function gameOver(isVictory) {
    if (isVictory) {
        console.log('won')
    } else { console.log('lose') }
}
function checkVictory() { }
function checkLose() { }
