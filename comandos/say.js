

module.exports ={
    description: 'requiere los argumentos dados',
    run: async(message) =>{
        const args = message.content.split(' ').slice(1).join(' ');

        if(args.length < 1) return message.reply('provee un argumento valido.')
        message.reply(args);
    }
}