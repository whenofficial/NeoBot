const Command = require('../../structures/Command');

class Ban extends Command {

    constructor() {
        super({
            name: 'Ban',
            info: 'Ban a user from the guild',
            usage: 'ban [@user] [reason]',
            category: 'Moderation'
        });

        this.ban = this.ban.bind(this);
    }

    async execute(message, client, args) {

        if(['help', 'h'].indexOf(args[0])+1)
            return super.cmdhelp(message);
        
        if(!args[0])
            return Command.prototype.warn('Please @mention a user to ban.', message);
        if(!args[1])
            return Command.prototype.warn('Please enter a reason.', message);
        
        let user = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        if(!user)
            return Command.prototype.warn('Please @mention a valid user to ban.', message);
        if(!user.bannable)
            return Command.prototype.warn('That user cannot be banned.', message);
        if(user.id == message.author.id)
            return Command.prototype.warn('You cannot ban yourself!', message);

        await this.ban(message.guild.id, user, reason, message);
    }

    async ban(guild, user, reason, message) {
        try {
            let data = {
                guild: guild,
                user: user.id,
                reason: reason,
                actor: message.author.id
            }
            try {
                try {
                    await user.send('You were banned on '+message.guild.name+' for '+reason);
                } catch (e) {
                    Command.prototype.log('Failed to send message to target user', 3);
                }
                await user.ban(reason);
            } catch (err) {
                Command.prototype.log('Unable to ban: insufficient permissions', 3);
                Command.prototype.warn('Failed to ban: insufficient permissions.', message);
            }
            let res = await Command.prototype.apipost('ban/new', data);
            Command.prototype.success('`[CASE #'+res.data.case+']` Banned '+user+' for '+reason, message);
        } catch (err) {
            Command.prototype.log('An error occurred while banning: '+err, 2);
            Command.prototype.warn(err, message);
        }
    }

}

module.exports = Ban;