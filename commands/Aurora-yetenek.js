const Discord = require('discord.js')
module.exports = {
    name: "yetenek",
    aliases: ["Yetenek"],
    run: async(client, message, args) => {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('Rol Yardım Menüsü!')
        .setDescription(`\ Öncelikle bir rol vermek istiyorsanız <@&880923348954152990> rolüne sahip olmalısınız. Bu komut sayesinde aşağıdaki rolleri kullanıcılara verebilirsiniz!
        ——————————————————————————————
<@&886171037006454844>: \`.vocal @Aurora/ID\`
<@&886170994954342440>: \`.şair @Aurora/ID\`
<@&886171054911922228>: \`.designer @Aurora/ID\`
<@&886171013560303646>: \`.sponsor @Aurora/ID\`
<@&886170934170488882>: \`.streamer @Aurora/ID\`
`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor('2F3136')
        )
    }
}