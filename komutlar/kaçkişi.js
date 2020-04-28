const Discord = require('discord.js');


exports.run = async (client, message, args) => {
    let tag = "そ" 
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  if  (!message.member.roles.has("700144704607617038")) return message.reply('Bu komutu kullanmaya yetkin yok');
  

    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("<a:maviyildiz:701437430670032906> **Sunucudaki üye sayısı**", message.guild.memberCount)
        .addField("<a:maviyildiz:701437430670032906> **Çevrimiçi üye sayısı**", message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField("<a:maviyildiz:701437430670032906> **Seslideki üye sayısı**", count)
        .addField("<a:maviyildiz:701437430670032906> **Tagdaki üye sayısı**", message.guild.members.filter(m => m.user.username.includes(tag)).size) // tag kullanmıyorsanız burayı silin.
        .setFooter(`${message.author.tag} tarafından istendi`, message.author.avatarURL)
              .setThumbnail("https://cdn.discordapp.com/attachments/703382591121915997/704647902869454898/ezgif-6-2d1f8f7722b7.gif")

    message.channel.send(embed);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayı'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
    usage: 'say'
};