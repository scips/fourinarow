// jshint esversion:6, node:true
import _ from 'underscore';
import {Game} from './game.es6';

export class Bot {
  constructor(settings) {
    this.game = new Game();
    this.settings = {
      debug: false
    };
    _.extendOwn(this.settings, settings);
  }

  run() {

  }

  readline(line) {
    var [cmd, opt, val, ...rest] = line.split(' ');
    switch(cmd){
      case 'settings':
        let option = {};
        option[opt] = val;
        this.game.rules(option);
      break;
      case 'action':

      break;
      case 'update':
        this.game.update(opt, val, rest);
      break;
    }
  }

  terminate() {
    if (this.settings.debug) {
      console.info("Exiting bot");
      console.info(this.game.toString());
    }
  }
}