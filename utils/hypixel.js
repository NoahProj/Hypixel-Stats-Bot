const fetch = require('node-fetch')
const { key } = require('../config.json')

const getPlayer = async player => {
    return new Promise(async (resolve, reject) => {
        let type, body, user
        player.length > 16 ? type = "&uuid=" : type = "&name="
        const data = await fetch(`https://api.hypixel.net/player?key=${key}${type}${player}`)
       
        try { body = await data.json() }
        catch { return reject("Outage") }
        if (body.success == false) reject(body.cause)
        else { resolve(body.player) }
    })
}

module.exports = getPlayer