class Board {

    constructor(width, height, level) {
        this.width = width
        this.height = height
        this.ladders = []
        this.snakes = []

        this.generateLadders(level)
    }

    size() {
        return this.width * this.height
    }

    generateLadders(level) {
        switch (level) {
            case 1:
                this.ladders[0] = [2, 5]
                this.ladders[1] = [3, 6]
                this.ladders[2] = [4, 8]
                this.snakes[0] = [7, 1]
                break;
            case 2:
                this.ladders[0] = [2, 5]
                this.ladders[1] = [3, 6]
                this.snakes[0] = [8, 4]
                this.snakes[1] = [7, 1]
                break;
            case 3:
                this.ladders[0] = [2, 5]
                this.snakes[0] = [6, 3]
                this.snakes[1] = [8, 4]
                this.snakes[2] = [7, 1]
                break;
        }
    }

    getLadder(index) {
        const ladderStarts = this.ladders.map(ladder => ladder[0])
        const ladderIndex = ladderStarts.indexOf(index)

        return  ladderIndex < 0 ? null : this.ladders[ladderIndex]
    }
}

export default Board