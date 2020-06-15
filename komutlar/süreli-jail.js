const Discord = require('discord.js');

let rolid = "721865407404965941";  //cezalı rol id

exports.run = async (client, message, args) => {
  if (!message.member.roles.has("685555226325024829"))  
    return message.channel.send(
      `Bu komutu kullanabilmek için <@&685555226325024829> yetkisine sahip olmasınız!`
      
    );
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member) return message.channel.send("**Hapishaneden Alınacak Üyeyi Etiketleyin!**");
    if(rolid.match(/(\d{17,19})/g)) {
        member.roles.forEach(role => member.removeRole(role));
        member.addRole(rolid);
    }
    else member.roles.forEach(role => member.removeRole(role));
        const embed  = new Discord.RichEmbed()
    .setImage(`https://media.giphy.com/media/12HZukMBlutpoQ/source.gif`)
    .setAuthor('Jail Operasyonu')
    .setDescription(` **Kullanıcının Tüm Rolleri Alındı Ve <@&721865407404965941> Rolü Verildi**`)
    .setFooter(`Komutu Kullanan (${message.author.username})`)
    .setColor("RED")
    message.react('703943338532798504')
    return message.channel.sendEmbed(embed);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["jail"],
    permLevel: 0
};

exports.help = {
    name: "jail",
    description: 'Birini jaillersiniz.',
    usage: 'jail <kullanıcı>'
};