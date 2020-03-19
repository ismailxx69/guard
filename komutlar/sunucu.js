const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let tag = "†" // tagınız
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

    const embed = new Discord.RichEmbed()
        .setColor("#000001")
          .addField("<a:tik1:688697405708828706> Sunucudaki üye sayısı", message.guild.memberCount)
        .addField("<a:tik1:688697405708828706> Çevrimiçi üye sayısı", message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField("<a:tik1:688697405708828706> Seslideki üye sayısı", count)
        .addField("<a:tik1:688697405708828706> Tagdaki üye sayısı", message.guild.members.filter(m => m.user.username.includes(tag)).size) // tagınız yoksa bu satrı silin
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