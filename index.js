const { Client, GatewayIntentBits } = require('discord.js');
const { join } = require('path');
const { AudioPlayerStatus, createAudioPlayer, createAudioResource, AudioPlayer } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

// Token del bot de Discord
const token = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; 

// Configura la ruta de FFmpeg explícitamente
process.env.FFMPEG_PATH = join(__dirname, 'C:\\ffmpeg\\bin\\ffmpeg.exe');

// Crea un cliente de Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });

// Cuando el bot esté listo
client.once('ready', () => {
  console.log(`¡Listo! ${client.user.tag} ha iniciado sesión.`);
});

// Evento de bienvenida a nuevos miembros
client.on('guildMemberAdd', member => {
  member.guild.systemChannel.send(`¡Bienvenido, ${member.user.tag}!`);
});

// Evitar que el bot repita la misma frase
client.on('messageCreate', async message => {
  // Evitar respuesta a los propios mensajes del bot
  if (message.author.bot) return;
||||
  // Comando para reproducir música
  if (message.content.toLowerCase() === '!play') {
    if (message.member.voice.channel) {
      try {
        // Conectarse al canal de voz
        const connection = await message.member.voice.channel.join();

        // Obtener información de la canción
        const songURL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';  // Reemplaza con la URL de la canción que desees
        const songInfo = await ytdl.getInfo(songURL);
        const audioResource = createAudioResource(ytdl(songURL, { filter: 'audioonly' }));

        // Crear un reproductor de audio
        const player = createAudioPlayer();
        player.play(audioResource);

        // Suscribir al reproductor de audio
        connection.subscribe(player);

        // Monitorear el estado del reproductor
        player.on(AudioPlayerStatus.Playing, () => {
          console.log('Reproduciendo música...');
        });

        player.on(AudioPlayerStatus.Idle, () => {
          connection.disconnect();
        });

      } catch (error) {
        console.error('Hubo un error al intentar reproducir la música:', error);
        message.reply('¡Hubo un problema al intentar reproducir la música!');
      }
    } else {
      message.reply('¡Necesitas unirte a un canal de voz primero!');
    }
  }

  // Respuesta chistosa a un mensaje
  if (message.content.toLowerCase().includes('hola')) {
    message.reply('¡Hola! ¿Qué tal? ¡Espero que no me pongas a cantar!');
  }
});

client.login(token);

