 const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(` B: ${client.user.username} logged `);
  console.log(` B: ` + client.channels.size + ` channels`);
  console.log(` O: ` + client.guilds.size + ` servers`);
  console.log(` T: ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` users!`);
  client.user.setPresence({
    game: {
        name: 'ㄨ V.Confirmed Kanallarını',         type: 'WATCHING' // Değerler: // PLAYING: // WATCHING // LISTENING
    },
    status: 'idle' // Değerler // online // dnd // idle 
})
}; 