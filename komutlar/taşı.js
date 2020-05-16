const Discord = require("discord.js"); //Pyro tarafından kodlanıldı çalınması taktirinde muck
exports.run = (client, message, args) => { //Pyro tarafından kodlanıldı çalınması taktirinde muck
    if (!message.member.hasPermissions("711213560486690886")) return message.channel.send(":no_entry: Bu komutu kullana bilmek için `Move` yetkisine sahip olmanız gerek")
    let kanal = args[1];
    let kullanici = message.mentions.members.first() //Pyro tarafından kodlanıldı çalınması taktirinde muck
    if (!kanal) return message.channel.send("Kanal belirtmedin")
    if (!kullanici) return message.channel.send("Kullanıcıyı belirtmedin") //Pyro tarafından kodlanıldı çalınması taktirinde muck
    kullanici.setVoiceChannel(`${kanal}`)
        .then(() =>
            message.channel.send(`${kullanici} <#${kanal}> adlı kanala taşındı`))
        .catch(console.error);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['üyeyitaşı'],
    permLevel: 0
};
exports.help = { //Pyro tarafından kodlanıldı çalınması taktirinde muck
    name: 'taşı',
    description: 'İstediğiniz kişiniyi bir sesli kanaldan diğerine taşır.', //Pyro tarafından kodlanıldı çalınması taktirinde muck
    usage: 'taşı [kullanıcı] [kanal id]'
};