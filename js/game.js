'use strict'

const MINE = '💣'

var gBoard
var gLevel = { size: 4, mines: 2 }
var gGame





function onInit() {
    gBoard = buildBoard()
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
   
    board[1][1].isMine = true
    board[1][2].isMine = true
    setMinesNegsCount(board)
    console.log('board:', board)

    return board
}


function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            const cell = board[i][j].isMine ? MINE : ''
            const className = board[i][j].isMine ? 'mine' : ''
            strHTML += `<td data-i=${i} data-j=${j} onclick="onCellClicked(this, ${i}, ${j})" class="cell ${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board tbody')
    elBoard.innerHTML = strHTML
}


function renderCell(cellI, cellJ, val) {
    const elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
    elCell.innerText = val
    return elCell
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].isMine) {
               const minesCount = countMinesAround(board ,i, j)
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
            var currCell = board[i][j]
            if (currCell.isMine) count++
        }
    }
    return count
}

function onCellClicked(elCell, i, j) { }
function onCellMarked(elCell) { }
function checkGameOver() { }
function expandShown(board, elCell, i, j) { }
