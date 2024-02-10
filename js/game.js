'use strict'

const MINE = '💣'
const EMPTY = ' '
const MARK = '📌'

var gBoard = []
var gLevel = { size: 4, mines: 2, }
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gIsVictory
var gLives = 3
var gTimerInterval


function onInit(indexI, indexIj) {
    gBoard = buildBoard(indexI, indexIj)
    renderBoard(gBoard)
}


function startGame(indexI, indexIj) {
    restoreGVariable()
    gBoard = buildBoard(indexI, indexIj)
    renderBoard(gBoard)
}

function buildBoard(indexI, indexIj) {
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
    if (gGame.isOn) {
        minesLocation(board, indexI, indexIj)
    }
    return board
}

function renderBoard(board, indexI, indexIj) {
    setMinesNegsCount(gBoard)
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
            strHTML += `<td id="" data-i=${i} data-j=${j} onmousedown="onCellClicked(this, ${i}, ${j} ,event)" class="cell ${className} ${cell} ">${cell}</td>\n`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board tbody')
    elBoard.innerHTML = strHTML
}

function onChoosingLevel(elBtn) {
    if (elBtn.className === "beginner") {
        gLevel.size = 4
        gLevel.mines = 2
    }
    if (elBtn.className === "medium") {
        gLevel.size = 8
        gLevel.mines = 14
    }
    if (elBtn.className === "expert") {
        gLevel.size = 12
        gLevel.mines = 32
    }
    onInit()
}

function startTimer() {
    if (gTimerInterval) clearInterval(gTimerInterval)
    var startTime = Date.now()
    gTimerInterval = setInterval(() => {
        const timeDiff = Date.now() - startTime
        const seconds = getFormatSeconds(timeDiff)
        const milliSeconds = getFormatMilliSeconds(timeDiff)

        document.querySelector('span.seconds').innerText = seconds
        document.querySelector('span.milli-seconds').innerText = milliSeconds

    }, 10)
}

function getFormatSeconds(timeDiff) {
    const seconds = Math.floor(timeDiff / 1000)
    return (seconds + '').padStart(2, '0')
}

function getFormatMilliSeconds(timeDiff) {
    const milliSeconds = new Date(timeDiff).getMilliseconds()
    return (milliSeconds + '').padStart(3, '0')
}

function checkGameOver(elCell, i, j) {
    if (checkVictory(elCell, i, j) || checkLose(elCell, i, j)) {
        gameOver()
    } else return
}

function gameOver(elCell, cellI, cellJ) {
    gGame.isOn = false
    clearInterval(gTimerInterval)
}

function checkVictory(elCell, cellI, cellJ) {
    if (countRegularCells() === gGame.shownCount && gGame.markedCount === gLevel.mines) {
        gIsVictory = true
        document.querySelector('.smiley').innerText = '😎'
        bestScore()
        return true
    }
    return false
}

function checkLose(elCell, cellI, cellJ) {
    if (gLives === 0) {
        gIsVictory = false
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[i].length; j++) {
                if (gBoard[i][j].isMine) {
                    showCellContent(i, j)
                }
            }
        }
        document.querySelector('.smiley').innerText = '🤯'
        return true
    }
    return false
}

function countRegularCells() {
    const cells = gLevel.size * gLevel.size - gLevel.mines
    return cells
}

function onBtnPlayAgain() {
    const elModal = document.querySelector('.end-game-modal')
    elModal.style.display = 'none'
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    onInit()
}

function bestScore() {
    const seconds = document.querySelector('.seconds')
    const milliSeconds = document.querySelector('.milli-seconds')
    const secondsBest = document.querySelector('.seconds-best')
    const milliSecondsBest = document.querySelector('.milli-seconds-best')

    if (secondsBest.innerText === '00' && milliSecondsBest.innerText === '000') {
        changeBestScore()
    } else if (seconds.innerText.charAt(0) < secondsBest.innerText.charAt(0)) {
        changeBestScore()
    } else if (seconds.innerText.charAt(0) === secondsBest.innerText.charAt(0)) {
        if (seconds.innerText.charAt(1) < secondsBest.innerText.charAt(1)) {
            changeBestScore()
        } else if (seconds.innerText.charAt(1) === secondsBest.innerText.charAt(1)) {
            if (milliSeconds.innerText.charAt(0) < milliSecondsBest.innerText.charAt(0)) {
                changeBestScore()
            } else if (milliSeconds.innerText.charAt(0) === milliSecondsBest.innerText.charAt(0)) {
                if (milliSeconds.innerText.charAt(1) < milliSecondsBest.innerText.charAt(1)) {
                    changeBestScore()
                } else if (milliSeconds.innerText.charAt(1) === milliSecondsBest.innerText.charAt(1)) {
                    if (milliSeconds.innerText.charAt(2) < milliSecondsBest.innerText.charAt(2)) {
                        changeBestScore()
                    }
                }
            }
        }
    }
    return
}

function changeBestScore() {
    const seconds = document.querySelector('.seconds')
    const milliSeconds = document.querySelector('.milli-seconds')
    const secondsBest = document.querySelector('.seconds-best')
    const milliSecondsBest = document.querySelector('.milli-seconds-best')
    secondsBest.innerText = seconds.innerText
    milliSecondsBest.innerText = milliSeconds.innerText
}

function restoreGVariable() {
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gLives = 3
    gHint = false
    document.querySelector('.smiley').innerText = '😁'
    document.querySelector('.lives').innerText = '💕💕💕'
    document.querySelector('.timer').innerHTML = '<span class="seconds">00</span> : <span class="milli-seconds">000</span>'
    document.querySelector('.hint1').innerText = '🔒'
    document.querySelector('.hint1').id = ""
    document.querySelector('.hint2').innerText = '🔒'
    document.querySelector('.hint2').id = ""
    document.querySelector('.hint3').innerText = '🔒'
    document.querySelector('.hint3').id = ""
}

