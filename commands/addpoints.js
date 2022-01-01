exports.run = (client, message, args) => {
    const dab = message.guild.emojis.cache.find(emoji => emoji.name === 'girls_last_dab');
    if (message.author.id != client.auth.bennett) {
        message.reply(`You aren't Bennett lmao ${dab}`)
        return;
    }
    const ozu = message.guild.emojis.cache.find(emoji => emoji.name === 'ozu');
    if(!args[0]) {
        client.points.add(message.author.id, 5);
        let img = client.getpointimages(5);
        message.channel.send(`Added 5 Anime Club Points to the stash of ${message.author} ${ozu}`, {files: [img]});
    }
    else if(args[0] < 0) {
        message.reply(`Please use ${client.auth.prefix}removepoints instead.`);
        return;
    }
    else if(!args[1]) {
        client.points.add(message.author.id, args[0]);
        let img = client.getpointimages(args[0]);
        let s="s"
        if (args[0]==1)
            s="";
        if (img!="")
            message.channel.send(`Added ${args[0]} Anime Club Point${s} to the stash of ${message.author} ${ozu}`, {files: [img]});
        else
            message.channel.send(`Added ${args[0]} Anime Club Point${s} to the stash of ${message.author} ${ozu}`);
    }
    else {
        let user = client.getUserFromMention(args[1]);
        client.points.add(user.id, args[0]);
        let img = client.getpointimages(args[0]);
        let s="s"
        if (args[0]==1)
            s="";
        if (img!="")
            message.channel.send(`Added ${args[0]} Anime Club Point${s} to the stash of ${user} ${ozu}`, {files: [img]});
        else
            message.channel.send(`Added ${args[0]} Anime Club Point${s} to the stash of ${user} ${ozu}`);
    }
    
};
