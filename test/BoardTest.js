import { expect } from 'chai';
import { Game, Levels } from '../src/core/Game';
import Board from '../src/core/Board'

describe('Board logic of 3x4 with ladders and snakes', () => {
    it('generates 3 ladders and 1 snake for level easy', () => {
        let board = new Board(3, 4, Levels.EASY)

        expect(board.getLadders().length).to.be.equal(3)
        expect(board.getSnakes().length).to.be.equal(1)
    })

    it('generates 2 ladders and 2 snakes for level medium', () => {
        let board = new Board(3, 4, Levels.MEDIUM)

        expect(board.getLadders().length).to.be.equal(2)
        expect(board.getSnakes().length).to.be.equal(2)
    })

    it('generates 1 ladders and 3 snakes for level hard', () => {
        let board = new Board(3, 4, Levels.HARD)

        expect(board.getLadders().length).to.be.equal(1)
        expect(board.getSnakes().length).to.be.equal(3)
    })

    it('generates a random ladder', () => {
        const board = new Board(3, 4, Levels.NONE)

        for (let index = 0; index < 30; index++) {
            let ladder = board.generateLadder()
            expect(ladder[0]).to.be.lessThan(ladder[1])
            expect(Math.ceil(ladder[0] / board.width)).to.be.lessThan(Math.abs(ladder[1] / board.width))
        }
    })

    it('generates a random snake', () => {
        const board = new Board(3, 4, Levels.NONE)

        for (let index = 0; index < 30; index++) {
            let snake = board.generateSnake()
            expect(snake[0]).to.be.greaterThan(snake[1])
            expect(Math.ceil(snake[0] / board.width)).to.be.greaterThan(Math.abs(snake[1] / board.width))
        }

    })

    it('generates ladders and snakes without overlapping', () => {
        const board = new Board(3, 4, Levels.EASY)
        const obstaclesPoints = board.obstacles.reduce((points, obstacle) => {
            points.push(obstacle[0], obstacle[1])

            return points
        }, [])

        expect(new Set(obstaclesPoints).size).to.be.equal(obstaclesPoints.length)
    })

    it('generates a snake like board', () => {
        const board = new Board(3, 4)

        expect(board.elements).to.be.deep.equal([
            { number: 12, position: { x: 0, y: 0 }, obstacles: null },
            { number: 11, position: { x: 300, y: 0 }, obstacles: null },
            { number: 10, position: { x: 600, y: 0 }, obstacles: null },
            { number: 7, position: { x: 0, y: 300 }, obstacles: null },
            { number: 8, position: { x: 300, y: 300 }, obstacles: null },
            { number: 9, position: { x: 600, y: 300 }, obstacles: null },
            { number: 6, position: { x: 0, y: 600 }, obstacles: null },
            { number: 5, position: { x: 300, y: 600 }, obstacles: null },
            { number: 4, position: { x: 600, y: 600 }, obstacles: null },
            { number: 1, position: { x: 0, y: 900 }, obstacles: null },
            { number: 2, position: { x: 300, y: 900 }, obstacles: null },
            { number: 3, position: { x: 600, y: 900 }, obstacles: null },
        ])
    })
})