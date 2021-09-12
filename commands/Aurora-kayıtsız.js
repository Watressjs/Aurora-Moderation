const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: 'kayıtsız',
    aliases: ['kayıtsız', 'unreg', 'unregister'],

    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Aurora Was Here!');

        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send(embed.setDescription("Lütfen bir kullanıcı etiketleyip tekrar deneyiniz.\n `.kayıtsız @Aurora/ID`")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(embed.setDescription("Belirtilen kullanıcı sizden üst/aynı pozisyondadır.")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));
        }
        if (member.premiumSinceTimestamp > 0) return message.channel.send(embed.setDescription("Boosterları kayıtsıza atamazsın!")).then(x => x.delete({timeout: 3000})).then(message.react(client.config.no));
        member.roles.set(client.config.unregisteres)
        message.guild.members.cache.get(member.id).setNickname(`• İsim | Yaş`)
        message.channel.send(embed.setDescription("Kullanıcıya başarılı bir şekilde <@&880923348777979948> rolü verilip başarılı bir şekilde kayıtsıza atılmıştır!")).then(message.react(client.config.tik));
        db.delete(`kayıt_${member.id}`)
    }
}