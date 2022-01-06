exports.run = (client, message, args) => {
    //const target = interaction.options.getUser('user') ?? interaction.user;
    let target = message.author;
    if(args[0])
        target = client.getUserFromMention(args[0]);
    //const ozu = message.guild.emojis.cache.find(emoji => emoji.name === 'ozu');
    //let guild = client.guilds.get('581173349372133396');
    if(client.points.getPoints(target.id) < 100){
        message.reply(`${target} is not going to heaven`);
        let img = "./images/notheaven.png";
        message.channel.send({files: [img]});
    }else{
        message.reply(`${target} is going to heaven`);
        let img = "./images/heaven.png";
        message.channel.send({files: [img]});
    }
};
