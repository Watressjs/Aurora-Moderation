const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'isim',
    aliases: ['isim', 'nick', 'name', 'i'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Aurora Was Here!');

        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));
        }
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Lütfen bir kullanıcı etiketleyip tekrar deneyiniz.\n `.isim @Aurora`")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));
      
        let name = args[1]
        if (!name) return message.channel.send(embed.setDescription("Lütfen kullanıcı için isim yazınız.\n `.isim @Aurora/ID Aurora`")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));

        let age = args[2]
        if (!age) return message.channel.send(embed.setDescription("Lütfen kullanıcı için isim yazınız.\n `.isim @Aurora/ID Aurora 17`")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));

        message.guild.members.cache.get(member.id).setNickname(`• ${name} | ${age}`).then(message.react(client.config.tik));
        db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (isim değiştirme)`);
        message.channel.send(embed.setDescription(`${member} adlı kullanıcının ismi \`${name} | ${age}\` olarak değiştirildi!`)

        )
    }
}
