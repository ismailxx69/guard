const db = require("quick.db")

exports.run = function(client, message, args) {

  var USER = message.author;
  var REASON = args.slice(0).j
  
};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'afk', 
  description: 'Kullanıcııyı afk moduna sokar.',
  usage: 'afk <sebep>'
};