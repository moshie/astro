const Promise = require('bluebird')
const shell = require('child_process')
const exec = Promise.promisify(shell.exec)
const { execSync } = shell

function isAsync(option) {
    return option === true
}

function flags(options) {
    var flags = [];

    for (let option in options) {
        if (option === 'async') {
            continue;
        }

        if (typeof options[option] === 'boolean') {
            flags.push(`--${option}`)
            continue;
        }

        flags.push(`--${option}="${options[option]}"`)
    }

    return flags.split(' ')
}

exports.Core = function (subCommand, options) {
    const command = `wp core ${subCommand} ${flags(options)}`

    return isAsync(options.async) ? exec(command) : execSync(command)
}