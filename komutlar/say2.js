const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    let tag = "✶" // tagınız  
    let sunucu = "741633554764660826"; //sunucu ID
    let boosters = "742064725008973834";
  let erkekuye = message.guild.roles.get("741641798073450496").members;//erkek rol
   let kadınuye = message.guild.roles.get("741645637086609481").members;//kız rol
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
let boost = message.guild.members.filter(r=>r.roles.has(boosters)).size
    const embed = new Discord.RichEmbed()
    .setTitle('BELLATRIX Sunucusu İstatistikleri')
    .addField("Toplam Üye ", `**•** **${message.guild.memberCount}**`,true)
    .addField("Aktif Üye  ", `**•** **${message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}**`,true)
    .addField("Seslideki üye sayısı ", `**•** **${count}**`,true)
    .addField("Bostlayan Üye Sayısı ", `**•** **${boost}**`,true)
    .addField("Taglı Üye Sayısı", `**•** **${message.guild.members.filter(m => m.user.username.includes("LNX|")).size}**`,true) // tagınız yoksa bu satrı silin
    .addField("**Kadın Üye sayısı:**", `**•** **${kadınuye.size}**`,true)
    .addField("**Erkek Üye sayısı:**", `**•** **${erkekuye.size}**`,true)
    .addField(`Çevrimdışı Üye Sayısı`,`**•** **${message.guild.members.filter(a => a.presence.status == "offline").size}**`,true)
    .addField(`Çevrimiçi Üye Sayısı`,`**•** **${message.guild.members.filter(a => a.presence.status != "offline").size}**`,true)
    .addField(`Seslideki üye sayısı`, `**•** **${count}**`,true)
    .addField(`Son 1 Saatte Giren Üye Sayısı`,`**•** **${message.guild.members.filter(a => (new Date().getTime() - a.joinedTimestamp) < 3600000).size}**`,true)
    .addField(`Son 1 Günde Giren Üye Sayısı`,`**•** **${message.guild.members.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size}**`,true)
    .addField(`Son 1 Haftada Giren Üye Sayısı`,`**•** **${message.guild.members.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size}**`,true)
    .addField(`Son 1 Ayda Giren Üye Sayısı`,`**•** **${message.guild.members.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size}**`,true)
    .setThumbnail(message.guild.iconURL)
    .setFooter(message.guild.name, message.guild.iconURL)
    message.channel.send(embed);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayı'],
    permLevel: 0
};

exports.help = {
    name: 'say2',
};