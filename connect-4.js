// Description:
//   Playable connect 4 in hubot
//
// Dependencies:
//   hubot-brain-redis
//
// Configuration:
//   none
//
// Commands:
//   c4 start
//   c4 join
//   c4 [1-7]
//
// Author:
//   Edouard SCHWEISGUTH <edznux@gmail.com> (https://edouard.schweisguth.fr)
//

function main(robot){
	console.log("Connect-4 loading");
	var game = require("./lib/game.js");
	console.log("connect-4 game load");

	robot.hear(/(?:connect-4|c4)( .*)?/i, function(res){
		// if(res.message.rawText.match(/^(?:connect-4|c4)/i)){ // shitty slack adapter ....
			// console.log(res);
			res.match[1] = res.match[1].trim();
			var user = res.message.user.name.toLowerCase();
			
			switch(true){
				case res.match[1] == "start":
					game.initBoard();
					console.log(game.drawBoard());
					// res.send("hue");
					res.send(game.drawBoard());
				break;
				case /[0-9]/.test(res.match[1]):
					console.log(game.players);
					var found = false;
					for (var i = 0; i < game.players.length; i++){
						console.log("i : ", i , "game.players[i]", game.players[i]);
						if(user == game.players[i].name){
							found = true;
							player = game.players[i];
						}
					}

					if(found){
						if(user != game.lastPlayer){
							var out = game.pushToCol(res.match[1], player.color);
							if(out){
								res.send(game.drawBoard());
								game.lastPlayer = user;
							}else{
								res.send("You can't push to the colum "+res.match[1]);
							}
						}else{
							res.send("Not your turn")
						}
					}else{
						res.send("Please join the game with `c4 join`");
					}
				break;
				case res.match[1] == "join":
					if(game.players.length < 2){
						var player = game.selectColor(user);
						res.send(player.name + " is " + player.color + " ("+player.emoji+")");
					}else{
						res.send("You can't join : "+ game.players[0].name + " and "+ game.players[1].name+ " already in.");
					}
				break;
				case res.match[1] == "version":
						res.send(require("./package.json").version);
					break;

				case res.match[1] == "?":
				case res.match[1] == "help":
					res.send(getHelp());
					break;
				default:
					res.send(getHelp());
					break;
			}
		// }
	});

	function getHelp(){
		return [
			"Connect-4 commands",
				" - start : Start connect-4 game",
				" - join : Join the current game",
				" - <x> : Push to column x where x is the column number",
				" - version : Print current version of hubot-connect-4",
				" - help : Print this help",
				" - ? : Alias for help"
				].join("\n\t");
	}
}

module.exports = main;
