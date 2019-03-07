function encryptPWD(pwd) {
	if(pwd==''){
		return null
	}else{
		const crypto = require('crypto');
	    return crypto.createHmac('sha256','').update(pwd).digest('hex');
	}
	
}
export { encryptPWD }