const Discord = require('discord.js');
const db = require('quick.db')
const moment = require("moment");

module.exports = {
    name: 'topteyit',
    aliases: [ 'teyittop','top','tt'],
    run: async(client, message, args) => {
        let top = message.guild.members.cache.filter(uye => db.get(`erkek_${uye.id}`)).array().sort((uye1, uye2) => Number(db.get(`kız_${uye2.id}`)) + Number(db.get(`erkek_${uye1.id}`))).slice(0, 10).map((uye, index) => (index + 1) + "-) <@" + uye + "> | \`" + db.get(`toplam_${uye.id}`)).join('\n') + " \` ";
        if (!top) return message.channel.send("Herhangi bir veri bulunamadı!").then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));
        message.channel.send(
            new Discord.MessageEmbed().setTitle('Top Teyit!')
            .setTimestamp()
            .setColor('#2F3136')
            .setFooter("Aurora Was Here!")
            .setDescription(top)).then(message.react(client.config.tik));
    }
}