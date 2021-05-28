import { random, range, flatten } from 'lodash'

class Board {

    constructor(width, height, level) {
        this.width = width
        this.height = height
        this.obstacles = []

        this.generateObstacles(level)
    }

    /**
     * Computes the size of the board
     * 
     * @returns The board size
     */
    size() {
        return this.width * this.height
    }

    /**
     * Generates the snakes and ladders
     */
    generateObstacles(level) {
        switch (level) {
            case 1:
                range(3).forEach(i => this.obstacles.push(this.generateLadder()))
                this.obstacles.push(this.generateSnake())

                break;
            case 2:
                range(2).forEach(i => this.obstacles.push(this.generateLadder()))
                range(2).forEach(i => this.obstacles.push(this.generateSnake()))

                break;
            case 3:
                range(3).forEach(i => this.obstacles.push(this.generateSnake()))
                this.obstacles.push(this.generateLadder())
                
                break;
        }
    }

    /**
     * Returns the obstacle at given position in the board
     * 
     * @returns Obstacle Array
     */
    getObstacle(index) {
        const obstacleStarts = this.obstacles.map(obstacle => obstacle[0])
        const obstacleIndex = obstacleStarts.indexOf(index)

        return obstacleIndex < 0 ? null : this.obstacles[obstacleIndex]
    }

    /**
     * Returns the Ladders from the obstacles
     */
    getLadders() {
        return this.obstacles.filter(obstacle => obstacle[0] < obstacle[1])
    }

    /**
     * Returns the Snakes from the obstacles
     */
    getSnakes() {
        return this.obstacles.filter(obstacle => obstacle[0] > obstacle[1])
    }

    /**
     * Generate a unique Ladder without overlapping
     */
    generateLadder() {
        const START = random(2, this.size() - this.width)
        const END = random(Math.ceil(START / this.width) * this.width + 1, this.size() - 1)

        if (this.obstacles.length > 0 && (flatten(this.obstacles).includes(START) || flatten(this.obstacles).includes(END))) {
            return this.generateLadder()
        }
        
        return [START, END]
    }

    /**
     * Generate a unique Snake without overlapping
     */
    generateSnake() {
        const START = random(this.width + 1, this.size() - 1)
        const END = random(1, (Math.ceil(START / this.width) - 1) * this.width)

        if (this.obstacles.length > 0 && (flatten(this.obstacles).includes(START) || flatten(this.obstacles).includes(END))) {
            return this.generateSnake()
        }
        
        return [START, END]
    }
}

export default Board