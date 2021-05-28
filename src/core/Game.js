import Board from './Board'
import Players from './Players'

const Levels = {
    NONE: 0,
    EASY: 1,
    MEDIUM: 2,
    HARD: 3
}

const MS_PER_MINUTE = 60000

class Game {

    constructor(width, height, players = 2, level = 0) {
        this.board = new Board(width, height, level)
        this.over = false
        this.players = new Players(players)
        this.winner = null
        this.createdAt = new Date()
        this.maxTime = 30 * MS_PER_MINUTE
    }

    play(die1, die2) {
        if (this.maximunGameTimeElapsed()) {
            this.over = true

            throw new Error('Game is over')
        }

        const player = this.players.current()

        player.position = player.position + (die1 + die2)

        // if player is outside the board, bounce back
        if (player.position > this.board.size()) {
            player.position = (this.board.size() * 2) - player.position
        }

        // obstacles
        const obstacle = this.board.getObstacle(player.position)
        player.position = obstacle ? obstacle[1] : player.position

        // check for bonus
        player.bonus = player.bonus ? false : die1 === die2

        this.checkGameStatus()

        if (!player.bonus) this.players.next()
    }

    checkGameStatus() {
        if (this.players.current().position === this.board.size()) {
            this.over = true
            this.winner = this.players.current()
        }
    }

    maximunGameTimeElapsed() {
        return Date.now() > this.createdAt.setMilliseconds(this.maxTime)
    }
}

export default Game
export { Game, Levels }