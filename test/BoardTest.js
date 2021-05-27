import { expect } from 'chai';
import { Game, Levels } from '../src/core/Game';
import Board from '../src/core/Board'

describe('Board logic of 3x4 with ladders and snakes', () => {
    it('generates 3 ladders and 1 snake for level easy', () => {
        let board = new Board(3, 4, Levels.EASY)

        expect(board.ladders.length).to.be.equal(3)
        expect(board.snakes.length).to.be.equal(1)
    })
    it('generates 2 ladders and 2 snakes for level medium', () => {
        let board = new Board(3, 4, Levels.MEDIUM)

        expect(board.ladders.length).to.be.equal(2)
        expect(board.snakes.length).to.be.equal(2)
    })
    it('generates 1 ladders and 3 snakes for level hard', () => {
        let board = new Board(3, 4, Levels.HARD)

        expect(board.ladders.length).to.be.equal(1)
        expect(board.snakes.length).to.be.equal(3)
    })
}) 