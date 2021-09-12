const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'ses',
    aliases: ['sesli'],
    run: async(client, message, args) => {


        if (!client.config.register.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(new MessageEmbed().setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!").setColor('2F3136').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter('Ducky Was Here!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }

       const mapping = {
        " ": "",
        "0": "0", // sayı iDleri
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
        var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;

        var duckyses = `${Sesli}`.split("").map(c => mapping[c] || c).join("")

        const embed = new MessageEmbed()
            .setDescription(`
            • Sunucuda sesli sohbetlerde ${duckyses} üye bulunmakta.
          `)
            .setColor('2F3136')
        message.channel.send(embed).then(message.react(client.config.tik));
    }
}