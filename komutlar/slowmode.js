const Discord = require('discord.js');

exports.run = async(client, message, args) => {
if (message.channel.type !== "text") return;
  if  (!message.member.roles.has("704647763656179773")) return message.reply('Bu komutu kullanmaya yetkin yok');
const limit = args[0] ? args[0] : 0;
  if(!limit) {
              var embed = new Discord.RichEmbed()
                .setDescription("Lütfen süreyi komut ile belirtin. `Örneğin: !slowmode [0/10]`")
                .setColor('#e02f06')
                .setTimestamp()
            message.channel.send({embed})
            return
          }
if (limit > 10) {
    return message.channel.sendEmbed(new Discord.RichEmbed().setDescription("Yavaş mod maksimum limiti ** 10 ** saniye.").setColor('#e02f06'));
}
    message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`:white_check_mark: Bu odada artık \`${limit}\` saniyede bir yazı yazılabilecek.`).setColor('#33c50e'));
var request = require('request');
request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.token}`
    },
})};
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['slowmod', 'yavasmod', 'yavaşmod'],
  permLevel: 2,
};

exports.help = {
  name: 'slowmode',
  description: 'Kanalda yazma hızını belirlemeni sağlar.',
  usage: 'slowmode [0/10]',
};

