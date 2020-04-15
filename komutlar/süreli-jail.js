const Discord = require('discord.js');

let rolid = "698066204673310771";  //cezalı rol id

exports.run = async (client, message, args) => {
  if (!message.member.roles.has("698887456275300422")) 
    return message.channel.send(
      `Bu komutu kullanabilmek için <@&698887456275300422> yetkisine sahip olmasınız!`
      
    );
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member) return message.channel.send("**Hapishaneden Alınacak Üyeyi Etiketleyin!**");
    if(rolid.match(/(\d{17,19})/g)) {
        member.roles.forEach(role => member.removeRole(role));
        member.addRole(rolid);
    }
    else member.roles.forEach(role => member.removeRole(role));
        const embed  = new Discord.RichEmbed()
    .setImage("https://cdn.discordapp.com/attachments/550531815249805312/678679430314459207/index.jpg")
    .setAuthor('Jail Operasyonu')
    .setDescription(` **Kullanıcının Tüm Rolleri Alındı Ve <@&698066204673310771> Rolü Verildi**`)
    .setFooter(`Komutu Kullanan (${message.author.username})`)
    .setColor("RED")
    message.react('696861671225950310')
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