exports.run = (client, message, args) => {
    const dab = message.guild.emojis.cache.find(emoji => emoji.name === 'girls_last_dab');
    if (message.author.id != client.auth.bennett) {
        message.reply(`You aren't Bennett lmao ${dab}`)
        return;
    }
    const ozu = message.guild.emojis.cache.find(emoji => emoji.name === 'ozu');
    if(!args[0]) {
        return;
    }
    else if(!args[1]) {
        client.points.add(message.author.id, args[0] - client.points.getPoints(message.author.id.id));
        let s="s"
        if (args[0]==1)
            s="";
        message.channel.send(`Set the stash of ${message.author} to ${args[0]} Anime Club Point${s} ${ozu}`);
    }
    else {
        let user = client.getUserFromMention(args[1]);
        client.points.add(user.id, args[0] - client.points.getPoints(user.id));
        let s="s"
        if (args[0]==1)
            s="";
        message.channel.send(`Set the stash of ${user} to ${args[0]} Anime Club Point${s} ${ozu}`);
    }
    
};
