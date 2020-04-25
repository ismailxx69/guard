const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let tag = "ㄨ" 
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("<a:maviyildiz:701437430670032906> **Sunucudaki üye sayısı**", message.guild.memberCount)
        .addField("<a:maviyildiz:701437430670032906> **Çevrimiçi üye sayısı**", message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField("<a:maviyildiz:701437430670032906> **Seslideki üye sayısı**", count)
        .addField("<a:maviyildiz:701437430670032906> **Tagdaki üye sayısı**", message.guild.members.filter(m => m.user.username.includes(tag)).size) // tag kullanmıyorsanız burayı silin.
        .setFooter(`${message.author.tag} tarafından istendi`, message.author.avatarURL)
              .setThumbnail("https://cdn.discordapp.com/attachments/684103541098283046/702794401436532786/ezgif.com-video-to-gif_3.gif")

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