'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();

describe('general test do nothing', function () {});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// jshint esversion: 6, node:true

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this._field = [];
    this._round = 0;
    this._rules = {
      // time are in millisec
      timebank: 100, // Maximum time in milliseconds that your bot can have in its time bank
      time_per_move: 1000, // Time in milliseconds that is added to your bot's time bank each move
      player_names: [], // A list of all player names in this match, including your bot's name
      your_bot: '', // The name of your bot for this match
      your_botid: 0, // The number used in a field update as your bot's chips
      field_columns: 8, //  The number of columns of the playing field
      field_rows: 7 //The number of rows of the playing field
    };
  }

  _createClass(Game, [{
    key: 'toString',
    value: function toString() {
      return { field: this._field, round: this._round, rules: this._rules };
    }

    // update options

  }, {
    key: 'rules',
    value: function rules(options) {
      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== undefined) {
        for (var key in options) {
          this.rule(key, options[key]);
        }
      }
      return this._rules;
    }

    // get/set specific rule info

  }, {
    key: 'rule',
    value: function rule(key, value) {
      if (this._rules.hasOwnProperty(key)) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
          switch (_typeof(this._rules[key])) {
            case 'array':
              this._rules[key] = value.split(',');
              break;
            case 'number':
              this._rules[key] = parseInt(value, 10);
              break;
            case 'string':
              this._rules[key] = value;
              break;
            default:
              this._rules[key] = value;
              break;
          }
        }
        return this._rules[key];
      }
    }
  }, {
    key: 'round',
    value: function round(rnd) {
      if ((typeof rnd === 'undefined' ? 'undefined' : _typeof(rnd)) !== undefined) {
        this._round = rnd;
      }
      return this._round;
    }
  }, {
    key: 'field',
    value: function field(fld) {
      if ((typeof fld === 'undefined' ? 'undefined' : _typeof(fld)) !== undefined) {
        var rows = fld.split(';');
        for (var i = rows.length - 1; i >= 0; i--) {
          rows[i] = rows[i].split(',');
        }
        this._field = rows;
      }
      return this._field;
    }
  }, {
    key: 'update',
    value: function update(opt, val, rest) {
      switch (val) {
        case 'round':
          this.round(rest[0]);
          break;
        case 'field':
          this.field(rest[0]);
          break;
      }
    }
  }]);

  return Game;
}();

var Bot = function () {
  function Bot(settings) {
    _classCallCheck(this, Bot);

    this.game = new Game();
    this.settings = {
      debug: false
    };
    _underscore2.default.extendOwn(this.settings, settings);
  }

  _createClass(Bot, [{
    key: 'run',
    value: function run() {}
  }, {
    key: 'readline',
    value: function readline(line) {
      var _line$split = line.split(' ');

      var _line$split2 = _toArray(_line$split);

      var cmd = _line$split2[0];
      var opt = _line$split2[1];
      var val = _line$split2[2];

      var rest = _line$split2.slice(3);

      switch (cmd) {
        case 'settings':
          var option = {};
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
  }, {
    key: 'terminate',
    value: function terminate() {
      if (this.settings.debug) {
        console.info("Exiting bot");
        console.info(this.game.toString());
      }
    }
  }]);

  return Bot;
}();

_chai2.default.should();

describe('client', function () {
  describe('game setup', function () {
    it('should support settings update', function () {
      var B = new Bot();
      var G = new Game();
      var settingsChange = ['settings timebank 9999', 'settings time_per_move 500', 'settings player_names player1,player2', 'settings your_bot player1', 'settings your_botid 1', 'settings field_columns 7', 'settings field_rows 6'];
      for (var i = 0, l = settingsChange.length; i < l; i++) {
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
  describe('game update', function () {
    // update game round 1
    // update game field 0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,0,0,0,0
    it('should support game round update', function () {
      var B = new Bot();
      B.game.round().should.equal(0);
      B.readline('update game round 1');
      B.game.round().should.equal(1);
    });
  });
});