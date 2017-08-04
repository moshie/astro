"use strict"

const needsQuotes = require('../helpers/needs-quotes')

function determineFlag(flags, flag) {

    // If the flag is an object we can't process this
    if (!Array.isArray(flags[flag]) && typeof flags[flag] === 'object') {

        // Display warning message
        console.log('Warning: Flags cannot be defined as objects')

        return false
    }

    // If the flag is a boolean we can just use the key
    if (typeof flags[flag] === 'boolean' && flags[flag] === true) {

        // Push the flag to the initial object
        return `--${flag}`
    }

    // if flag is a number we need to assign it to the flag
    if (typeof flags[flag] == 'number') {
        return `--${flag}=${flags[flag]}`
    }

    // If the flag is a string we need to assign it to the flag
    if (typeof flags[flag] === 'string') {

        // If the value has a space we need to wrap it in quotes to be processed
        let value = needsQuotes(flags[flag])

        // Push the flag to the initial object
        return `--${flag}=${value}`
    }

    // If the flag is an array we need to join it and assign the value
    if (Array.isArray(flags[flag])) {

        // Join the array together to make a string and
        // if the value has a space we need to wrap it in quotes to be processed
        let value = needsQuotes(flags[flag].join(','))

        // Push the flag to the initial object
        return `--${flag}=${value}`
    }

    // If the flag is a function we need to resolve it's value before we add it
    if (typeof flags[flag] === 'function') {

        // Define initial object
        let obj = {}

        // Assign the flag to the initial object with it's resolved value
        obj[flag] = flags[flag]()

        // We need to resolve the value
        return determineFlag(obj, flag)
    }
}

function objectToFlags(flags) {

    // If the flags are not an object we need to log this and return back an empty array
    if (Array.isArray(flags) || typeof flags !== 'object') {
        console.log(`Warning: "object to flags" expects a type of object not ${typeof flags}`)
        return []
    }

    // Define inital flags array
    let flagsArray = []

    // Loop through the flags object
    for (let flag in flags) {

        // Get the flag in string form
        let determinedFlag = determineFlag(flags, flag)

        // We couldnt determine the flag type so skip
        if (determinedFlag === false) {
            continue
        }

        // All was good we can push the flag to the initial array
        flagsArray.push(determinedFlag)
    }

    // Return back the initial flags array
    return flagsArray
}

module.exports = objectToFlags
