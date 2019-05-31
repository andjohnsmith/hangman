var express = require('express');
var router = express.Router();
const uuid = require('uuid');
var fs = require('fs');
var os = require('os');
var words;

/* Data types */
function Font(category, family, rule, url) {
	this.category = category;
	this.family = family;
	this.rule = rule;
	this.url = url;
}

function Level(name, minLength, maxLength, rounds) {
	this.name = name;
	this.minLength = minLength;
	this.maxLength = maxLength;
	this.rounds = rounds;
}

function Colors(guessBackground, textBackground, wordBackground) {
	this.guessBackground = guessBackground;
	this.textBackground = textBackground;
	this.wordBackground = wordBackground;
}

function Metadata(fonts, levels, defaults) {
	this.fonts = fonts;
	this.levels = levels;
	this.defaults = defaults;
}

function Defaults(font, level, colors) {
	this.font = font;
	this.level = level;
	this.colors = colors;
}

function Game(colors, font, level) {
	this.id = uuid();
	this.colors = colors;
	this.font = font;
	this.level = level;
	this.status = 'unfinished';
	this.timestamp = Date.now();
	this.view = getWord(level.name, this.id);
	this.guesses = "";
	this.remaining = level.rounds;
}

function Error(msg) {
	this.msg = msg;
}

var fontsList = [
	new Font('cursive', 'Nanum Brush Script', 'Nanum Brush Script', "https://fonts.googleapis.com/css?family=Nanum+Brush+Script"),
	new Font('sans-serif', 'Exo 2', 'Exo 2', "https://fonts.googleapis.com/css?family=Exo+2"),
	new Font('cursive', 'Gloria Hallelujah', 'Gloria Hallelujah', "https://fonts.googleapis.com/css?family=Gloria+Hallelujah"),
	new Font('cursive', 'Amatic SC', 'Amatic SC', "https://fonts.googleapis.com/css?family=Amatic+SC"),
	new Font('serif', 'Ultra', 'Ultra', "https://fonts.googleapis.com/css?family=Ultra")
];
var levelsList = [
	new Level("easy", 3, 5, 8),
	new Level("medium", 4, 10, 7),
	new Level("hard", 9, 300, 6)
];
var defaults = new Defaults(
	fontsList[2], 
	levelsList.filter(level => level.name === "medium"), 
	new Colors('#FFFFFE', '#000001', '#808080')
);
var metadata = new Metadata(fontsList, levelsList, defaults);
var words = [];
// This is a collection of games
// indexed by session id
var gamesDb = {};
var wordsDb = {};

var createGame = function(colors, font, level) {
	words = fs.readFileSync('./routes/wordlist.txt', 'utf8');
	words = words.split(os.EOL);
	var result = new Game(colors, font, level); 
	gamesDb[result.id] = result;
	return result;
}

var getWord = function(levelName, gid) {
	var level = levelsList.filter(l => l.name === levelName)[0];
	var word = "";
	while (word.length > level.maxLength || word.length < level.minLength) {
		word = words[Math.floor(Math.random() * words.length)];
	}
	wordsDb[gid] = word;
	var ret = "";
	for (var i = 0; i < word.length; i++) {
		ret += '_';
	}
	return ret;
}

/* Routes */
router.get('/wordgame', function(req, res, next) {
	res.sendFile('index.html', { root : __dirname + '/../public' });
});

router.get('/wordgame/api/v1/sid', function(req, res, next) {
	var result = uuid();
	res.send(result);
});

router.get('/wordgame/api/v1/meta', function(req, res, next) {
	if (metadata) {
		res.send(metadata);
	} else {
		res.send(new Error("There is no metadata"));
	}
});

router.get('/wordgame/api/v1/meta/fonts', function(req, res, next) {
	if (fontsList) {
		res.send(fontsList);
	} else {
		res.send(new Error("The list of fonts doesn't exist"));
	}
});

router.get('/wordgame/api/v1/:sid', function(req, res, next) {
	var result = [];
	for (var key in gamesDb) {
		result.push(gamesDb[key]);
	}
	res.send(result);
});

router.post('/wordgame/api/v1/:sid', function(req, res, next) {
	var level = levelsList.filter(l => l.name === req.query.level)[0];
	var font = fontsList.filter(f => f.family === req.headers.font)[0];
	var result = createGame(req.body, font, level);
	res.send(result);
});

router.get('/wordgame/api/v1/:sid/:gid', function(req, res, next) {
	if (!gamesDb[req.params.gid]) {
		res.send(new Error("invalid gid"));
	} else {
		res.send(gamesDb[req.params.gid]);
	}
});

router.post('/wordgame/api/v1/:sid/:gid/guesses', function(req, res, next) {
	var game = gamesDb[req.params.gid];
	if (game.remaining > 0) {
		game.guesses += req.query.guess;
		if (!wordsDb[game.id].includes(req.query.guess)) {
			game.remaining -= 1;
		}
		// update game view
		var view = game.view,
			target = wordsDb[game.id];
			indices = [];
		for (var i = 0; i < target.length; i++) {
			if (target[i] === req.query.guess) {
				indices.push(i);
			}
		}
		indices.forEach(i => {
			game.view = game.view.substr(0, i) + req.query.guess + game.view.substr(i + 1);
		});
		if (wordsDb[game.id] === game.view) {
			game.status = 'victory';
			game.timeToComplete = Date.now() - game.timestamp;
			game.target = wordsDb[game.id];
		} else if (game.remaining < 1) {
			game.status = 'loss';
			game.timeToComplete = Date.now() - game.timestamp;
			game.target = wordsDb[game.id];
		}
	}
	res.send(game);
});

module.exports = router;
