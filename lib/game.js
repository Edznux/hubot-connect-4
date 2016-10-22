var colors = ["white","red","blue"];
var emoji = {
	numbers: {
		0:":zero:",
		1:":one:",
		2:":two:",
		3:":three:",
		4:":four:",
		5:":five:",
		6:":six:",
		7:":seven:",
		8:":eight:",
		9:":nine:"
	},
	circles : {
		white : ":white_circle:",
		red : ":red_circle:",
		blue : ":large_blue_circle:"
	}
}
var lastPlayer = "";
module.exports.lastPlayer = lastPlayer;
var players = [];
module.exports.players = players;


var boardSize = 7; // 7 - 1 ...
var board = [];
for (var i = 0; i < boardSize-1; i++) {
	board[i] = [];
}

var initBoard = function(){
	players.length = 0;
	for (var i = 0; i < boardSize-1; i++) {
		for(var j = 0; j <= 6; j++){
			board[i][j] = emoji.circles.white;
		}
	}
};
module.exports.initBoard = initBoard;


var drawBoard = function(){
	console.log("board : ", board);
	var msg = "";
	// draw number line
	for (var i = 1; i <= boardSize; i++) {
		msg += emoji.numbers[i];
	}
	msg+="\n";
	// draw circle
	for (var i = 0; i < boardSize-1; i++) {
		for(var j = 0; j <= 6; j++){
			console.log(i,j, board[i][j]);
			msg += board[i][j];
			// msg += "["+i+","+j+"]";
		}
		msg += "\n";
	}
	/*
	[0,0][0,1][0,2][0,3][0,4][0,5][0,6]
	[1,0][1,1][1,2][1,3][1,4][1,5][1,6]
	[2,0][2,1][2,2][2,3][2,4][2,5][2,6]
	[3,0][3,1][3,2][3,3][3,4][3,5][3,6]
	[4,0][4,1][4,2][4,3][4,4][4,5][4,6]
	[5,0][5,1][5,2][5,3][5,4][5,5][5,6]
	*/

	return msg;
}
module.exports.drawBoard = drawBoard;


var pushToCol = function(x, color){
	console.log("push to col : ", x);
	var i = 5;
	while(board[i][x-1] != emoji.circles.white ){
		i--;
	}

	if(i >= 0 ){
		board[i][x-1] = emoji.circles[color];
	}else{
		return false;	
	}
	return true;
}
module.exports.pushToCol = pushToCol;

var selectColor = function(name){
	var player = {"name":name, "color" : colors[players.length+1], "emoji": emoji.circles[ colors[players.length+1] ]}
	players.push(player);
	return player;
}
module.exports.selectColor = selectColor;