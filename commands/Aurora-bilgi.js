const Discord = require('discord.js')
module.exports = {
    name: "bilgi",
    aliases: ["bilgi"],
    run: async(client, message, args) => {
        message.react(client.config.tik)
        message.channel.send(new Discord.MessageEmbed().setDescription(`\
-----------------------
Güvenli Listeye Eklenecek Veya Hata Alıyorsanız Bot Sahibine Ulaşınız <@852834797176094721> Size Yardımcı Olucaktır.
Chatte Küfür Ederseniz Bot Mesajınızı Silicektir.
Chatte Reklam Yaparsanız Bot Anında Size **Sınırsız** Mute Atar Bilginize.
-----------------------

`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor('2F3136')
        )
    }
}