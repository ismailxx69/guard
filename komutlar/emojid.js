const Discord = require('discord.js');
exports.run = (client, message, args) => {
if(!message.member.roles.has("702905915116093457")) return message.channel.send(`<a:donence:702961939952697405> Yeterli yetki bulunmamakta.`)
  let kişi = message.mentions.users.first();
    

let emojiname = args[0];
    const emoji = (message.guild.emojis.find(x => x.name === `${emojiname}`))
    if (!emojiname) return message.channel.send("Emoji ismi belirtmediniz")
    const embed = new Discord.RichEmbed()
 .setColor('#8d0000')
    .setThumbnail(`${emoji.url}`)
    .addField("Emojinin kodu",` **\`<a:${emojiname}:${emoji.id}>\`**`)
    .addField("Emoji ID", `${emoji.id}`)
    .setTimestamp()
    message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['emojiinfo'],
    permLevel: 0
}
exports.help = {
    name: 'emojid',
    description: 'İsmini yazdığınız emoji hakkında bilgi verir',
    usage: 'emojibilgi'
}