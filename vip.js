const { RichEmbed } = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, argumentos) => {
    const usuario = message.mentions.members.first() || message.guild.members.get(argumentos[1]);

    if (!argumentos[0]) return message.reply("<:tristin:724834014573101056> **[Bot] Comando incorreto, tente: s.vip** ``<@id>``");
    if (!usuario) return message.reply("<:tristin:724834014573101056> **[Bot] Membro mencionado não encontrado!**");
    
    if (!fs.existsSync(`./database/vips/${message.guild.id}`)) return message.reply("<:tristin:724834014573101056> **[Bot] Não foi encontrado database desse servidor!, tente: s.addvip**");
    if (!fs.existsSync(`./database/vips/${message.guild.id}/${message.author.id}`)) return message.reply("<:tristin:724834014573101056> **[Bot] Não foi encontrado seu vip nesse servidor!, contate um ``ADMINISTRATOR``**");

    const vip = fs.readFileSync(`./database/vips/${message.guild.id}/${message.author.id}`).toString().split("^");

    const embedAdd = new RichEmbed()
        .addField(`<:coracaoo:724833964090720306> | Tag VIP adicionada!\n`, `\n**Cargo**: ${vip[1]}\n **Usuário**: ${usuario}\n **ID**: ${usuario.id}`)
        .setColor("#0a0a0a")
        .setThumbnail(usuario.user.displayAvatarURL);

    const embedRetirar = new RichEmbed()
        .addField(`<:tristin:724834014573101056> | Tag VIP retirada!\n`, `\n **Cargo**: ${vip[1]}\n **Usuário**: ${usuario}\n **ID**: ${usuario.id}`)
        .setColor("#0a0a0a")
        .setThumbnail(usuario.user.displayAvatarURL);

    const
        vip_id = vip[1].toString().replace("<", ""),
        vip_id2 = vip_id.replace(">", ""),
        vip_id3 = vip_id2.replace("@", ""),
        tag_vip = message.guild.roles.get(vip_id3.replace("&", ""));


    if (usuario.roles.has(tag_vip.id)) {
        message.channel.send(embedRetirar).then(m => m.delete(15000));
        usuario.removeRole(tag_vip);
    } else {
        usuario.addRole(tag_vip);
        message.channel.send(embedAdd).then(m => m.delete(15000));
    }
};

exports.help = {
    name: "vip"
};
