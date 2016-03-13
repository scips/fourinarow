// jshint esversion:6, node:true, mocha: true
import chai from 'chai';
import {Bot} from '../src/client.es6';
import {Game} from '../src/game.es6';

chai.should();

describe('client', () => {
  describe('game setup', () => {
    it('should support settings update', () => {
      let B = new Bot();
      let G = new Game();
      let settingsChange = [
        'settings timebank 9999',
        'settings time_per_move 500',
        'settings player_names player1,player2',
        'settings your_bot player1',
        'settings your_botid 1',
        'settings field_columns 7',
        'settings field_rows 6'
      ];
      for(let i=0, l=settingsChange.length; i<l; i++) {
        B.readline(settingsChange[i]);
      }
      G.rule('timebank', 9999);
      G.rule('time_per_move', 500);
      G.rule('player_names', 'player1,player2');
      G.rule('your_bot', 'player1');
      G.rule('your_botid', 1);
      G.rule('field_columns', 7);
      G.rule('field_rows', 6);
      B.game.should.deep.equal(G);
    });
  });
  describe('game update', () => {
    // update game round 1
    // update game field 0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0
    it('should support game round update', () => {
      let B = new Bot();
      B.game.round().should.equal(0);
      B.readline('update game round 1');
      B.game.round().should.equal(1);
    });
  });
});