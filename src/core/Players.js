import Player from './Player'

class Players {
    constructor(number){
        this.players = []

        for(let i = 0; i < number; i++) {
            this.players.push(new Player())
        }

        this.index = 0
    }

    current() {
        return this.players[this.index]
    }

    next() {
        if(this.index < this.players.length - 1) {
            this.index++
        } else {
            this.index = 0
        }
    }

    get(index) {
        return this.players[index]
    }

    [Symbol.iterator]() {
        return this.players.values()
    }
}

export default Players