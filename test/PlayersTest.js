import { expect } from 'chai';

import Players from '../src/core/Players';

describe('a player iterator', () => {
    let players

    beforeEach(() => {
        players = new Players(5)
    })

    it('returns the current player', () => {
        expect(players.index).to.be.equal(0)

        expect(players.current()).is.equal(players.players[0])
        expect(players.current()).is.not.equal(players.players[1])
    })

    it('return the next player if next is called', () => {
        players.next()
        expect(players.index).to.be.equal(1)

        players.next()
        expect(players.index).to.be.equal(2)

        players.next()
        expect(players.index).to.be.equal(3)

        players.next()
        expect(players.index).to.be.equal(4)
 
        players.next()
        expect(players.index).to.be.equal(0)
        expect(players.current()).to.equal(players.players[0])
        expect(players.current()).to.not.equal(players.players[1])
    })
})
