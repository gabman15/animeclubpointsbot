exports.run = (client, message, args) => {
    //const target = interaction.options.getUser('user') ?? interaction.user;
    const target = message.author;
    const ozu = message.guild.emojis.cache.find(emoji => emoji.name === 'ozu');
    //let guild = client.guilds.get('581173349372133396');
    let nickname = message.member.displayName;
    message.reply(`${nickname} has ${client.points.getPoints(target.id)} Anime Points ${ozu}`);
};
