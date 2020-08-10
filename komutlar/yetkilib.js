// Okuyarak anlayacağınız şekilde yazılmıştır doğru bir şekilde uyguladıktan sonra sorunsuz çalışır. -Yashinu

// Hangi komut için kullanılacaksa onun verisine 1 ekletiyoruz.
// Kullandığımız modül: quick.db     | Komutlarınızda aşağıda verdiğim satırı en başa ekleyin (Zaten varsa gerek yok).
const db = require('quick.db');

// Yetkili komutunda işlemin yapıldığı satırın bir altına aşağıda vereceğim kodu ekleyin.
db.add(`yetkili.${message.author.id}.ozellik`, 1);
// ozellik yazan yeri komut neyse o şekilde değiştirin. Örneğin mute ise mute yazın
db.add(`yetkili.${message.author.id}.mute`, 1);
// bu şekilde

// Teyit komutlarında da aynısı geçerli. Rollerin verildiği satırın altına eklenecek.
db.add(`yetkili.${message.author.id}.erkek`, 1); // (erkek komutu için)
db.add(`yetkili.${message.author.id}.kiz`, 1); // (kız komutu için)
// bu şekilde

// İstatistik gibi bir komutta, bu verileri çekmek isterseniz, İstatistik komutuna şunu ekleyin.
let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`yetkili.${uye.id}`);
// Bu şekilde ekleme yaptıktan sonra aşağıdaki şekilde hangi komutun verisini çekeceğimizi belirtelim
let ozellik = bilgi.ozellik || 0;
// bu şekilde. Örnek vermek gerekecek olursa let mute = bilgi.mute || 0;

// Toplam sayı göstertmek isterseniz, iki veriyi toplatmanız gerekir.
// Örneğin;
let erkek = bilgi.erkek || 0;
let kiz = bilgi.kiz || 0;
// Göstertmek için;
`Toplam: ${erkek+kiz}`

Ve son olarak bu veriyi göstertmek istediğimizde, göstereceğimiz yerde;
${ozellik} yazmamız yeterlidir.
${mute} gibi

// Top Liste gibi bir komut yapmak isterseniz, yapmanız gereken çok basit, .sort() kullanarak sıralama işlemi yaptıracağız.
// Aşağıdaki kodu gerekli yerleri değiştirerek kullanın.
let top = message.guild.members.filter(uye => db.get(`yetkili.${uye}.ozellik`)).array().sort((uye1, uye2) => Number(db.get(`yetkili.${uye2}.ozellik`))-Number(db.get(`yetkili.${uye1}.ozellik`))).slice(0, 20).map((uye, index) => (index+1)+"-) "+ uye + " | " + db.get(`yetkili.${uye.id}.ozellik`)).join('\n');
message.channel.send(new Discord.RichEmbed().setTitle('Top Özellik Listesi').setTimestamp().setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).setDescription(top).setColor("RANDOM"));
// Bu kodu top liste olacak komutun içine koyun. ozellik yazan yerleri verinizle değiştirmeyi unutmayın. Örneğin: ozellik yerine mute
// Eğer teyit için yapacak olursanız .sort() kısmının içerisinde ozellik yazan yerde erkek ve kiz verisini toplatmayi unutmayin.

// Bazı örnek yetkili komutları verisi:
db.add(`yetkili.${message.author.id}.erkek`, 1);
db.add(`yetkili.${message.author.id}.kiz`, 1);
db.add(`yetkili.${message.author.id}.mute`, 1);
db.add(`yetkili.${message.author.id}.ban`, 1);
db.add(`yetkili.${message.author.id}.unban`, 1);
db.add(`yetkili.${message.author.id}.sesmute`, 1);
db.add(`yetkili.${message.author.id}.jail`, 1);