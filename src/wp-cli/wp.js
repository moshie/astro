"use strict"

const { exec, execSync } = require('child_process')

class WP {

    constructor(command) {
        this.command = command
    }

    run() {

        if (this.command.async) {
            var shell = exec(this.command.prompt, this.command.execOptions)

            if (this.command.verbose) {
                shell.stdout.on('data', (data) => {
                    console.log(data)
                })
            }

            shell.stderr.on('data', (error) => {
                console.log(error)
            })

            return shell
        }

        try {
            var data = execSync(this.command.prompt, this.command.execSyncOptions)
        } catch (error) {
            //console.error(error.message);
        }

        if (this.command.verbose) {
            console.log(data.toString());
        }

        return data;
    }

}

module.exports = WP
