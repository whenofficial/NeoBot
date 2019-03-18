const meta = require('./cases.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {
    // !cases [user]

    if(!args[0])
        return wMessage('Please @mention a user on this server or paste their ID to find their cases.', message);

    if(typeof user.id === 'undefined')
        return wMessage('Please @mention a user on this server or paste their ID to find their cases.', message);

    axios.get('http://localhost:8000/cases/get', {headers:{user:user}}).then(res => {
        
        let arr = res.data.data;

        client.fetchUser(user.id).then(guildUser => {
            if ([0, null].indexOf(arr.length) +1){
                message.channel.send('**'+guildUser.username+'#'+guildUser.discriminator+'** has 0 cases.');
                return;
            }
    
            let cases;
            arr.length >= 2 ? cases='cases' : cases='case';
            message.channel.send('Found '+arr.length+' '+cases+' for **'+guildUser.username+'#'+guildUser.discriminator+'**:');
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                let type = element.type.charAt(0).toUpperCase() + element.type.slice(1);
                message.channel.send(''+element.created_at+' | `[CASE #'+element.id+']` __'+type+'__: '+element.reason+' (**by `<@'+element.actor+'>`**)');
            }
        }).catch(err => {
            wMessage('User not found.', message);
        });

    }).catch(err => {
        console.log(err);
    });

    // TODO: get cases
}