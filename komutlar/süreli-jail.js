const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.roles.has('699805708421431298')) return message.reply('**Bu komutu kullanabilmek için 🛇 | Jail Hammer yetkisine sahip olmasınız.**'); // ID yazan yere komutu kullanabilecek rolün ID
  let yashinu = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!yashinu) return message.channel.send(`Bir Kullanıcıyı Etiketlemelisin Kanka.`).then(x => x.delete(10000))
  let member = message.mentions.members.first()

  let rol = message.guild.roles.get("698066204673310771"); // Buraya Cezalı rolünün ID
  let kayıtsızRolü = message.guild.roles.get("696861671225950310"); // Buraya cezalıdan çıkınca vereceği rolün ID
  let logYashinu = "699811724253069403"; // loglanacağı kanalın ID
  let süre = args[1]
  if (!süre) return message.reply("Süre belirtmelisin.")
  let sebep = args.slice(2).join(' ')
  if(!sebep) return message.channel.send(`**Bir Sebep Girmelisin.**`)
  let sürems = args.slice(1).join(' ').replace('gün'.toLowerCase(), 'd').replace('saat'.toLowerCase(), 'h').replace('dakika'.toLowerCase(), 'm').replace('saniye'.toLowerCase(), 's');
  const embed = new Discord.RichEmbed().setFooter(message.author.tag , message.author.avatarURL);
    await(yashinu.addRole(rol.id));
    yashinu.roles.filter(x => x.id !== rol.id).forEach(async a => await yashinu.removeRole(a.id));
    yashinu.setNickname(yashinu.user.username);
    embed.setDescription(`${yashinu}  adlı kullanıcı **__"${sebep}"__** sebebiyle Cezalıya Atıldı \n Zamanı: **${süre}**`)
    .setColor('RANDOM')
    .setThumbnail("https://media.giphy.com/media/SuC0zYYuX2GH96YdW6/giphy.gif")
     message.react("697951599661678654")
   const embed2 = new Discord.RichEmbed()
  .setColor(`RANDOM`)
  .setDescription(`${message.guild.name} Sunucusundan __**${sebep}**__ Sebebiyle Süreli Cezalıya Atıldın.`)
   member.send(embed2);
    client.channels.get(logYashinu).send(embed)
    setTimeout(function(){
    yashinu.removeRole(rol.id);
    yashinu.addRole(kayıtsızRolü);
    }, ms(süre));
  };

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['jail'],
  permLevel: 0
};

exports.help = {
  name: 'jail',
  description: 'Belirtilen kullanıcıyı belirtilen süre kadar cezalıya atar.',
  usage: 'cezalı @Kullanıcı [İsterseniz Süre]',
  kategori: 'yetkili'
};