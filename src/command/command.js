"use strict"

const _ = require('lodash');
const objectToFlags = require('../flags/object-to-flags')

class Command {

    constructor(options) {
        this.options = _.defaults(options, this._defaults)
    }

    get execSyncOptions () {
        let execOptions = [
            'cwd', 'input', 'stdio',
            'env', 'shell', 'uid', 
            'gid', 'timeout', 'killSignal', 
            'maxBuffer', 'encoding'
        ]
        let options = {}

        _.each(this.options, (value, option) => {
            if (execOptions.indexOf(option) !== -1) {
                options[option] = this.options[option]
            }
        })

        return options
    }

    get execOptions () {
        let execSyncOptions = [
            'cwd', 'env', 'shell', 
            'uid', 'gid', 'timeout', 
            'killSignal', 'maxBuffer', 'encoding'
        ]
        let options = {}

        _.each(this.options, (value, option) => {
            if (execSyncOptions.indexOf(option) !== -1) {
                options[option] = this.options[option]
            }
        })

        return options
    }

    get _defaults() {
        return {
            async: false,
            cwd: process.cwd(),
            flags: {}
        }
    }

    get flags() {
        let flags = objectToFlags(this.options.flags)

        return flags.length > 0 ? flags.join(' ') : ''
    }

    get prompt() {
        return `wp ${this.options.command} ${this.flags}`
    }

    get async() {
        return this.options.async
    }

    get sync() {
        // get syncronus command
    }

}

module.exports = Command
