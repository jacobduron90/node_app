var DB_USER = process.env.BN_USER
var DB_PWD = process.env.BN_PASSWORD

var DB_URL = "mongodb://"+DB_USER+":"+DB_PWD+"@localhost/brewnotes";


module.exports = {
	"url" : DB_URL,
	"secret" : "Ilovescotchandwhiskey"
}
