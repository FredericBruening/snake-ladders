import Game from './core/Game'

const game = new Game(10, 10)

window.setup = () => {
    createCanvas(900, 1200)
}

window.draw = () => {
    background(220)
    drawTable(5, game)
}

const drawTable = (width, game) => {
    let tone = true

    for (let el of game.board.elements) {
        tone ? fill(color(255, 204, 0)) : fill(color(100, 204, 0))

        tone = !tone

        stroke(255)
        strokeWeight(12)
        square(el.position.x, el.position.y, 300)
        fill(color(0))

        noStroke()
        textSize(35)
        fill(tone ? 255 : 0)
        text(el.number, el.position.x + 12, el.position.y + 45)
    }
}
