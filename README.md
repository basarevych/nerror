# NError

Nested Error ES6 class

## Installation

```
npm install --save nerror
```

## Usage

An abstract example

```javascript
const NError = require('nerror');

try {
    try {
        try {
            let error = new Error('Some DB error');
            error.code = 42000;
            throw error;
        } catch (error) {
            throw new NError(error, { sqlState: error.code }, 'Could not insert row');
        }
    } catch (error) {
        throw new NError(error, { customerId: 9000 }, 'Could not create user');
    }
} catch (error) {
    console.log(error.messages, JSON.stringify(error.info, undefined, 4));
    /* Could not create user: Could not insert row: Some DB error {
           "sqlState": 42000,
           "customerId": 9000
       } */

    console.log(error.fullStack);
    /* NError: Could not create user
           at Object.<anonymous> (/home/ross/tmp/nerror/test.js:13:15)
           at Module._compile (module.js:570:32)
           at Object.Module._extensions..js (module.js:579:10)
           at Module.load (module.js:487:32)
           at tryModuleLoad (module.js:446:12)
           at Function.Module._load (module.js:438:3)
           at Module.runMain (module.js:604:10)
           at run (bootstrap_node.js:393:7)
           at startup (bootstrap_node.js:150:9)
           at bootstrap_node.js:508:3
       NError: Could not insert row
           at Object.<anonymous> (/home/ross/tmp/nerror/test.js:10:19)
           at Module._compile (module.js:570:32)
           at Object.Module._extensions..js (module.js:579:10)
           at Module.load (module.js:487:32)
           at tryModuleLoad (module.js:446:12)
           at Function.Module._load (module.js:438:3)
           at Module.runMain (module.js:604:10)
           at run (bootstrap_node.js:393:7)
           at startup (bootstrap_node.js:150:9)
           at bootstrap_node.js:508:3
       Error: Some DB error
           at Object.<anonymous> (/home/ross/tmp/nerror/test.js:6:25)
           at Module._compile (module.js:570:32)
           at Object.Module._extensions..js (module.js:579:10)
           at Module.load (module.js:487:32)
           at tryModuleLoad (module.js:446:12)
           at Function.Module._load (module.js:438:3)
           at Module.runMain (module.js:604:10)
           at run (bootstrap_node.js:393:7)
           at startup (bootstrap_node.js:150:9)
           at bootstrap_node.js:508:3 */
}
```

## NError

### new NError([parent,] [info,] ...args)

*parent* is optional parent error instance

*info* is optional information attached to the error. it will be merged with parents' info objects

*...args* - rest is usual Error constructor arguments

#### Examples

The following are all valid constructor calls:

* new NError('Error occurred') // just like usual Error

* new NError(new Error('Test'), 'Error occurred') // pass the parent

* new NError({ someKey: "some value" }, 'Error occurred') // pass info

* new NError(new NError('Some error'), { key: 'value' }, 'Error occurred') // do both

### .info

Combined information created by merging *info*s of all the parent chain

### .messages

Combined messages of all the parents

### .fullStack

Combined stack info of all the parents