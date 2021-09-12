
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment')
require('moment-duration-format')
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();

fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})



//  WATCHING  : !ping izliyor
//  LISTENING : !ping dinliyor
//  PLAYING   : !ping oynuyor 
//  STREAMING : !ping yayında
////----------------------- READY KISMI -----------------------\\\\
client.on('ready', () => {
    client.user.setPresence({ activity: { name: 'Aurora ❤️ Levis #0109' }, status: 'idle' })
    client.channels.cache.get('886533266155393044').join() // ses kanalı İD
    console.log(`Bot ${client.user.tag} Adı İle Giriş Yaptı!`);
  })
////----------------------- CONFİG KISMI -----------------------\\\\
client.config = {

    guildID: '880923348383694888', //sunucu id

    vipRoles: ['880923348815732812'], //vip
    unregisteres: ['880923348777979948'], // kayıtsız

    maleRoles: ['880923348815732808','880923348815732807'], // erkek
    girlRoles: ['880923348815732810','880923348815732809'], // bayan

    sil: ['880923348954152992'], //SİL ATABİLECEK KİŞİLER

  ////////////////////////////////

    duckytoken: 'Botunuzun_Tokeni', // TOKEN
    mods: ["880923348522127438"], // kayıt yapıcak kısıler. yt rolu olsa bile yaz.
    channelID: '880923349432287339', // kayıt kanalı

  ////////////////////////////////

  banMembers: ['880923348522127432'], // Ban yetkilileri
  jailhammer: ['880923348522127433'], // Jail yetkilileri
  jailRoles: ['880923348828323903'], // Jail rolleri

  üstYönetim: ['880923348954152992'], //Üst Yönetim rolleri

  muteRoles: ['880923348593442858'], // chat mute rolleri
   sil: ['880923348954152992'], //SİL ATABİLECEK KİŞİLER
   transport: ['880923348522127437'], // fçek - fgit kullanacak kişiler
   register: ['880923348954152990'], // register yetkilileri (say atıcak)
   booster: ['880923348954152990'], //BOOSTER İSİMİ KULLANICAK KISILER

   yetkilialımdm: ['880923348954152990'], //YETKI VERECEK ALACAK KİŞİLER!
   ilkyetkilipermi: ['880923348887027817','880923348522127438'], //İLK YETKİLİ PERMİ + REGİSTER ROL İD
  ////////////////////////////////

    tag: 'Levis', // tag
    booster: '880923348954152990', // booster rol
    
    ////////////////////////////////

    king: ['880923348954152990'], //tüm .vocal .designer vs kullanabılecek kişi

    vocal: ['886171037006454844'], //VOKAL

    designer: ['886171054911922228'], //DESIGNER

    streamer: ['886170934170488882'], //STREAMER

    sponsor: ['886171013560303646'], //SPONSOR

    şair: ['886170994954342440'], //ŞAİR

  ////////////////////////////////

    tik: '<a:onay:881051259069661185>', //TİK GİRCEN
    no: '<a:iptal:881051259740753950>', //TİK GİRCEN

    webhookurl: 'Webhook_İD', //WEBHOOKURL GİRCEN
    webhooktoken: 'Webhook_Token', //WEBHOOKTOKEN GİRCEN

    chatChannel: '880923350539579408', //CHAT KANALI
    yönetim: ['880923348522127438'] // vip alcak kısıler
}
////----------------------- PREFİX KISMI -----------------------\\\\
client.on('message', message => {
    const prefix = ".";// prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})

let white = {
  "852834797176094721": true, //Aurora 
  "871482075964932108": true, //Supporter

  };
  /*Beyaz listede olmayan kişiler yönetici olsa bile reklam yapamaz */
  client.on('message', async(message) => {
   if(white[message.author.id] || message.author.id == client.user.id) return;
    let link = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;  
    if (link.test(message.content)){
         db.add(`xxPornohub.${message.author.id}`, 1);
       message.delete()
     if(db.get(`xxPornohub.${message.author.id}`) >= 2){
      db.push(`${message.author.id}_sicil`, `\`[REKLAM]\` Text kanallarında reklam sebebiyle **Süresiz** mutelendi!`)
      message.channel.send(`\`Text kanallarında reklam sebebiyle Süresiz mutelendin!\``).then(x => x.delete({ timeout: 1000 }))
      return message.member.roles.add(client.config.muteRoles)
    }
    }
  })
  
  client.on('message', message => {
    if (!message.guild || message.author.bot || message.content.startsWith('.')) return;
    let embed = new Discord.MessageEmbed().setColor('#2F3136')

    if (message.mentions.users.size >= 1) {
        let member = message.mentions.users.first();
        if (db.get(`${member.id}_sebeb`)) {
            const time = moment.duration(Date.now() - db.get(`${member.id}_afktime`)).format("DD [Gün], HH [Saat], mm [Dakika], ss [Saniye]")
            message.channel.send(embed.setDescription(`${member} adlı kullanıcı, **${db.get(`${member.id}_sebeb`)}** sebebi ile **${time}dir** afk!`)).then(x => x.delete({ timeout: 5000 }))
}
} else {
if(db.get(`${message.author.id}_sebeb`)){
db.delete(`${message.author.id}_sebeb`)
message.channel.send("**Hoşgeldin artık AFK değilsin!** :tada: :tada: :tada:").then(x => x.delete({ timeout: 5000 }))
}         
}
})

  /*Beyaz listede olmayan kişiler yönetici olsa bile küfür edemez */
  
  client.on('message', async(message) => {
    if(white[message.author.id] || message.author.id == client.user.id) return;
     let kufurler = ["yarrak","allahoc","amk","sikerim","sikim","orospu","orusbu","orospo","orospu çocuğu","orospu cocu","orospu çocu","oç"];
     if (kufurler.some(küfür => message.content.includes(küfür))){
       db.add(`xxPornohubx.${message.author.id}`, 1);
        message.delete()
      if(db.get(`xxPornohubx.${message.author.id}`) >= 10){
       db.push(`${message.author.id}_sicil`, `\`[KÜFÜR]\` Text kanallarında küfür sebebiyle **Süresiz** mutelendi.`)
       message.channel.send(`\`Text kanallarında küfür sebebiyle Süresiz mutelendin!\``).then(x => x.delete({ timeout: 1000 }))  
       return message.member.roles.add(client.config.muteRoles)
       
     } 
     }
   })
  setInterval(() => {
    let timeA = (new Date().toLocaleString()).split(/(:| )/)[2]
    if(timeA == "00"){
       db.delete(`xxPornohub`);
       db.delete(`xxPornohubx`);
    }
  }, 6000)

  client.on("guildMemberAdd", member => {
    member.send('<a:iconTurkuaz:886168949367128104> Sunucumuza Hoşgeldin Tag Alarak Veya Boost Basarak Bize Destek Olabilirsin Ses Teyit Kanallarına Girerek Kayıt Olabilirsin Şimdiden İyi Eğlenceler Dilerim.')
    })

client.on('voiceStateUpdate', (oldMember, newMember) => {
    { 
      let giriş = client.channels.cache.get('881050941854482442');
      let çıkış = client.channels.cache.get('881050941854482442');
      let odadeğişme = client.channels.cache.get('881050941854482442');
      let logKanali = client.channels.cache.get('881050941854482442');
      let susturma = client.channels.cache.get('881050941854482442');
      let sağırlaştırma = client.channels.cache.get('881050941854482442');
  
      if (oldMember.channelID && !oldMember.serverMute && newMember.serverMute) return logKanali.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda yetkili tarafından **susturdu!**`).catch();
      if (!oldMember.channelID && newMember.channelID) return giriş.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanala **katıldı!**`).catch();
      if (oldMember.channelID && !newMember.channelID) return çıkış.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` adlı sesli kanaldan **ayrıldı!**`).catch();
      if (oldMember.channelID && newMember.channelID && oldMember.channelID != newMember.channelID) return odadeğişme.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi ses kanalını **değiştirdi!** (\`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` => \`${newMember.guild.channels.cache.get(newMember.channelID).name}\`)`).catch();
      if (oldMember.channelID && oldMember.selfMute && !newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!**`).catch();
      if (oldMember.channelID && !oldMember.selfMute && newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **susturdu!**`).catch();
      if (oldMember.channelID && oldMember.selfDeaf && !newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).catch();
      if (oldMember.channelID && !oldMember.selfDeaf && newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).catch();
    };
  });   

////----------------------- HEM ETİKET HEMDE TAG ROL KISMI -----------------------\\\\
client.on("userUpdate", async function(oldUser, newUser) { // 
    const guildID = "880923348383694888"//sunucu
    const roleID = ('880923348912185402')//taglırolü
    const tag = ('Levis')//tag
    const chat = ('880923349432287340')// chat
    const log2 = ('880923349432287341') // log kanalı
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp().setFooter('Aurora Was Here!');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} isminden \`Levis\` çıkartarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} ismine \`Levis\` alarak ailemize katıldı!`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "0109" && newUser.discriminator !== "0109") {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} etiketinden \`0109\` çıkartarak ailemizden ayrıldı!`))
        } else if (oldUser.discriminator !== "0109" && newUser.discriminator == "0033") {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} etiketine \`0109\` alarak ailemize katıldı!`))
        }
    }
  
  })
/////////////////////////////// TAG ROL 2 ////////////////////////////////
client.on("guildMemberAdd", member => {
    let sunucuid = ('880923348383694888'); 
    let tag = ('Levis'); ///TAG
    let rol = ('880923348912185402'); //TAGROLÜ İD
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
    .setAuthor(member.displayName, member.user.avatarURL({ dynamic: true }))
        .setColor('2F3136')
        .setDescription(`<@${member.id}> adlı üye sunucumuza taglı bir şekilde giriş yaptı!`)
        .setTimestamp()
        .setFooter('Aurora Was Here!')
       client.channels.cache.get('880923349432287341').send(tagalma)
  }
  })

  client.on("messageDelete", async message => {
    if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
    await db.set(`snipe.${message.guild.id}.${message.channel.id}`, { yazar: message.author.id, yazilmaTarihi: message.createdTimestamp, silinmeTarihi: Date.now(), dosya: message.attachments.first() ? true : false });
    if (message.content) db.set(`snipe.${message.guild.id}.${message.channel.id}.icerik`, message.content);
  });

  const kiltifat = [
    'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
    'Mavi gözlerin, gökyüzü oldu dünyamın.',
    'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
    'Huzur kokuyor geçtiğin her yer.',
    'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
    'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
    'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
     'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
     'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
     'Etkili gülüş kavramını ben senden öğrendim.',
     'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
     'Gözlerinle baharı getirdin garip gönlüme.',
     'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
     'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
     'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
     'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
     'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
     'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
     'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
    'Biraz Çevrendeki İnsanları Takarmısın ?',
    'Biliyormusun? ducky seni çok seviyor...', 
    'kimse sevmesin ben severim seni caneeeem',
    'seni seviom', 
     'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
     'Onu Bunu Boşver de bize gel 2 bira içelim.',
      'merhem oldun yaralarıma',
      'Mucizelerden bahsediyordum sen geldin aklıma.',
  ];
  client.on("message", async message => {
    if(message.channel.id !== ('880923349432287339')) return;
    let duckywashere = db.get('chatiltifat');
    await db.add("chatiltifat", 1);
    if(duckywashere >= 35) {
      db.delete("chatiltifat");
      const random = Math.floor(Math.random() * ((kiltifat).length - 1) + 1);
      message.reply(`${(kiltifat)[random]}`);
    };
  });

/*Mesaj Silme Log */
client.on('messageDelete', (message) => {
    let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "mesaj-log") //log kanalının ismi
    const embed = new Discord.MessageEmbed()
      .setAuthor("Mesaj Silindi", message.author.avatarURL({dynamic: true}))
      .setTimestamp()
      .setDescription(`Mesaj Sahibi: ${message.author}\nKanal: ${message.channel}\nMesaj İçeriği: \`${message.content}\``)
      .setColor("2F3136")
   return channel.send(embed)
  })
  client.on('messageUpdate', (oldMessage, newMessage) => {
    let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "mesaj-log") //log kanalının ismi
    if(oldMessage.content == newMessage.content) return
    const embed = new Discord.MessageEmbed()
      .setAuthor("Mesaj Güncellendi", oldMessage.author.avatarURL({dynamic: true}))
      .setTimestamp()
      .setDescription(`Mesaj Sahibi: ${oldMessage.author}\nKanal: ${oldMessage.channel}\nEski: \`${oldMessage.content}\`\nYeni: \`${newMessage.content}\``)
      .setColor("2F3136")
   return channel.send(embed)
  })

////----------------------- HOŞGELDİN MESAJI KISMI -----------------------\\\\
const welcome = new Discord.WebhookClient(client.config.webhookurl, client.config.webhooktoken)


client.on('guildMemberAdd', (member) => {

    const mapping = {
        " ": "",
        "0": "0", 
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
    };
    var toplamüye = member.guild.memberCount
    var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
    let memberDay = (Date.now() - member.user.createdTimestamp);
    let duckyhg = moment.duration(memberDay).format("Y [Yıl], M [Ay], W [Hafta], DD [Gün]")
    let duckywasheredostum = moment.duration(memberDay).format("DD [Gün], HH [saat], mm [dakika]")
    if (memberDay > 604800000) {
       welcome.send(`<a:kalp1:886168949555859477> Levis'e hoşgeldin ${member} - (\`${member.id}\`) :tada: :tada: :tada:
 
       <a:iconTurkuaz:886168949367128104> Hesabın **${duckyhg}** önce açılmış. 
       <a:iconTurkuaz:886168949367128104> Sunucuya giren herkes <#880923349801398299> kanalındaki kuralları okumuş sayılacaktır!
       <a:iconTurkuaz:886168949367128104> Seninle birlikte **${emotoplamüye}** üyeye ulaştık. Kayıt olabilmek için tag almalı (\`Levis #0109\`) veya boost basmalısın! <@&819433969896390686> rolündeki yetkililer seninle ilgilenecektir. `)
    } else {
        client.channels.cache.get(client.config.channelID).send(
        new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
        .setDescription(`${member}, adlı kullanıcı sunucuya katıldı!  Hesabı **${duckywasheredostum}** önce açıldığı için ona <@&880923348828323902> verildi! `)
        .setTimestamp()
        .setColor('2F3136')
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setFooter(`Ducky Was Here!`))
        member.roles.add('880923348828323902') //ŞÜPHELİ ROL İD
        member.roles.remove(client.config.unregisteres)
    }
})

////--

client.on('message', async(message) => {
  if(!message.guild || message.author.bot || message.content.startsWith("!")) return;
  db.add(`messageData.${message.author.id}.channel.${message.channel.id}`, 1);
  db.push(`messageData.${message.author.id}.times`, {time: Date.now(), puan: 1})
  let dataOne = db.get(`messageData.${message.author.id}`) || {}
  let dataMessage =  Object.keys(dataOne).map(data => { return Object.values(dataOne[data]).reduce((a, b) => a + b, 0) })[0];

  let dataTwo = db.get(`voiceData.${message.author.id}`) || {}
  let dataVoice =  Object.keys(dataTwo).map(data => { return Object.values(dataTwo[data]).reduce((a, b) => a + b, 0) })[0];
}
)

const Activites = new Map();

client.on('voiceStateUpdate', (oldState, newState) => {
  if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return
  if(!oldState.channelID && newState.channelID) { 
    Activites.set(oldState.id, Date.now());
  } 
      let data;
    if(!Activites.has(oldState.id)){
        data = Date.now();
        Activites.set(oldState.id, data); 
    } else data = Activites.get(oldState.id);
  
    let duration = Date.now() - data;
    if(oldState.channelID && !newState.channelID) { 
        Activites.delete(oldState.id);
        db.add(`voiceData.${oldState.id}.channel.${oldState.channelID}`, duration);
        db.push(`voiceData.${oldState.id}.times`, {time: Date.now(), puan:  duration})
    } else if(oldState.channelID && newState.channelID){
        Activites.set(oldState.id, Date.now());
        db.add(`voiceData.${oldState.id}.channel.${oldState.channelID}`, duration);
        db.push(`voiceData.${oldState.id}.times`, {time: Date.now(), puan:  duration})
    }
  
})

////----------------------- TAG MESAJ KISMI -----------------------\\\\
client.on('message', msg => {
    if (msg.content === '!tag') {
        msg.channel.send(`\`Levis \n #0109\``); // tagı yazınız
    } else if (msg.content === '-tag') {
        msg.channel.send(`\`Levis \n #0109\``);// tagı yazınız
    } else if (msg.content === '.tag') {
        msg.channel.send(`\`Levis \n #0109\``);// tagı yazınız
    } 
});

client.on("guildMemberAdd", member => {
    member.roles.add(client.config.unregisteres); 
    const otorol = new Discord.MessageEmbed()
    .setAuthor(member.displayName, member.user.avatarURL({ dynamic: true }))
        .setColor('2F3136')
        .setDescription(`<@${member.id}> adlı kullanıcıya (<@&880923348777979948>) verildi!`)
        .setTimestamp()
        .setFooter('Aurora Was Here!')
       client.channels.cache.get('880923349432287338').send(otorol)
  });

client.login(client.config.duckytoken)
