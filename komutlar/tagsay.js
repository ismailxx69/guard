const Discord = require('discord.js');

exports.run = (client, message, args) => {
  var tagdakiler = 0;
  let tag = "ꏪ";
  message.guild.members.forEach(member => {
    if(member.user.username.includes(tag)) {
      tagdakiler = tagdakiler+1
    }
  })
  message.channel.send("<a:kalp:688079879090208779> Tagımızda ` " + tagdakiler + " ` Üye Var. <a:kalp:688079879090208779>")
  const Discord = require('discord.js');


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tagdakilerisay","tagsay"]
};

exports.help = {
  name: 'tagsay',
  description: 'Tagdaki Kullanıcıları Sayar!',
  usage: 'Tag Sayar Fyukas'
};   