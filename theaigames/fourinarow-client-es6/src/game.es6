// jshint esversion: 6, node:true
export class Game {
  constructor () {
    this._field = [];
    this._round = 0;
    this._rules = {
    // time are in millisec
      timebank: 100, // Maximum time in milliseconds that your bot can have in its time bank
      time_per_move : 1000, // Time in milliseconds that is added to your bot's time bank each move
      player_names : [], // A list of all player names in this match, including your bot's name
      your_bot : '',// The name of your bot for this match
      your_botid : 0, // The number used in a field update as your bot's chips
      field_columns : 8, //  The number of columns of the playing field
      field_rows : 7 //The number of rows of the playing field
    };
  }

  toString () {
    return {field: this._field, round: this._round, rules: this._rules};
  }

  // update options
  rules (options) {
    if (typeof options !== undefined) {
      for( let key in options) {
        this.rule(key, options[key]);
      }
    }
    return this._rules;
  }

  // get/set specific rule info
  rule (key, value) {
    if (this._rules.hasOwnProperty(key)) {
      if (typeof value !== undefined) {
        switch (typeof this._rules[key]) {
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

  round (rnd) {
    if (typeof rnd !== undefined) {
      this._round = rnd;
    }
    return this._round;
  }

  field (fld) {
    if (typeof fld !== undefined) {
      let rows = fld.split(';');
      for (let i=rows.length-1; i>=0; i--) {
        rows[i] = rows[i].split(',');
      }
      this._field = rows;
    }
    return this._field;
  }

  update (opt, val, rest) {
    switch (val) {
      case 'round':
        this.round(rest[0]);
        break;
      case 'field':
        this.field(rest[0]);
        break;
    }
  }
}