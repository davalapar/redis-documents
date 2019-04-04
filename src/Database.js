const EventEmitter = require('events');
const IORedis = require('ioredis');
const isPlainObject = require('lodash/isPlainObject');

const RedisEvents = [
  'connect',
  'ready',
  'error',
  'close',
  'reconnecting',
  'end',
];

class Database extends EventEmitter {
  constructor(redisConfig) {
    super();
    if (isPlainObject(redisConfig) === false) {
      throw Error('Database : Parameter "redisConfig" must be a plain object.');
    }
    const connection = new IORedis(redisConfig);
    for (let i = 0, l = RedisEvents.length; i < l; i += 1) {
      connection.on(RedisEvents[i], (...args) => this.emit(RedisEvents[i], ...args));
    }
    this.connection = connection;
  }
}

// { port: 6379, host: 'navigante.xyz', family: 4, db: 0 }
module.exports = Database;
