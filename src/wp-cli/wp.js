"use strict"

const { exec, execSync } = require('child_process')
const { Buffer } = require('buffer')

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

        var stdout = '';

        if (this.command.verbose) {
            if (data instanceof Buffer) {
                console.log(data.toString());
            } else {
                console.log(data);
            }
        }

        if (data instanceof Buffer) {
            stdout = data.toString();
        } else {
            stdout = data;
        }

        return stdout;
    }

}

module.exports = WP
