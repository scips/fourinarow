// jshint esversion: 6, node: true
import {Bot} from './client.es6';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin
});

let bot = new Bot({debug: true});

rl.on('line', bot.readline.bind(bot));
rl.on('close', bot.terminate.bind(bot));
