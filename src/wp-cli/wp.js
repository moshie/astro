"use strict"

const { exec, execSync } = require('child_process')

class WP {

    constructor(command) {
        this.command = command
    }

    run() {

        if (this.command.async) {
            var shell = exec(this.command.prompt, this.command.execOptions)

            shell.stdout.on('data', (data) => {
                console.log(data)
            })

            shell.stderr.on('data', (error) => {
                console.log(error)
            })

            return shell
        }

        var data = execSync(this.command.prompt, this.command.execSyncOptions)

        return data.toString()
    }

}

module.exports = WP
