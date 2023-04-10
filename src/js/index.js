const board = document.querySelector('.board')

const randomPosition = () => Math.floor(Math.random() * 29) + 1

let config = {
    sepeed: 200,
    score: {
        x: 25,
        y: 4,
        showX: 25,
        showY: 3,
        score: 1,
        title: 'Score'
    },
    level: {
        x: 27,
        y: 4,
        showX: 27,
        showY: 3,
        title: "level",
        level: 1
    },
    player: {
        y: randomPosition(),
        x: randomPosition(),
    },
    food: {
        x: randomPosition(),
        y: randomPosition(),
    },
    velocity: {
        x: 0,
        y: 0,
    },
    showTitle() {
        const title = document.getElementById('title')

        title.style.visibility = "visible"
        title.style.opacity = "1"
        title.style.zIndex = "1"

        setTimeout(() => {
            title.style.visibility = "hidden"
            title.style.opacity = "0"
            title.style.zIndex = "-1"
        }, 3000)
    },
}

const gems = {
    cretaeFood() {
        board.innerHTML = `<div class="food" style= "grid-area: ${config.food.y} / ${config.food.x}"></div>`
    },
    createPlayer() {
        board.innerHTML += `<div class="player" id="player" style="grid-area: ${config.player.y} / ${config.player.x}"></div>`
    },
    movePlayer() {
        config.player.x += config.velocity.x
        config.player.y += config.velocity.y
    },
    showScore() {
        board.innerHTML += `<div class="score" id="score" style="grid-area: ${config.score.y} / ${config.score.x}"></div>`
        board.innerHTML += `<div class="showScore" id="showScore" style="grid-area: ${config.score.showY} / ${config.score.showX}"></div>`
        const showScore = document.getElementById('showScore')
        const score = document.getElementById('score')
        showScore.textContent = `${config.score.title}`
        score.textContent = `${config.score.score}`
    },
    secoreUp() {
        const score = config.score.score += 1
        console.log(score)
    },
    showLevel() {
        board.innerHTML += `<div class='level' id='level' style="grid-area: ${config.level.y} / ${config.level.x}"></div>`
        board.innerHTML += `<div class="showLevel" id="showLevel" style="grid-area: ${config.level.showY} / ${config.level.showX}"></div>`
        const levelUp = document.getElementById('level')
        const showLevel = document.getElementById('showLevel')
        levelUp.textContent = `${config.level.level}`
        showLevel.textContent = `${config.level.title}`
    },
    levelUp() {
        if (config.score.score % 5 == 0) {
            const level = config.level.level += 1
            console.log(`levelUp: ${level}`)
        }
    },
    isWin() {
        if (config.player.y == config.food.y && config.player.x == config.food.x) {
            config.showTitle()
            this.secoreUp()
            this.levelUp()
            return true
        }
        return false
    },
    resetPlayerPosition() {
        if (config.player.y <= 0 || config.player.y > 30 || config.player.x <= 0 || config.player.x > 30) {
            config.player.x = 4
            config.player.y = 4
        }
    },
    randomFoodPosition() {
        config.food.x = randomPosition()
        config.food.y = randomPosition()
    },
}

const movement = (listen) => {
    switch (listen.key) {
        case "w":
            config.velocity.y = -1;
            config.velocity.x = 0;
            break;
        case "s":
            config.velocity.y = 1;
            config.velocity.x = 0;
            break;
        case "a":
            config.velocity.x = -1;
            config.velocity.y = 0;
            break;
        case "d":
            config.velocity.x = 1;
            config.velocity.y = 0;
            break;
        default:
            break;
    }
}

const headMovePosition = () => {
    const player = document.getElementById('player')

    if (config.velocity.x == 1) {
        player.style.transform = "scaleX(-1)"
    }
    if (config.velocity.y == 1) {
        player.style.transform = "rotate(-90deg)"
    }
    if (config.velocity.y == -1) {
        player.style.transform = "rotate(90deg)"
    }
}

const startGame = () => {
    gems.cretaeFood()
    gems.createPlayer()
    gems.movePlayer()
    headMovePosition()
    gems.showScore()
    gems.showLevel()
    gems.resetPlayerPosition()

    const win = gems.isWin()
    if (win) gems.randomFoodPosition()
}

setInterval(startGame, config.sepeed)

document.addEventListener("keydown", movement)