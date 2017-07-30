"use strict"

const { exec, execSync } = require('child_process')

class WP {

    constructor(command) {
        this.command = command
    }

    run() {

        if (this.command.async) {
            return exec(this.command.prompt, this.command.execOptions)
        }

        return execSync(this.command.prompt, this.command.execSyncOptions)
    }

}

module.exports = WP
