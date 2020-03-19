const Discord = require('discord.js');


exports.run = (client,message,args) => {
const sa = args[0]
if(!sa) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('BLUE')
    .setTitle('Hata :x:')
    .setDescription('İsmini yazmalısın!'))

    const as = args[1]
    if(!as) return message.channel.send(
        new Discord.RichEmbed()
        .setColor('BLUE')
        .setTitle('Hata :x:')
    .setDescription('Yaşını yazmalısın!'))
    
    const saa = args[2]
    if(!saa) return message.channel.send(
        new Discord.RichEmbed()
        .setColor('BLUE')
        .setTitle('Hata :x:')
        .setDescription('Ne kadar aktif olduğunu yazmadın!'))

        const ass = args.slice(3).join(' ')
        if(!ass) return message.channel.send(
            new Discord.RichEmbed()
            .setColor('BLUE')
            .setTitle('Hata :x:')
        .setDescription('Hangi yetkiyi istediğini yazmadın!'))


         message.channel.send(
             new Discord.RichEmbed()
             .setColor('BLUE')
             .setTitle('Başarılı :white_check_mark:')
         .setDescription('Başarıyla başvurun alındı!'))


         client.channels.get('LOG KANALI İD').send(
             new Discord.RichEmbed()
             .setColor('BLUE')
             .setTitle('Başvuru var!')
             .addField('Başvuruyu yapan', message.author.tag)
             .addField('Adı', sa)
             .addField('Yaşı', as)
             .addField('Aktif olduğu süre', saa)
             .addField('İstediği yetki', ass)
         )
    }
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: []
}


exports.help = {
name: 'başvuru'    
}
 