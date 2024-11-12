const {ButtonBuilder, ActionRowBuilder} = require('discord.js')
const usernameButton = new ButtonBuilder()
    .setCustomId('username')
    .setEmoji('😈')
    .setLabel('mostrar nombre de usuario.')
    .setStyle(1);
const avatarButton = new ButtonBuilder()
    .setCustomId('avatar')
    .setEmoji('🖼️')
    .setLabel('mostrar avatar de usuario.')
    .setStyle(2);

module.exports ={
    description: 'envia dos botones, uno envia el nombre de usuario y el otro la imagen  ',
    run: async (message) => {
        const actionRow = new ActionRowBuilder().addComponents(usernameButton,avatarButton);
        const reply = await message.reply({
            compónents: [actionRow],
        });

        message.reply({
            components: [actionRow],
        });
        const filter = (interaction) => interaction.user.id === message.author.id && interaction.message.id === reply.id;
        const collector = message.channel.createMessageComponentCollector({
            filter, time: 60 * 1000
        });
        collector.on('collect', async (interaction)=> {
            if(interaction.customId === 'username'){
                interaction.update({
                    content: `tu nombre es **${message.author.displayName}**`,
                    components: []
                });

            } else if(interaction,customId === "avatar"){
                const avatar = message.author.displayAvatarURL({size: 512})
            
                interaction.update({
                    content: 'tu perfil es:',
                    files: [avatar],
                    components: []
                })

            }
        });

        collector.on('end', async()=>{
            reply.edit({components:[]}).catch(console.error);
        });
    }
}