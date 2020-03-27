const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let tag = "ꏪ" // tagınız
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

    const embed = new Discord.RichEmbed()
        .setColor("#000001")
        .addField("_<a:siyah:692905410285404167> Sunucudaki üye sayısı_", message.guild.memberCount)
        .addField("_<a:siyah:692905410285404167> Çevrimiçi üye sayısı_", message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField("_<a:siyah:692905410285404167> Seslideki üye sayısı_", count)
        .addField("_<a:siyah:692905410285404167> Tagdaki üye sayısı_", message.guild.members.filter(m => m.user.username.includes(tag)).size) // tagınız yoksa bu satrı silin
        .setFooter(`${message.author.tag} tarafından istendi`, message.author.avatarURL)
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