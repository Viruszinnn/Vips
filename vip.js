
/*
	Script feito por mim VIRUS e solto por mim mesmo sz
	Usem avontade
*/

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')

exports.run = async (client, message, argumentos) => {
//message.delete()
let usuario = message.mentions.members.first() || message.guild.members.get(argumentos[1])
let server = message.guild.id || guild.id
if(!(argumentos.length > 1))
    return message.reply('<:tristin:724834014573101056> **[Bot] Comando incorreto, tente: s.vip** `\`<@id>``');
if(!usuario)
    return message.reply('<:tristin:724834014573101056> **[Bot] Membro mencionado não encontrado!**')
if(!fs.existsSync(`./database/vips/${server}`))
    return message.reply('<:tristin:724834014573101056> **[Bot] Não foi encontrado database desse servidor!, tente: s.addvip**');
if(!fs.existsSync(`./database/vips/${server}/${message.author.id}`)) {
    return message.reply('<:tristin:724834014573101056> **[Bot] Não foi encontrado seu vip nesse servidor!, contate um `\`ADMINISTRATOR``**');
    }
let vip = fs.readFileSync(`./database/vips/${server}/${message.author.id}`,).toString().split('^');
var embed = new Discord.RichEmbed()
.addField(`<:coracaoo:724833964090720306> | Tag VIP adicionada!\n`, `\n**Cargo**: ${vip[1]}\n **Usuário**: ${usuario}\n **ID**: ${usuario.id}`)
.setColor("#0a0a0a")
.setThumbnail(usuario.user.displayAvatarURL)

var embedr = new Discord.RichEmbed()
.addField(`<:tristin:724834014573101056> | Tag VIP retirada!\n`, `\n **Cargo**: ${vip[1]}\n **Usuário**: ${usuario}\n **ID**: ${usuario.id}`)
.setColor("#0a0a0a")
.setThumbnail(usuario.user.displayAvatarURL)
let vip_id = vip[1].toString().replace('<', '');
let vip_id2 = vip_id.replace('>', '');
let vip_id3 = vip_id2.replace('@', '');
let tag_vip = message.guild.roles.get(vip_id3.replace('&', ''));

if(usuario.roles.has(tag_vip.id)){
        message.channel.send(embedr).then( m => m.delete(15000));
        usuario.removeRole(tag_vip)
 } else{
        usuario.addRole(tag_vip)
        message.channel.send(embed).then( m => m.delete(15000));
        
    }
  
}

exports.help = {
    name: "vip"
}