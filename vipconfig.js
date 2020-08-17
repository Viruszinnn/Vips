/*
	Script feito por mim VIRUS e solto por mim mesmo sz
	Usem avontade
*/

const Discord = require('discord.js');
const fs = require('fs')
const virus = new Discord.Client();

exports.run = async (guild, message, argumentos) => {
  const server = message.guild.id || guild.id
    if(!fs.existsSync(`./database/vips/${message.guild.id}`)) {
        fs.mkdirSync(`./database/vips/${message.guild.id}`);
    }
    if(argumentos[1] === "criar"){
    if(!message.member.hasPermission("ADMINISTRATOR"))return message.reply('<a:nao:717599306844309173> **[Bot] Você não tem permissão de usar este comando!**')
    let usuario = message.mentions.members.first() || message.guild.members.get(argumentos[2])
    let nome = message.mentions.users.first();
    if(!(argumentos.length > 2))
    return message.reply('<:tristin:724834014573101056> **[Bot] Comando incorreto, tente: s.v cria** `\`<@id>``');
    if(!fs.existsSync(`./database/vips/${message.guild.id}/${usuario.id}.txt`))
     return message.reply('<a:emoji_9:716890018446311459> **[Bot] Esse usuario já possui vip setado!**');
    if(!usuario)
    return message.reply('<:tristin:724834014573101056> **[Bot] Membro mencionado não encontrado!**');    
    const rNew = await message.guild.createRole({
        name: nome.username + ` VIP`,
               color: "#000000",
               permission: []
           });
    fs.writeFileSync(`./database/vips/${message.guild.id}/${usuario.id}`, `${usuario.id}^${rNew}^ ${nome.username + ` VIP`}`);
    let embedinfo = new Discord.RichEmbed()
        .setDescription(`s.v rename\ns.v cor #\ns.v info\ns.v tag`)
    usuario.roles.has(rNew)
    usuario.addRole(rNew.id)
    usuario.send(`<:emoji_56:725062281041412169> | Sua tag no servidor ${message.guild} foi criada! Abaixo os comandos para você edita-la! Obs: Essa mensagem é apagada automaticamente em 1hora`).then(m => m.delete(3600000))
    usuario.send(embedinfo).then(m => m.delete(3600000))
    message.channel.send(`<a:emoji_6:716889896807039009> **[Bot] Vip criado com sucesso!**`)
    }
    if(argumentos[1] === "rename"){
      if(!fs.existsSync(`./database/vips/${server}/${message.author.id}`)) {
        return message.reply('<:tristin:724834014573101056> **[Bot] Não foi encontrado seu vip nesse servidor!, contate um `\`ADMINISTRATOR``**');
      }
      if(!(argumentos.length > 2))
      return message.reply('<:tristin:724834014573101056> **[Bot] Comando incorreto, tente: s.v rename** `\`nome``');
        var vip = fs.readFileSync(`./database/vips/${message.guild.id}/${message.author.id}`,).toString().split('^');
        var namee = message.content.split(`s!v rename`).join("");
        var vipz = vip[2].toString().replace(' ', '');
        var role = message.guild.roles.find("name", vipz);
        var tagid = vip[1]
        role.edit({
          name: namee
        })
        fs.writeFileSync(`./database/vips/${message.guild.id}/${message.author.id}`,`${message.author.id}^${tagid}^${namee}`)
        message.channel.send(`${message.author} | <:emoji_53:725062178427764774> Nome da tag foi alterado para:${namee}`)
    }
    if(argumentos[1] === "cor"){
      if(!fs.existsSync(`./database/vips/${server}/${message.author.id}`)) {
        return message.reply('<:tristin:724834014573101056> **[Bot] Não foi encontrado seu vip nesse servidor!, contate um `\`ADMINISTRATOR``**');
      }
      if(!(argumentos.length > 2))
      return message.reply('<:tristin:724834014573101056> **[Bot] Comando incorreto, tente: s.v cor** `\`#cor``');
        let vip = fs.readFileSync(`./database/vips/${message.guild.id}/${message.author.id}`,).toString().split('^');
        let vipz = vip[2].toString().replace(' ', '');
        argumentos.forEach((argumentos) => {
        if (argumentos.startsWith("#")) {
          rColor = argumentos;
        }
        })
      if (rColor >= 16777215)
        return message.channel.send(
          `Você digitou numero ireconhecivel numeros 0 a 16777215`
        );
      if (rColor <= 0)
        return message.channel.send(
          `Você digitou numero ireconhecivel numeros 0 a 16777215`
        );
        var role = message.guild.roles.find("name", vipz);
        role.edit({
            color: rColor,
        })
        message.channel.send(`${message.author} | <:coracaoo:724833964090720306> Cor alterada para: ${rColor}`)
    }
    if(argumentos[1] === "info"){
      let server = message.guild.id || guild.id
      
      let pUser = message.mentions.users.first();
      if(pUser) {
        let guilda = await message.guild.fetchMembers();
        member = guilda.members.get(pUser.id);
      } else {
        pUser = message.author;
      }
      if(!fs.existsSync(`./database/vips/${server}/${message.author.id}`)) {
        return message.reply('<:tristin:724834014573101056> **[Bot] Não foi encontrado seu vip nesse servidor!, contate um `\`ADMINISTRATOR``**');
      }
      let vip = fs.readFileSync(`./database/vips/${server}/${pUser.id}`,).toString().split('^');
      let vip_id = vip[1].toString().replace('<', '');
      let vip_id2 = vip_id.replace('>', '');
      let vip_id3 = vip_id2.replace('@', '');
      let tag_vip = message.guild.roles.get(vip_id3.replace('&', ''));
      
      const ListEmbed = new Discord.RichEmbed()
      .addField(`<:emoji_56:725062281041412169> | Informações:\n`,`\nDono: <@${vip[0]}>\n Tag: ${vip[1]} `)
      .setThumbnail(pUser.displayAvatarURL)
      .addField(`Usarios`,message.guild.roles.get(tag_vip.id).members.map(m=>m.user).join('  '));
      message.channel.send(ListEmbed);           
    }
    if(argumentos[1] === "tag"){
      let rolee = message.mentions.roles.first()
      if(!rolee)return
        message.channel.send(`<:tristin:724834014573101056> | Tente de novo, mencionando a tag!`)
      const ListEmbed = new Discord.RichEmbed()
      .addField(`<:emoji_56:725062281041412169> | Informações:\n`,`\n Tag: ${rolee} `)
      .setThumbnail(message.author.displayAvatarURL)
      .addField(`Usarios`,message.guild.roles.get(rolee.id).members.map(m=>m.user).join('  '));
      message.channel.send(ListEmbed);      
    }
    if(argumentos[1] === "remove"){
      let usuario = message.mentions.members.first() || message.guild.members.get(argumentos[2])
      if(!usuario)
      return message.reply('<:tristin:724834014573101056> **[Bot] Membro mencionado não encontrado!**');  
      var vip = fs.readFileSync(`./database/vips/${message.guild.id}/${usuario.id}`,).toString().split('^');
      var vipz = vip[2].toString().replace(' ', '');
      var role = message.guild.roles.find("name", vipz);
      var tagid = vip[1]
        role.delete(tagid)
      fs.unlinkSync(`./database/vips/${message.guild.id}/${usuario.id}`);
      message.channel.send(`<:emoji_53:725062178427764774> | Tag deletada com sucesso!`);      
    }
}    
exports.help = {
    name: "v"
}