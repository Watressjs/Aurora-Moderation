const Discord = require('discord.js')
module.exports = {
    name: "help",
    aliases: ["yardım"],
    run: async(client, message, args) => {
        message.react(client.config.tik)
        message.channel.send(new Discord.MessageEmbed().setDescription(`\
        Aurora Genel Bot Komutları
-----------------------
.avatar
.snipe
.topteyit
.help
.bilgi
.stat
.topstat
.sil
.istatistik
.ses
.zengin
.seskontrol
-----------------------
.çek = \`@Etiket/İD\`
.erkek = \`@Etiket/İD\`
.isim = \`@Etiket/İD\`
.isimler = \`@Etiket/İD\`
.kayıtsız = \`@Etiket/İD\`
.kes = \`@Etiket/İD\`
.kız = \`@Etiket/İD\`
.sil = \`[ Miktar ]\`
.teyit = \`@Etiket/İD\`
.vip = \`@Etiket/İD\`
.ban = \`@Etiket/İD\`
.jail = \`@Etiket/İD Sebeb Süre\`
-----------------------
.yetenek
-----------------------
`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor('2F3136')
        )
    }
}