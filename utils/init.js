const Discord = require("discord.js")
const { color, token, assets, footer, defaultPrefix, version } = require("../config")
const fs = require('fs');
const path = require('path');
const getPlayer = require('./hypixel.js')

const init = client => {
  // Attach /config.json to 'client'
  client.defaultPrefix = defaultPrefix
  client.color = color;
  client.token = token;
  client.footer = footer;
  client.assets = assets;
  client.version = version

  client.getPlayer = getPlayer

  // Attach file retreiving to 'client'
  client.getAllFiles = (dirPath, arrayOfFiles) => {
      const files = fs.readdirSync(dirPath)
      arrayOfFiles = arrayOfFiles || []
      files.forEach(function (file) {
          if (fs.statSync(dirPath + "/" + file).isDirectory()) arrayOfFiles = client.getAllFiles(dirPath + "/" + file, arrayOfFiles)
          else arrayOfFiles.push(path.join(dirPath, "/", file))
      })
      return arrayOfFiles
  }
}

module.exports = init