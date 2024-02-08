'use strict'

function onCellClicked(elCell, i, j, ev) {
    if (gBoard[i][j].isShow) return

    if (ev.button === 0 && !gBoard[i][j].isMarked) {

        showCellContent(elCell, i, j)
        if (gBoard[i][j].isMine) {
            checkGameOver(elCell, i, j)
        } else if (gBoard[i][j].minesAroundCount === 0) {
            expandShown(elCell, i, j)
            checkGameOver(elCell, i, j)
        } else {
            checkGameOver(elCell, i, j)
        }
        // console.log('5isShow:', gBoard[i][j].isShow)
    }


    if (ev.button === 2) {
        onCellMarked(elCell, i, j)

    }
}

function onCellMarked(elCell, i, j) {
    const currCell = gBoard[i][j]
    console.log('gGame.markedCount',  gGame.markedCount)

    if (!currCell.isMarked) {
        currCell.isMarked = true
        elCell.innerText = MARK
        elCell.id = 'true'
        gGame.markedCount++
        gGame.shownCount++
        checkGameOver(elCell, i, j)
    } else if (currCell.isMine) {
        currCell.isMarked = false
        elCell.innerText = MINE
        elCell.id = 'false'
        gGame.markedCount--
        checkGameOver(elCell, i, j)
        
    } else {
        currCell.isMarked = false
        elCell.innerText = currCell.minesAroundCount
        elCell.id = 'false'
        gGame.markedCount--
        checkGameOver(elCell, i, j)
        
    }
}

function expandShown(elCell, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            gBoard[i][j].isShow = true
            // console.log('elCell:', elCell)
            const elCurrCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCurrCell.id = 'true'
        }
    }
}
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

function showCellContent(elCell, i, j) {
    gBoard[i][j].isShow = true
    elCell.id = 'true'
    gGame.shownCount++
}
