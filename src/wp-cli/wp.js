"use strict"

const { exec, execSync } = require('child_process')
const { Buffer } = require('buffer')

class WP {

    /**
     * WP constructor
     * 
     * @param  {Command}
     * @return {void}
     */
    constructor(command) {
        this.command = command
    }

    /**
     * Run the command
     * 
     * @return {ChildProcess|string}
     */
    run() {
        if (this.command.async) {
            return this.async()
        }

        return this.sync()
    }

    /**
     * Execute the command asynchronously
     * 
     * @return {ChildProcess}
     */
    async() {
        var shell = exec(this.command.prompt, this.command.execOptions)

        shell = this.verbose(shell)

        shell.stderr.on('data', (error) => {
            console.log(error)
        })

        return shell
    }

    /**
     * Execute the command synchronously
     * 
     * @return {string|object}
     */
    sync() {
        var stdout = execSync(this.command.prompt, this.command.execSyncOptions)

        stdout = this.verbose(stdout)

        stdout = this.getString(stdout)

        return this.isJson(stdout)
    }

    /**
     * Convert string to json
     * 
     * @param  {any}
     * @return {string|object|number}
     */
    isJson(string) {
        try {
            var json = JSON.parse(string)
        } catch (error) {
            return string
        }
        return json
    }

    /**
     * Verbose logging
     * 
     * @param  {ChildProcess|String}
     * @return {ChildProcess|String}
     */
    verbose(shell) {
        if (this.command.verbose) {
            if (this.command.async) {
                shell.stdout.on('data', (data) => {
                    console.log(this.getString(data))
                })
                return shell
            }

            console.log(this.getString(shell))
        }

        return shell
    }

    /**
     * Convert buffer to a string
     * 
     * @param  {Buffer|String}
     * @return {String}
     */
    getString(data) {
        if (data instanceof Buffer) {
            return data.toString()
        }

        return data
    }

}

module.exports = WP
