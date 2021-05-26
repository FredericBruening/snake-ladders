import Player from './Player'
import Board from './Board'

const MS_PER_MINUTE = 60000

class Game {

    constructor(width, height, players = 2) {
        this.board = new Board(width, height)
        this.over = false
        this.players = []
        this.winner = null
        this.createdAt = new Date()
        this.maxTime = 30 * MS_PER_MINUTE

        for (let index = 0; index < players; index++) {
            this.players[index] = new Player(index)
        }

        this.currentPlayer = this.players[0]
    }

    play(die1, die2) {
        if (Date.now() > this.createdAt.setMilliseconds(this.maxTime)) {
            this.over = true

            throw new Error('Game is over')
        }

        const newPosition = this.currentPlayer.position + (die1 + die2)

        if (newPosition < this.board.size()) {
            this.currentPlayer.position = newPosition
        } else {
            this.currentPlayer.position = (this.board.size() * 2) - newPosition
        }

        this.over = this.currentPlayer.position === 12 ? true : false
        this.winner = this.over ? this.currentPlayer : null
  
        if(die1 === die2 && ! this.currentPlayer.bonus) {
            this.currentPlayer.bonus = true
        } else if(this.currentPlayer.bonus) {
            this.currentPlayer.bonus = false
        }

        if(!this.currentPlayer.bonus) this.currentPlayer = this.players[this.currentPlayer.number === 0 ? 1 : 0]
    }
}

export default Game