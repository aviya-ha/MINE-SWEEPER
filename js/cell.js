'use strict'

//gGame.isOn
function onCellClicked(elCell, i, j, ev) {
    // if (gBoard[i][j].isShow) return
    console.log('i:', i)
    console.log('elCell11:', elCell)
    if (!gGame.isOn) {
        gGame.isOn = true
        onInit(i, j)
        showCellContent(elCell, i, j)
        // console.log('showCellContent(elCell, i, j):', showCellContent(elCell, i, j))
        return
    } 
        console.log('AA:', gGame.shownCount)

        if (ev.button === 0 && !gBoard[i][j].isMarked) {
            console.log('BB:', gGame.shownCount)

            if (gBoard[i][j].isMine) {
                console.log('CC:', gGame.shownCount)
                showCellContent(elCell, i, j)
                checkGameOver(elCell, i, j)
            } else if (gBoard[i][j].minesAroundCount === 0) {
                console.log('DD:', gGame.shownCount)
                showCellContent(elCell, i, j)
                expandShown(elCell, i, j)
                checkGameOver(elCell, i, j)
            } else {
                console.log('EE:', gGame.shownCount)
                showCellContent(elCell, i, j)
                checkGameOver(elCell, i, j)
            }
            // console.log('5isShow:', gBoard[i][j].isShow)
        }


        if (ev.button === 2) {
            onCellMarked(elCell, i, j)
        }
        console.log('g shownCount:', gGame.shownCount)
    }



function onCellMarked(elCell, i, j) {
    const currCell = gBoard[i][j]

    if (!currCell.isMarked) {
        currCell.isMarked = true
        elCell.innerText = MARK
        elCell.id = 'true'
        gGame.markedCount++
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
var id = 0

function expandShown(elCell, cellI, cellJ) {
    console.log('11', gGame.shownCount)
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].isShow) continue
            console.log('////////////', id)
            id++
            console.log('22', gGame.shownCount)
            gBoard[i][j].isShow = true
            // console.log('elCell:', elCell)
            const elCurrCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCurrCell.id = 'true'
            console.log('33', gGame.shownCount)
            gGame.shownCount++
            console.log('44', gGame.shownCount)
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
    console.log('elCell.id:', elCell)
    gBoard[i][j].isShow = true
    elCell.id = 'true'
    console.log('elCell.id:', elCell)
    gGame.shownCount++
}
