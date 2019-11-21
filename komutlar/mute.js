const Discord = require("discord.js");
const ms = require("ms");
const djsturkiye = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || djsturkiye.prefix;
  let üye = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!üye) return message.channel.send(`Kime işlem yapılacağını belirtmelisin! \n**Doğru Kullanım:** \`${prefix}mute @Kullanıcı <isterseniz süre>\``);

  let rol = message.guild.roles.find(abc => abc.name === "Susturulmuş");
  if(!rol) {
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`\`Hata:\`  Botun yetkisi yetersiz!  **(Botun,  \`Kanalları Yönet\` ve \`Rolleri Yönet\`  yetkisi açık olmalıdır!)** `);
    try {
      rol = await message.guild.createRole({
        name: "Susturulmuş",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(rol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        });
      });
    } catch(e) { console.log(e) };
  };

  let süre = args.slice(1).join(' ').replace('gün'.toLowerCase(), 'd').replace('saat'.toLowerCase(), 'h').replace('dakika'.toLowerCase(), 'm').replace('saniye'.toLowerCase(), 's');

  if(üye.roles.has(rol.id)) {
    await(üye.removeRole(rol.id));
    message.channel.send(`**\`${üye.displayName}\`  adlı üyenin susturulması kaldırıldı!**`)
    return
  }
  
  if(!süre) {
    await(üye.addRole(rol.id));
    message.channel.send(`**\`${üye.displayName}\`  adlı üye susturuldu! Tekrar aynı işlemi uygulayarak susturulmayı kaldırabilirsiniz.**`)
  } else {
    await(üye.addRole(rol.id));
    message.channel.send(`**\`${üye.displayName}\`  adlı üye  \`${ms(ms(süre))}\`  süre boyunca susturuldu.**`);
    setTimeout(function(){
      üye.removeRole(rol.id);
      message.channel.send(`**\`${üye.displayName}\`  adlı üyenin susturulma süresi dolduğu için susturulması kaldırıldı!**`);
    }, ms(süre));
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sustur'],
  permLevel: 0
};

exports.help = {
  name: 'mute',
  description: 'Belirtilen kullanıcıyı belirtilen süre kadar susturur/susturmasını açar.',
  usage: 'mute @Kullanıcı [İsterseniz Süre]',
  kategori: 'yetkili'
};