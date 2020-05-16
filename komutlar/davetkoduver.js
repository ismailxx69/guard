exports.run = async (client, message, args) => {
    try {
      let invite = await message.channel.createInvite({
        maxAge: args.age * 60,
        maxUses: args.uses
      }); //Dcs Ekibi
  
      message.channel.send('**Bu Sunucunun Davet Linkini Kurdum.**\n'
        + '<a:zillo:711280741765611531>   **Link Aşağıda** <a:zillo:711280741765611531> \n'
+
        `https://discord.gg/${invite.code}`).catch(e => {
        client.log.error(e);
      });
    }
    catch (e) {
      client.log.error(e);
    }
  };
  //Dcs Ekibi
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['create-link', 'createlink', 'sunucudavet', 'davetkur', 'davetlink', 'davetoluştur', 'davet-link' , 'davet-oluştur'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'link',
    description: 'Bulunduğunuz sunucunun davet linkini atar.',
    usage: 'link'
  };