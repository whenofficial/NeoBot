const meta = require('./case.json');
const wMessage = require('../../messages/warning');
const sMessage = require('../../messages/success');
const axios = require('axios');

exports.run = (message, client, args) => {
    // !case [number]

    if(args[0] === null) {
        wMessage('Please enter a case ID.', message);
        return;
    }

    let x = Number(args[0]);
    
    if(isNaN(x)) return;

    axios.get('http://localhost:8000/cases/specific', {headers:{case:x}}).then(res => {
        let data = res.data.data;
        let type = data.type.charAt(0).toUpperCase() + data.type.slice(1);
        var color;
        var avatarURL;

        switch(data.type) {
            case "warn":
                color = 15322429;
            break;
        }

        client.fetchUser(data.user).then(a => {
            avatarURL = a.avatarURL;
            message.channel.send({
                "embed": {
                  "color": color,
                  "timestamp": `${res.data.time}`,
                  "author": {
                    "name": `CASE #${data.case}`
                  },
                  "thumbnail": {
                    "url": avatarURL
                  },
                  "fields": [
                    {
                      "name": "Type",
                      "value": type,
                      "inline": true
                    },
                    {
                      "name": "User",
                      "value": `<@${data.user}>`,
                      "inline": true
                    },
                    {
                        "name": "Actor",
                        "value": `<@${data.actor}>`,
                        "inline": true
                    },
                    {
                      "name": "Reason",
                      "value": data.reason
                    }
                  ]
                }
            })
        });

    })

}