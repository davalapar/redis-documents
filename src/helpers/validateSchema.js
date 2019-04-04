
const isPlainObject = require('lodash/isPlainObject');

const validateSchema = (schema) => {
  if (isPlainObject(schema) === false) {
    throw Error('Parameter "schema" must be a plain object.');
  }
  const keys = Object.keys(schema);
  for (let i = 0, l = keys.length; i < l; i += 1) {
    const key = keys[i];
    if (isPlainObject(schema[key]) === false) {
      throw Error(`Schema at "${key}": must be a plain object.`);
    }
    const { type } = schema[key];
    if (typeof type !== 'string' || ['boolean', 'string', 'number', 'array'].includes(type) === false) {
      throw Error(`Schema at "${key}": "type" must be one of "boolean, string, number, array".`);
    }
    const { required } = schema[key];
    if (typeof required !== 'boolean') {
      throw Error(`Schema at "${key}": "required" must be a boolean.`);
    }
    switch (type) {
      case 'boolean':
        break;
      case 'string': {
        const { min } = schema[key];
        if (min !== undefined) {
          if (Number.isNaN(min) === true) {
            throw Error(`Schema at "${key}": "min" must not be "NaN".`);
          }
          if (Number.isFinite(min) === false) {
            throw Error(`Schema at "${key}": "min" must be a finite number.`);
          }
          if (Math.floor(min) !== min) {
            throw Error(`Schema at "${key}": "min" must be an integer.`);
          }
        }
        const { max } = schema[key];
        if (max !== undefined) {
          if (Number.isNaN(max) === true) {
            throw Error(`Schema at "${key}": "max" must not be "NaN".`);
          }
          if (Number.isFinite(max) === false) {
            throw Error(`Schema at "${key}": "max" must be a finite number.`);
          }
          if (Math.floor(max) !== max) {
            throw Error(`Schema at "${key}": "max" must be an integer.`);
          }
        }
        if (min !== undefined && max !== undefined) {
          if (min > max) {
            throw Error(`Schema at "${key}": "min" must be less than "max".`);
          }
        }
        break;
      }
      case 'number': {
        const { min } = schema[key];
        if (min !== undefined) {
          if (Number.isNaN(min) === true) {
            throw Error(`Schema at "${key}": "min" must not be "NaN".`);
          }
          if (Number.isFinite(min) === false) {
            throw Error(`Schema at "${key}": "min" must be a finite number.`);
          }
        }
        const { max } = schema[key];
        if (max !== undefined) {
          if (Number.isNaN(max) === true) {
            throw Error(`Schema at "${key}": "max" must not be "NaN".`);
          }
          if (Number.isFinite(max) === false) {
            throw Error(`Schema at "${key}": "max" must be a finite number.`);
          }
        }
        if (min !== undefined && max !== undefined) {
          if (min > max) {
            throw Error(`Schema at "${key}": "min" must be less than "max".`);
          }
        }
        break;
      }
      case 'array': {
        const { min } = schema[key];
        if (min !== undefined) {
          if (Number.isNaN(min) === true) {
            throw Error(`Schema at "${key}": "min" must not be "NaN".`);
          }
          if (Number.isFinite(min) === false) {
            throw Error(`Schema at "${key}": "min" must be a finite number.`);
          }
          if (Math.floor(min) !== min) {
            throw Error(`Schema at "${key}": "min" must be an integer.`);
          }
        }
        const { max } = schema[key];
        if (max !== undefined) {
          if (Number.isNaN(max) === true) {
            throw Error(`Schema at "${key}": "max" must not be "NaN".`);
          }
          if (Number.isFinite(max) === false) {
            throw Error(`Schema at "${key}": "max" must be a finite number.`);
          }
          if (Math.floor(max) !== max) {
            throw Error(`Schema at "${key}": "max" must be an integer.`);
          }
        }
        if (min !== undefined && max !== undefined) {
          if (min > max) {
            throw Error(`Schema at "${key}": "min" must be less than "max".`);
          }
        }
        const { accept } = schema[key];
        if (typeof accept !== 'string' || ['string', 'number'].includes(accept) === false) {
          throw Error(`Schema at "${key}": "accept" must be one of "string, number".`);
        }
        break;
      }
      default:
        throw Error(`Schema at "${key}": unhandled type ${type}.`);
    }
  }
};

module.exports = validateSchema;
