const Command = require('../../structures/Command');

class Unban extends Command {

    constructor(){
        super({
            name: 'Unban',
            info: 'Unban a user',
            usage: 'unban [user]'
        });
        
        this.unban = this.unban.bind(this);
    }

    async execute(client, message, args) {
        if(!args[0])
        return Command.prototype.warn('Please enter a user ID to unban.', message);

        let user = args[0]
        if(typeof user == 'undefined')
            return Command.prototype.warn('Please enter a valid user ID.', message);

        await this.unban(message.guild.id, user, message.author.id);
    }

    async unban(guild, user, actor) {
        message.guild.unban(user).then(guildUser => {
            let data = {
                guild_id: guild,
                user: user,
                actor: actor
            }
            axios.post('http://localhost:8000/ban/unban', data).then(res => {
                if(res.data.message !== 200) return;
                Command.prototype.success('`[CASE #'+res.data.case+']` Unbanned '+guildUser.username+'#'+guildUser.discriminator+'.', message);
            }).catch(err => {
                Command.prototype.warn(err, message);
            });
        }).catch(() => {
            Command.prototype.warn('User is not banned.', message);
        });
    }

}

module.exports = Unban;