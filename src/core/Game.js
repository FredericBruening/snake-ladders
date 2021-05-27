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
        if (Date.now() > this.createdAt.setMilliseconds(this.maxTime)) {
            this.over = true

            throw new Error('Game is over')
        }

        const newPosition = this.players.current().position + (die1 + die2)

        if (newPosition < this.board.size()) {
            this.players.current().position = newPosition
        } else {
            this.players.current().position = (this.board.size() * 2) - newPosition
        }

        let ladder = this.board.getLadder(this.players.current().position)

        if (this.board.ladders.length > 0 && ladder) {
            this.players.current().position = ladder[1]
        }
        
        this.over = this.players.current().position === 12 ? true : false
        this.winner = this.over ? this.players.current() : null
  
        if(die1 === die2 && ! this.players.current().bonus) {
            this.players.current().bonus = true
        } else if(this.players.current().bonus) {
            this.players.current().bonus = false
        }

        if(!this.players.current().bonus) this.players.next()
    }
}

export default Game
export { Game, Levels }