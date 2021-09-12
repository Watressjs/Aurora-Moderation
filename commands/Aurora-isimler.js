const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'isimler',
    aliases: ['isimler'],

    run: async(client, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Lütfen bir kullanıcı etiketleyip tekrar deneyiniz.").then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));
        let isimler = db.get(`isimler_${member.user.id}`);
        if (!isimler) return message.channel.send("Bu Kullanıcının Daha Önceki İsmi Bulunmuyor.").then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));
        const embed = new MessageEmbed()
            .setColor('2F3136')
            .setTitle("Bu kullanıcı daha önceden")
            .setDescription(isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n") + `\n \nisimlerinde kayıt olmuş.`)
        message.channel.send(embed).then(message.react(client.config.tik));
    }
}