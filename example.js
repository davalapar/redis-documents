/* eslint-disable no-console */

const { Database } = require('./index');

const db = new Database({
  port: 6379,
  host: 'navigante.xyz',
  family: 4,
  db: 0,
  password: 'password',
});

db.on('connect', () => console.log('connected!'));
