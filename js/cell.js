'use strict'

function onCellClicked(elCell, indexI, indexJ, ev) {
    var leftBtn = ev.button === 0
    var rightBtn = ev.button === 2
    if (!gGame.isOn) {
        if (rightBtn) return
        startGame(elCell, indexI, indexJ)
        showCellContent(elCell, indexI, indexJ)
    }


    if (leftBtn) {

        if (gBoard[indexI][indexJ].isMine) {
            if(gLives === 0){
                showCellContent(elCell, indexI, indexJ)
                checkGameOver(elCell, indexI, indexJ)
                
            }else{
                gLives--
                if(gLives === 2){
                    const elLives = document.querySelector('.live1')
                    elLives.style.display = 'none'
                }
                if(gLives === 1){
                    const elLives = document.querySelector('.live2')
                    elLives.style.display = 'none'
                }
                if(gLives === 0){
                    const elLives = document.querySelector('.live3')
                    elLives.style.display = 'none'
                }
                checkGameOver(elCell, indexI, indexJ)
            }
        } else if (gBoard[indexI][indexJ].minesAroundCount === 0) {
            showCellContent(elCell, indexI, indexJ)
            expandShown(elCell, indexI, indexJ)
            checkGameOver(elCell, indexI, indexJ)
        } else {
            showCellContent(elCell, indexI, indexJ)
            checkGameOver(elCell, indexI, indexJ)
        }
    }

    if (rightBtn) {
        onCellMarked(elCell,indexI, indexJ)
    }
}

function onCellMarked(elCell, indexI, indexJ) {
    const currCell = gBoard[indexI][indexJ]

    if (!currCell.isMarked) {
        currCell.isMarked = true
        elCell.innerText = MARK
        elCell.id = 'true'
        gGame.markedCount++
        checkGameOver(elCell, indexI, indexJ)
    } else if (currCell.isMine) {
        currCell.isMarked = false
        elCell.innerText = MINE
        elCell.id = 'false'
        gGame.markedCount--
        checkGameOver(elCell, indexI, indexJ)

    } else {
        currCell.isMarked = false
        elCell.innerText = currCell.minesAroundCount
        elCell.id = 'false'
        gGame.markedCount--
        checkGameOver(elCell, indexI, indexJ)
    }
}

function expandShown(elCell, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].isShow) continue
            gBoard[i][j].isShow = true
            const elCurrCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCurrCell.id = 'true'
            gGame.shownCount++
        }
    }
}

function showCellContent(elCell, i, j) {
    gBoard[i][j].isShow = true
    elCell.id = 'true'
    gGame.shownCount++
}
