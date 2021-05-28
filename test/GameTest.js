import { expect } from 'chai';
import { Game, Levels } from '../src/core/Game';

describe('game logic of a 3x4 game without ladders or snakes', () => {
    let game;

    beforeEach(() => {
        game = new Game(3, 4)
    })

    it('ends the game once a player is at the top square', () => {
        game.play(2, 5)
        expect(game.over).is.false

        game.play(6, 6)
        expect(game.over).is.true
    })

    it('keeps the game running while no player lands on the top square', () => {
        game.play(2, 3)
        game.play(3, 3)

        expect(game.over).is.false
    })

    it('wins the player that gets to the top square', () => {
        expect(game.winner).is.null

        game.play(1, 1) // player 1
        game.play(1, 2)

        game.play(6, 6) // player 2

        expect(game.winner).is.equal(game.players.current())
    })

    it('ends the game when maximun playing time is elapsed', () => {
        let afterGame = new Date()
        afterGame.setMinutes((new Date).getMinutes() - 30)

        game.createdAt = afterGame

        expect(() => game.play(1, 1)).to.throw('Game is over')

        expect(game.over).is.to.be.true
    })

    it('does not end if the player exceeds the top square', () => {
        game.play(5, 6)
        game.play(1, 1)
        game.play(1, 1)

        expect(game.winner).is.null
        expect(game.over).is.not.true
    })

    it('bounces back if the player exceeded the top square', () => {
        game.play(5, 6) // player 1

        game.play(1, 1) // player 2
        game.play(1, 1) // player 2

        game.play(1, 1) // player 1

        expect(game.players.get(0).position).is.equal(11)
        expect(game.players.get(1).position).is.equal(4)
    })

    it('grants a bonus throw if player throws a double', () => {
        game.play(2, 2)
        game.play(1, 1)

        expect(game.players.get(0).position).is.equal(6)
    })

    it('skips to next player if current player played its bonus', () => {
        game.play(2, 2)
        game.play(1, 1)

        game.play(2, 1) // player 2

        expect(game.players.get(0).position).is.equal(6)
        expect(game.players.get(1).position).is.equal(3)
    })

})

describe('game logic of a 3x4 game without ladders or snakes and multiple players', () => {
    it('keeps the game running while no player lands on the top square with 3 players', () => {
        let game = new Game(3, 4, 3)

        game.play(3, 2) // player 1
        game.play(3, 4) // player 2
        game.play(3, 4) // player 3
        expect(game.over).is.false

        game.play(3, 2) // player 1
        game.play(3, 4) // player 2
        game.play(3, 4) // player 3
        expect(game.over).is.false
    })

    it('keeps the game running while no player lands on the top square with 4 players', () => {
        let game = new Game(3, 4, 4)

        game.play(3, 2) // player 1
        game.play(3, 4) // player 2
        game.play(3, 4) // player 3
        game.play(3, 4) // player 4
        expect(game.over).is.false

        game.play(3, 2) // player 1
        game.play(3, 4) // player 2
        game.play(3, 4) // player 3
        game.play(3, 4) // player 4
        expect(game.over).is.false
    })
})

describe('game logic of a 3x4 game with snakes and ladders', () => {
    let game

    beforeEach(() => game = new Game(3, 4, 2, Levels.EASY))

    it('takes you to the the top of the ladder', () => {
        const ladder1 = game.board.getLadders()[0]
        const ladder2 = game.board.getLadders()[1]
        game.play(0, ladder1[0]) // player 1
        game.play(0, ladder2[0]) // player 2

        expect(game.players.get(0).position).to.be.equal(ladder1[1])
        expect(game.players.get(1).position).to.be.equal(ladder2[1])
    })

    
    it('takes you to the bottom of the snake', () => {
        const snake = game.board.getSnakes()[0]

        game.play(0, snake[0])

        
        expect(game.players.get(0).position).to.be.equal(snake[1])
    })
})