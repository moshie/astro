"use strict"

const WP = require('./wp')
const getCommand = require('../command')

function wp(command, options) {
    const cmd = getCommand(command, options)

    return new WP(cmd).run()
}

module.exports = wp
