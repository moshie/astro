"use strict"

const { exec, execSync } = require('child_process')
const { Buffer } = require('buffer')

class WP {

    constructor(command) {
        this.command = command
    }

    run() {

        if (this.command.async) {
            return this.async()
        }

        return this.sync()

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

    async() {
        var shell = exec(this.command.prompt, this.command.execOptions)

        shell = this.verbose(shell)

        shell.stderr.on('data', (error) => {
            console.log(error)
        })

        return shell
    }

    sync() {
        var shell = execSync(this.command.prompt, this.command.execSyncOptions)

        shell = this.verbose(shell)

        // Buffer check here

        // Json Check here
    }

    verbose(shell) {
        if (this.command.verbose) {
            if (this.command.async) {
                shell.stdout.on('data', (data) => {
                    // Buffer to string here
                    console.log(data)
                })
                return shell
            }
            // Buffer to string here
            console.log(shell)
        }

        return shell
    }

}

module.exports = WP
