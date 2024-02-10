'use strict'

var gHint = false

function onCellClicked(elCell, i, j, ev) {
    if (gBoard[i][j].isShow) return
    if (!gGame.isOn) {
        if (ev.button === 2) return
        gGame.isOn = true
        startTimer()
        startGame(i, j)
        // if (!gBoard[i][j].minesAroundCount) gGame.shownCount++
        showCellContent(i, j)

    }
    if (gHint) {
        if (ev.button === 2) return
        gHint = false
        showCellContentOnHint(i, j)
        expandShownOnHint(i, j)
        setTimeout(() => {
            unShowCellContent(i, j)
            unExpandShown(elCell, i, j)
        }, 1000)
        return
    }
    if (ev.button === 0 && !gBoard[i][j].isMarked) {
        if (gBoard[i][j].isMine) {
            isThereLives(i, j)
        } else if (gBoard[i][j].minesAroundCount === 0) {
            showCellContent(i, j)
            gGame.shownCount++
            expandShown(i, j)
            checkGameOver(elCell, i, j)
        } else {
            showCellContent(i, j)
            gGame.shownCount++
            checkGameOver(elCell, i, j)
        }
    }
    if (ev.button === 2) {
        onCellMarked(elCell, i, j)
    }
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

function expandShown(cellI, cellJ) {

    if (gBoard[cellI][cellJ].minesAroundCount) return
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].isShow || gBoard[i][j].isMarked) continue
            showCellContent(i, j)
            gGame.shownCount++
            expandShown(i, j)
        }
    }
}

function showCellContent(i, j) {
    const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    elCell.id = 'true'
    if (gBoard[i][j].isMine) {
        elCell.innerText = MINE
    } else if (gBoard[i][j].isMarked) {
        return
    } else if (gBoard[i][j].minesAroundCount) {
        elCell.innerText = gBoard[i][j].minesAroundCount
        
    }else {
        elCell.innerText = '0'
        
    } 
    gBoard[i][j].isShow = true
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

function showCellContentOnHint(i, j) {
    const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    elCell.id = 'true'
    if (gBoard[i][j].isMine) {
        elCell.innerText = MINE
    } else if (gBoard[i][j].isMarked) {
        return
    } else if (gBoard[i][j].minesAroundCount) {
        elCell.innerText = gBoard[i][j].minesAroundCount
    }else elCell.innerText = '0'
    
}

function expandShownOnHint(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].isShow || gBoard[i][j].isMarked) continue
            const elCurrCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCurrCell.id = 'true'
            showCellContentOnHint(i, j)
        }
    }
}

function unShowCellContent(i, j) {
    const elCurrCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    elCurrCell.id = ''
    elCurrCell.innerText = ''
}

function unExpandShown(elCell, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].isShow || gBoard[i][j].isMarked) continue
            unShowCellContent(i, j)
            const elCurrCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCurrCell.id = ''
            elCurrCell.innerText = ''
        }
    }
}

function isThereLives(i, j) {
    const lives = document.querySelector('.lives')
    gLives--
    showBreakingHeart()
    if (gLives === 2) {
        lives.innerText = '💕💕💔'
    }
    if (gLives === 1) {
        lives.innerText = '💕💔💔'
    }
    if (gLives === 0) {
        lives.innerText = '💔💔💔'
        showCellContent(i, j)
        checkGameOver()
    }
}

function showBreakingHeart() {

    const elHeart = document.querySelector('.breaking-heart')
    elHeart.style.display = 'block'
    setTimeout(() => { document.querySelector('.breaking-heart').style.display = 'none' }, 500)
}


