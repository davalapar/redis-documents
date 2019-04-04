# redis-documents

## Overview

- Redis-based, because it's fast
- Uses `JSON.stringify` & `JSON.parse`, because it's fast
- Schema-based, just because
  - boolean
  - string
    - supports min and max length
  - number
    - supports min and max value
  - array
    - accepts string or number
    - supports min and max length

## Dependencies

- fuck yeh
- users (set of ids)

- users:id (key)
- field (field)
- value (value)

- incr(counters:users); - returns a new id.

- hmset(users:id, field, value, field, value) : set values
- hgetall(users:id) : get values
- del(users:id) : deletes a user

- sismember(users, id) : if users set has id
- scard(users) : length of users set
- sadd(users, id) : add new id to set
- srem(users, id) : removes an id from set
- smembers(users) : returns all ids from set

- geoadd(users:field, lat, long, id) : add data
- geodist(users:field, id1, id2) : distance in meters
- zrem(users:field, id) : remove data

## Schema

{
  name: {
    type: 'string',
    required: true,
  },
  age: {
    type: 'number',
    min: 0,
    max: 140,
    validator: (field, value) => {
      if (Math.floor(value) !== value) {
        return 'Value must be an integer.';
      }
      return undefined; // must return undefined to pass
    },
  },
  activated: {
    type: 'boolean',
    default: false,
  },
  roles: {
    type: 'array',
    required: true,
    max: 5,
    accept: {
      type: 'string',
    },
  },
  mentors: {
    type: 'array',
    default: [], // default must pass min and max
    min: 0, // min and max for array and string must be integers
    max: 2,
    accept: {
      type: 'ids',
      table: 'users',
    },
  },
}

- type
  - uuid
  - boolean
  - string
  - number
  - array
- required (all types)
- default (all types)
- accept
  - (array)
- min (string, number, array)
- max (string, number, array)
- table (string)

## Implementation Term Equivalents

| Reazel | Google Datastore | MongoDB | MySQL |
|:-:|:-:|:-:|:-:|
| **Table** | Kind | Collection | Table |
| **Item** | Entity | Document | Row |
| **Item ID** | Key Name / Key ID | Document ID | Row Keys / ID |
| **Item Field** | Entity Property | Document Property | Row Column |
| **Query** |Query | Query | Query |

## Database

- constructor(options) => Database
  - `options.logFunction` Function
  - `options.filename` String
  - `options.directory` String
  - `options.saveFormat` String
    - `json`, `readable_json`, `msgpack`
  - `options.msgpackBufferSize` Number Optional
  - `options.snapshotInterval` String Optional
- async loadDatabaseFile() => undefined
- initTable(tableLabel, itemSchema, outdatedItemUpdater, shouldExist) => undefined
  - `tableLabel` String
  - `itemSchema` Object Schema
  - `outdatedItemUpdater` Function
  - `shouldExist` Boolean Optional
- initKVTable(tableLabel, shouldExist) => undefined
  - `tableLabel` String
  - `shouldExist` Boolean Optional
- async serve() => undefined
- getTable(tableLabel) => Table
  - `tableLabel` String
- getKVTable(tableLabel) => KVTable
  - `tableLabel` String

#### Example code

```js
// db.js

const { Database } = require('reazel');

const db = new Database({

});

module.exports = db;
```

## Table

- randomItemId() => String
- async insertItem(id, data, returnClone) => Item
  - `id` String
  - `data` Object
  - `returnClone` Boolean Optional
- async updateItem(modifiedItem, returnClone) => Item
  - `modifiedItem` Object
  - `returnClone` Boolean Optional
- async updateItemById(id, data, returnClone) => Item
  - `id` String
  - `data` Object
  - `returnClone` Boolean Optional
- async mergeItemById(id, data, returnClone) => Item
  - `id` String
  - `data` Object
  - `returnClone` Boolean Optional
- async removeItem(item) => undefined
  - `item` Object
- async removeItemById(id) => undefined
  - `id` String
- hasId(id) => Boolean
  - `id` String
- fetchItem(id, returnClone) => Item
  - `id` String
  - `returnClone` Boolean Optional
- async clear() => undefined
- async destroy() => undefined
- query() => Query

## KVTable
- async set(key, value) => undefined
  - `key` String
  - `value` Any
- has(key) => boolean
  - `key` String
- get(key) => Any
  - `key` String
- async delete(key) => undefined
  - `key` String
- asnyc clear() => undefined
- async destroy() => undefined

## Query

- offset(value) => Query
  - `value` Number
- limit(value) => Query
  - `value` Number
- ascend(field) => Query
  - `field` String StringField NumberField
- descend(field) => Query
  - `field` String StringField NumberField
- ascendHaversine(field, latitude, longitude) => Query
  - `field` String StringField NumberArrayField
  - `latitude` Number
  - `longitude` Number
- descendHaversine(field, latitude, longitude) => Query
  - `field` String StringField NumberArrayField
  - `latitude` Number
  - `longitude` Number
- sortBy(sortFn) => Query
  - `sortFn` Function
- gt(field, value) => Query
  - `field` String NumberField
  - `value` Number
- gte(field, value) => Query
  - `field` String NumberField
  - `value` Number
- lt(field, value) => Query
  - `field` String NumberField
  - `value` Number
- lte(field, value) => Query
  - `field` String NumberField
  - `value` Number
- eq(field, value) => Query
  - `field` String AnyField
  - `value` Any
- neq(field, value) => Query
  - `field` String AnyField
  - `value` Any
- has(field, value) => Query
  - `field` String ArrayField
  - `value` Any
- hasAnyOf(field, values) => Query
  - `field` String ArrayField
  - `values` Array
- hasAllOf(field, values) => Query
  - `field` String ArrayField
  - `values` Array
- hasNoneOfAny(field, values) => Query
  - `field` String ArrayField
  - `values` Array
- hasNoneOfAll(field, values) => Query
  - `field` String ArrayField
  - `values` Array
- select(...fields) => Query
  - `fields` String StringFields
- hide(...fields) => Query
  - `fields` String StringFields
- filterBy(filterFn) => Query
  - `filterFn` Function
- results(returnClone) => Array
  - `returnClone` Boolean Optional
- firstResult(returnClone) => Item
  - `returnClone` Boolean Optional
- hasResults(returnClone) => Boolean
  - `returnClone` Boolean Optional
- countResults(returnClone) => Number
  - `returnClone` Boolean Optional

## Changelog

- 0.x.x

MIT | @davalapar
