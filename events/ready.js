module.exports = client => {
    console.log('Bot en Ligne !');
    
    client.user.setPresence({
        status: 'dnd',
        activity: {
            name: 'Bot en développement',
            type: 'STREAMING',
            url: 'https://twitch.tv/sleeplesskyru'
        }
    });
}