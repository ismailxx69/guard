  const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;
var mutelirolu = "Mute";
module.exports.run = async (bot, message, args) => {
  let mutekisi = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!mutekisi)
    return message.reply(
      `:warning: **Lütfen bir kullanıcı etiketleyiniz!** \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``
    );
  if (!message.member.roles.has("698887456275300422"))   
    return message.channel.send(`**Bu komutu kullanmak için <@&693660569055658055> Rolüne Sahip Olman Lazım**`);
  let muterol = message.guild.roles.find(`name`, mutelirolu);
  if (!muterol) {
    try {
      muterol = await message.guild.createRole({
        name: "Mute",
        color: "#000000",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterol, {  
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
    .replace(`sn`, `s`)
    .replace(`dk`, `m`)
    .replace(`sa`, `h`)
    .replace(`g`, `d`);
  if (!mutezaman)
    return message.reply(
      `:warning: **Lütfen bir zaman giriniz!** \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``
    );
  await mutekisi.addRole(muterol.id);
  message.reply(
    `<@${mutekisi.id}> **kullanıcısı ${args[1]} süresi boyunca mutelendi!**`
  );
  setTimeout(function() {
    mutekisi.removeRole(muterol.id);
    message.channel.send(
      `<@${mutekisi.id}> **kullanıcısının mutelenme süresi sona erdi!**`
    );
  }, ms(mutezaman));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "mute",
  description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
  usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
};