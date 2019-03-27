const Command = require('../../structures/Command');

class Purge extends Command {
    constructor() {
        super({
            name: 'Purge',
            info: 'Purge a specific amount of messages. Maximum 99 messages',
            usage: 'purge [#]',
            category: 'Moderation'
        });
    }

    async execute(message, client, args) {

        if(['help', 'h'].indexOf(args[0])+1)
            return super.cmdhelp(message);
        
        if(!args[0])
            return Command.prototype.warn('Please define a number of lines to delete', message);

        const deleteCount = parseInt(args[0], 10);

        if(typeof deleteCount !== 'number')
            return Command.prototype.warn("Please enter a number.", message)

        if(!deleteCount || deleteCount < 1 || deleteCount > 99)
            return Command.prototype.warn("Please provide a number between 1 and 99 for the number of messages to delete.", message);

        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        try {
            await message.channel.bulkDelete(fetched)
            Command.prototype.success('Successfully purged **'+deleteCount+' messages**.', message);
        } catch (err) {
            Command.prototype.log('Failed to bulk delete: '+err, 2);
            Command.prototype.warn('An error occurred.', message);
        }
              
    }
}

module.exports = Purge;