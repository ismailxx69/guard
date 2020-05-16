const Discord = require('discord.js');


exports.run = async (client, message, args) => {
    let tag = "そ" 
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  if  (!message.member.roles.has("700144704607617038")) return message.reply('Bu komutu kullanmaya yetkin yok');
  

    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("<a:sag:711280703849103421> **Sunucudaki üye sayısı**", message.guild.memberCount)
        .addField("<a:sag:711280703849103421> **Çevrimiçi üye sayısı**", message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField("<a:sag:711280703849103421> **Seslideki üye sayısı**", count)
        .addField("<a:sag:711280703849103421> **Tagdaki üye sayısı**", message.guild.members.filter(m => m.user.username.includes(tag)).size) // tag kullanmıyorsanız burayı silin.
        .setFooter(`${message.author.tag} tarafından istendi`, message.author.avatarURL)
              .setThumbnail("https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif~c200")

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