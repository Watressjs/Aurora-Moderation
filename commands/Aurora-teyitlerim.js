const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'teyitsayım',
    aliases: ['teyitlerim','teyitkontrol','teyit'],
    run: async(client, message, args) => {
        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!").setFooter('Aurora Was Here!').setColor('2F3136')).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));
        }

        var member = message.mentions.users.first() || message.author;
        let erkek = db.get(`erkek_${member.id}`) || 0
        let kız = db.get(`kız_${member.id}`) || 0
        let toplam = db.get(`toplam_${member.id}`) || 0
        const embed = new MessageEmbed()
            .setColor('2F3136')
            .setTitle("Teyit Sayım!")
            .setFooter('Aurora Was Here!')
            .setDescription(`Sunucudaki Toplam Teyit Sayın: \`${toplam}\``)
        message.channel.send(embed).then(message.react(client.config.tik));
    }
}