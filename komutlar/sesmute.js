const Discord = require('discord.js');
const ms = require("ms");

exports.run = (client, message, args) => {
        if (!message.member.hasPermissions("729271900077031504")) return message.channel.send(":no_entry: Bu komutu kullana bilmek için `Move` yetkisine sahip olmanız gerek")
  if (!message.member.hasPermissions("MUTE_MEMBERS")) return message.channel.send("Bu komutu kullanabilmek için `Üyeleri sustur` yetkisine sahip olmanız gerek.")
    
  let kullanici = message.mentions.members.first()
    
    
    let süre = args[1]
    if (!süre) return message.reply("Süre belirtmelisin.")
    if (!kullanici) return message.channel.send("Kimi susturacağını belirtmedin.")
    kullanici.setMute(true, `Susturan yetkili: ${message.author.tag} - Susturma süresi: ${süre}ms`)
        .then(() =>
            message.channel.send(`${kullanici} \`${süre}\`**ms** ses kanallarında susturuldu.`))
        .catch(console.error);
        setTimeout(() => {

        kullanici.setMute(false,`Süresi dolduğu için susturması kaldırıldı.`)
        message.channel.send(`${kullanici} Süresi dolduğu için mikrafonu açıldı. `)

    }, ms(süre))
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["sesli-sustur"],
    permLevel: 0
};

exports.help = {
    name: 'sesli-sustur'
};