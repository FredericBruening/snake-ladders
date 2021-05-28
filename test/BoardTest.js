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

        // for (let index = 0; index < 30; index++) {
        //     let ladder = board.generateLadder()
        //     expect(ladder[0]).to.be.lessThan(ladder[1])
        //     expect(Math.ceil(ladder[0] / board.width)).to.be.lessThan(Math.abs(ladder[1] / board.width))
        // }
    })
})