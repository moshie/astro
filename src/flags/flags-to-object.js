"use strict"

function flagsToObject(flags) {

    // If flags is an an object already we return that object
    if (!Array.isArray(flags) && typeof flags === 'object') {
        return flags
    }

    // If flags are not an array we return an empty object
    if (!Array.isArray(flags)) {
        return {}
    }

    // Define the initial object
    var flagsObject = {}

    // Loop through the flags array
    for (let i = 0; i < flags.length; i++) {

        // If the flags have the "--" we need to remove it
        if (flags[i].startsWith('--')) {
            flags[i] = flags[i].substr(2)
        }

        // Split the flags into key and value using the "="
        var [key, value] = flags[i].split('=')

        // Add the flag to the initial object if no value is set we set just the key
        flagsObject[key] = !value ? true : value
    }

    // Give back the inital flags object
    return flagsObject
}

module.exports = flagsToObject
