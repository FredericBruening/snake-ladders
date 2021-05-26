class Board {

    constructor(width, height) {
        this.width = width
        this.height = height
    }

    size() {
        return this.width * this.height
    }

}

export default Board