const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let tag = "ㄨ" 
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("<a:hipnoz:700970886815285319> Sunucudaki üye sayısı", message.guild.memberCount)
        .addField("<a:hipnoz:700970886815285319> Çevrimiçi üye sayısı", message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField("<a:hipnoz:700970886815285319> Seslideki üye sayısı", count)
        .addField("<a:hipnoz:700970886815285319> Tagdaki üye sayısı", message.guild.members.filter(m => m.user.username.includes(tag)).size) // tag kullanmıyorsanız burayı silin.
        .setFooter(`${message.author.tag} tarafından istendi`, message.author.avatarURL)
              .setThumbnail("https://media.giphy.com/media/JQvFzbikYei9fETSL2/giphy.gif")
    .setImage(`https://cdn.discordapp.com/attachments/700900136150368336/702207868966928494/giphy.gif`)
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