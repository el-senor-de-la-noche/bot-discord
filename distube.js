
const{Distube} = require('distube');
const {SpotifyPlugin} = require('@distube/spotify');
const {SoundCloudPlugin} = require('@distube/soundcloud');
module.exports = (client) => {
    client.distube = new Distube(client,{
        emitNewSongOnly: false,
        leaveOnEmpty:true,
        leaveOnFinish: true,
        leaveOnStop: true,
        savePreviousSongs: true,
        emitAddSongWhenCreatingQueve: false,
        searchSongs: 0,
        nsfw: false,
        emptyCooldown: 25,
        ytdlOptions:{
            highWaterMark: 1024 * 1024 * 64,
            quality: "highestaudio",
            format:"audioonly",
            liveBuffer: 60000,
            disChunksSize: 1024 * 1024 *4,
        },
        youtubeBL: false,
        plugins: [
            new SpotifyPlugin({
                parallel: true,
                emitEventsAfterFetching: true
            }),
            new SoundCloudPlugin()
        ]
    });
};