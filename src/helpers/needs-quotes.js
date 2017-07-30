"use strict"

function needsQuotes(value) {
    // If the value has a space we need to wrap it in quotes to be processed
    return value.indexOf(' ') !== -1 && value[0] !== '"' ? `"${value}"` : value
}

module.exports = needsQuotes