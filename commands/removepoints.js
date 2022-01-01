exports.run = (client, message, args) => {
    if(!args[0])
        return;
    if(message.author.id != client.auth.bennett)
        return;
    client.points.add(message.author.id, -args[0]);
};
