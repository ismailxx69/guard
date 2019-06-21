const Discord = require('discord.js');


exports.run = async (client, message, args) => {

  var sebep = args.slice(0).join("  ");
  if(!sebep) return message.channel.send("destek talebi sebebini belirtin.")
  
  if(message.guild.channels.exists("name","destek-"+ message.author.id)) return message.channel.send("Zaten bir destek talebiniz bulunmakta.");
  
  message.guild.createChannel("destek-"+ message.author.id, "text").then(c => {
    
    let rol = message.guild.roles.find("@everyone");
    c.overwritePermission(rol, {
      
      SEND_MESSAGES: false,
      READ_MESSAGES: false
      
    });
    
    c.overwritePermission(message.author, {
      
      SEND_MESSAGES: true,
      READ_MESSAGES: true
      
    });
    
    message.channel.send("destek talebiniz oluşturuldu! <#" + c.id + ">");
    c.send("bir destek talebi geldi! sebep: **" + sebep);
    
  });
  
  
};

exports.conf = {
  enabled: true, 
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'destek-aç',
  description: 'Botun pingini gösterir',
  usage: 'destek-aç <sebep>'
};