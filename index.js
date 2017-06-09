//Credits to Tera-Love and Saegusa
//This is mostly copy paste

const format = require('./format.js');

module.exports = function CustomMounts(dispatch) {
    
	let customMount = 0;
	
	dispatch.hook('S_MOUNT_VEHICLE', 1, (event) => {
    if(customMount > 0 && customMount < 257) {
		event.unk1 = customMount;
        return true;
    }
	});
	
	dispatch.hook('C_CHAT', 1, function(event) {
		let command = format.stripTags(event.message).split(' ');
		if(command[0] === '!mount') {
			if (command.length > 1) {
				customMount = parseInt(command[1]);
			}
			return false;			
		}
	});	
	
}