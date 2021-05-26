import { expect } from 'chai';

import Game from '../src/core/Game';

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

        expect(game.winner).is.equal(game.players[1])
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
        game.play(5, 6)
        game.play(1, 1)
        game.play(1, 1)

        expect(game.players[0].position).is.equal(11)
    })

    it('grants a bonus throw if player throws a double', () => {
        game.play(2, 2)
        game.play(1, 1)

        expect(game.players[0].position).is.equal(6)
    })

    it('skips to next player if current player played its bonus', () => {
        game.play(2, 2)
        game.play(1, 1)

        game.play(2, 1) // player 2

        expect(game.players[0].position).is.equal(6)
        expect(game.players[1].position).is.equal(3)
    })
})

        // $this->assertEquals("Player 1 is on square 38", $game->play(1, 1), "Should return: 'Player 1 is on square 38'");
        // $this->assertEquals("Player 1 is on square 44", $game->play(1, 5), "Should return: 'Player 1 is on square 44'");
        // $this->assertEquals("Player 2 is on square 31", $game->play(6, 2), "Should return: 'Player 2 is on square 31'");
        // $this->assertEquals("Player 1 is on square 25", $game->play(1, 1), "Should return: 'Player 1 is on square 25'");