# Astro

Astro is a JavaScript api wrapper for wp-cli.


```js
var wp = require('wp-astro')

wp('core download')
```


## Installation

```bash
$ npm install wp-astro
```

## Prerequisite

Requires WP-cli to be installed correctly and coincidently access to mysql

## Features

  * Call wp cli commands from JavaScript
  * Write your own automated WordPress scripting
  * Async makes for faster automation
  * Simple api
  
## API

The api can be called a number of different ways for example:

```js
// Standalone command
wp('core download')

// Flags as array
wp('config create', ['--dbname=example', '--dbuser=root'])

// command with config
wp('config create', {
    input: `define('WP_DEBUG', true);`,
    flags: {
        dbname: 'example',
        dbuser: 'root',
        'extra-php': true
    }
})

// Config object
wp({
    command: 'config create'
    flags: {
        dbname: 'example',
        dbuser: 'root'
    }
})
```

### Config options

**Command**

Define the wp cli command to call. The initial `wp` is not required here as this is done behind the scenes.

```js
wp({
    command: 'core download'
})
```

**Custom working directory**

Set the current working directory for the command by default this uses the current working directory `process.cwd()`.

This example will download the WordPress core to a folder called `example` **the folder must exist**.

```js
wp('core download', {
    cwd: path.join(__dirname, 'example')
})
```

**Flags**

Any flags needed for the command are added here. Flags can be passed as an array or object.

```js
wp('post get 1', ['field=id', '--format=json'])

// OR

wp({
    command: 'post get 1',
    flags: {
        field: 'id',
        format: 'json'
    }
})

// OR

wp({
    command: 'post get 1',
    flags: ['field=id', '--format=json']
})
```

**Async**

By default astro is synchronous by enabling async, commands can be run in parallel making for faster scripts.

**Note:** Running async on commands which require a previous command will not work as the previous command may not have completed!

Astro returns back the [child process object](https://nodejs.org/api/child_process.html#child_process_class_childprocess) meaning we have access to the events that triggers

```js
var plugin = wp('plugin install hello', {
    async: true,
    flags: ['--activate']
})

plugin.on('data', function (data) {
    console.log(data.toString())
})

plugin.on('close', function (code, signal) {
    console.log(code)
})
```

For commands where data is piped into the command like wp config create this would be more appropriate:

```js
var config = wp('config create', {
    async: true,
    flags: {
        dbname: 'example',
        dbuser: 'root',
        dbpass: 'root',
        'extra-php': true
    }
})

config.stdin.write(`
define('WP_DEBUG', true);
`)

config.end()
```

**Verbose**

Enable verbose mode to log wp cli's output to the console useful for debugging.

```js
wp('core download', {
    verbose: true
})
```

**Other Options**

Behind the scenes we are just calling the wp-cli command with node's [child_process](https://nodejs.org/api/child_process.html#child_process_child_process) module.

Depending on if async is enabled or disabled depends on which method we use, by default (async set to false) we use [execSync](https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options) otherwise if async is enabled we use [exec](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)

 fortunatly that means we can pass any of it's config values in like so:

```js
wp({
    input: `define('WP_DEBUG', true);`, // Only avalible not async
    cwd: path.resolve(__dirname, 'example'),
    env: {},
    encoding: 'utf8',
    shell: '/bin/sh',
    timeout: 0,
    maxBuffer: 200*1024,
    killSignal: 'SIGTERM',
    uid: ,
    gid: ,
    callback: function (error, stdout, stderr) {} // Only on async
})
```

## Coming soon!

 - Promise API support
 - Predefined scripts
    - Entire install procedure
    - Install multiple plugins & themes
 - Tests :(


## Licence

[MIT](LICENCE)
