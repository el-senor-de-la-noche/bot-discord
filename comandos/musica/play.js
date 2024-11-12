module.exports ={
    name: "play",
    aliases:["reproducir"],
    desc: "sirve para reproducir una cancion",
    run: async (client,messageLink,args,prefix)=> {
        if (!args.length) return messageLink.reply(`❌ **tienes que especificar el nombre de una cancion!!**`);
        if (!message.member.voice?.channel) return message.reply(`tienes que estar en un canal de voz para ejecutar eñ comando po como tan poco vio`)
        if(!message.guild.me.voice?.channel && message.member.voice?.channel.id!= message.guild.me.voice?.channel.id) return message.reply(`❌ ** oe ya po debi estar en el mismo canal de voz que yo po como tan poco vio po compañero, para que podai ejecutar el comando po 😠**`);
        client.distube.play(message.member.voice?.channel, args.join(" "),{
            member: message.member,
            textChannel: message.channel,
            message
        })
        message.reply(`🔎**Buscando\`${args.join(" ")}\`...`);
    }
}