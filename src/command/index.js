"use strict"

const Command = require('./command')
const flagsToObject = require('../flags/flags-to-object')

function getCommand(command, options) {

    if (typeof command === 'undefined') {
        console.error('Please define a command or command object')
        return
    }

    if (Array.isArray(command)) {
        console.error('type of "Array" is not an accepted command argument to wp()')
        return
    }

    if (typeof command === 'object') {
        if (typeof command.command === 'undefined') {
            console.error('Please define a command in the command object')
            return
        }

        return new Command(command)
    }

    if (typeof command == 'string' && !Array.isArray(options)) {

        options.flags = flagsToObject(options.flags)

        return new Command(
            Object.assign({}, {command}, options)
        )

    }

    let flags = flagsToObject(options)

    return new Command({
        command: command,
        flags: flags
    })
}

module.exports = getCommand
