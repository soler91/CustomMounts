const Command = require('command'),
		path = require('path'),
		fs = require('fs')

module.exports = function CustomMounts(dispatch) {
    const command = Command(dispatch)
	
	let target, customMount = 0;
	
	const INVALID = [4,100,105,106,107,108,109,110,111,112,
					113,114,115,116,117,118,119,120,121,122,
					123,124,125,126,127,128,129,130,131,132,
					133,134,135,136,137,138,139,140,141,142,
					143,144,145,146,147,148,149];
					
	try {
		customMount = require('./mount.json')
	}
	catch(e) {}

	command.add('mount', (mount) => {
		customMount = parseInt(mount);
			for (i = 0; i < INVALID.length; i++) {
				if(INVALID[i] == customMount){
				command.message('The value: '+customMount+' is invalid, try another.');
				customMount = 0;
				}
			}
			command.message('Mount set to: '+mount+'.');
		saveMount()
	});
	
	dispatch.hook('S_LOGIN', 2, (event) => {cid = event.cid});
	
	dispatch.hook('S_MOUNT_VEHICLE', 1, (event) => {
    if(customMount > 0 && customMount < 257) {
		if(event.target.toString() === cid.toString()){
			event.unk1 = customMount;
			return true;
		}
		return true;
    }
	});
	
	/*
	dispatch.hook('C_CHAT', 1, function(event) {
		let command = format.stripTags(event.message).split(' ');
		if(command[0] === '!mount') {
			if (command.length > 1) {
				customMount = parseInt(command[1]);
				for (i = 0; i < INVALID.length; i++) {
					if(INVALID[i] == customMount){
					systemMsg('The value: '+customMount+' is invalid, try another');
					customMount = 0;
					}
				}
				systemMsg('Set to: '+customMount);
			}
			return false;
		}
	});
	
	function systemMsg(msg) {
        dispatch.toClient('S_CHAT', 1, {
            channel: 24,
            authorID: 0,
            unk1: 0,
            gm: 0,
            unk2: 0,
            authorName: '',
            message: ' (Custom-Mount) ' + msg
        });
    }
	*/
	function saveMount() {
		fs.writeFileSync(path.join(__dirname, 'mount.json'), JSON.stringify(customMount))
	}
	
}
