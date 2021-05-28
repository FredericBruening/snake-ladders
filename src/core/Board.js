const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

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
     * 
     */
    generateObstacles(level) {
        switch (level) {
            case 1:
                this.obstacles[0] = [2, 5]
                this.obstacles[1] = [3, 6]
                this.obstacles[2] = [4, 8]
                this.obstacles[3] = [7, 1]
                break;
            case 2:
                this.obstacles[0] = [2, 5]
                this.obstacles[1] = [3, 6]
                this.obstacles[2] = [8, 4]
                this.obstacles[3] = [7, 1]
                break;
            case 3:
                this.obstacles[0] = [2, 5]
                this.obstacles[1] = [6, 3]
                this.obstacles[2] = [8, 4]
                this.obstacles[3] = [7, 1]
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

    getLadders() {
        return this.obstacles.filter(obstacle => obstacle[0] < obstacle[1])
    }

    getSnakes() {
        return this.obstacles.filter(obstacle => obstacle[0] > obstacle[1])
    }

    generateLadder() {
        const START = random(2, this.size() - this.width)
        const END = random(Math.ceil(START / this.width) * this.width + 1, this.size())

        return [START, END]
    }
}

export default Board