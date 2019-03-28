import Warn from '../commands/warn/Warn';
import Unban from '../commands/unban/Unban';
import Unmute from '../commands/unmute/Unmute';
import Logger from './logger';
import Purge from '../commands/purge/Purge';
import Mute from '../commands/mute/Mute';

class Router {
    public cmd: any;
    public client: any;
    public message: any;
    public args?: any;

    constructor(cmd: any, client: any, message: any, args: any) {
        this.cmd = cmd;
        this.client = client;
        this.message = message;
        this.args = args;
        this.route();
    }

    route() {
        switch(this.cmd) {
            case "warn": new Warn(this.message, this.client, this.args); break;
            case "unban": new Unban(this.message, this.client, this.args); break;
            case "unmute": new Unmute(this.message, this.client, this.args); break;
            case "purge": new Purge(this.message, this.client, this.args); break;
            case "mute": new Mute(this.message, this.client, this.args); break;
            default: this.noCommand();
        }
    }

    noCommand() {
        new Logger().log('Command '+this.cmd+' not found. Cancelling...', 3);
        this.message.channel.send('Command not found.');
    }
}

export default Router;