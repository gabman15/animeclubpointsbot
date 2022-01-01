exports.run = (client, message, args) => {
    //const target = interaction.options.getUser('user') ?? interaction.user;
    let target = message.author;
    if(args[0])
        target = client.getUserFromMention(args[0]);
    const ozu = message.guild.emojis.cache.find(emoji => emoji.name === 'ozu');
    //let guild = client.guilds.get('581173349372133396');
    message.reply(`${target} has ${client.points.getPoints(target.id)} Anime Points ${ozu}`);
};
