var sid,
	defaults,
	modalState = {
		game: null
	};

<!-- DOM Functions -->
window.onload = function() {
	$('#game').hide();
	getMetadata();
	getSid();
};

function updateGame(game) {
	$('.tile').remove();
	modalState.game = game;
	$('#guessesRemaining').text(game.remaining + " guesses remaining");
	if (game.status === 'victory') {
		$('#game>div').css("background-image", "url('../../assets/winner.gif')");
	} else if (game.status === 'loss') {
		$('#game>div').css("background-image", "url('../../assets/cry.gif')");
	}
	makeTiles(game);
}

function updateMenu(m) {
	m.fonts.forEach(f => {
		$("#font").append("<option>" + f.family + "</option>");
		$('head').append('<link rel="stylesheet" href="' + f.url + '">');
	});
	m.levels.forEach(l => {
		$("#level").append("<option value='" + l.name + "'>" + l.name + "</option>");
	});
	
	defaults = m.defaults;
	$("#wordBackground").attr("value", defaults.colors.wordBackground);
	$("#guessBackground").attr("value", defaults.colors.guessBackground);
	$("#foreground").attr("value", defaults.colors.textBackground);
	$("#level option[value='medium']").attr("selected", "selected");
}

function updateTable(games) {
	var table = $('#games').empty();
	var header = $('<tr><th>Level</th><th>Phrase</th><th>Remaining</th><th>Answer</th><th>Status</th></tr>');
	header.appendTo(table);
	games.forEach(g => {
		var tr = makeRow(g);
		tr.click(e => showGame(g));
		tr.appendTo(table);
		g.row = tr;
	});
}

function makeRow(game) {
	var target = game.target || '';
	return $('<tr><td>' + game.level.name + '</td><td id="phrases">'+ game.view + '</td><td>'
						+ game.remaining + '</td><td>' + target + '</td><td>'
						+ game.status + '</td></tr>');
}

function showGame(game) {
	modalState.game = game;
	$('.tile').remove();
	if (game) {
		$('#game').slideDown();
		$('#game-list').slideUp();
		$('#guessesRemaining').text(game.remaining + " guesses remaining");
		if (game.status === 'victory') {
			$('#game>div').css("background-image", "url('../../assets/winner.gif')");
		} else if (game.status === 'loss') {
			$('#game>div').css("background-image", "url('../../assets/cry.gif')");
		}
		makeTiles(game);
	} else {
		retrieveGames();
		$('#game>div').css("background-image", "");
		$('#game').slideUp();
		$('#game-list').slideDown();
	}
}

function makeTiles(game) {
	$('.tile').remove();
	var letters = game.view.split("");
	letters.forEach(l => {
		$('#word').append("<div class='word tile'>" + l.toUpperCase() + "</div>");
	});
	letters = game.guesses.split("");
	letters.forEach(l => {
		$('#guesses').append("<div class='guess tile'>" + l.toUpperCase() + "</div>");
	});
	$('.word').css('background-color', game.colors.wordBackground);
	$('.guess').css('background-color', game.colors.guessBackground);
	$('.tile').css('color', game.colors.textBackground);
	$('.tile').css({'font-family': game.font.family + ", " + game.font.category});
}

function closeGame() {
	showGame(null);
}

<!-- AJAX -->
function createGame() {
	var font = $('#font').val();
	var level = $('#level').val();
	var word = $('#wordBackground').val();
	var guess = $('#guessBackground').val();
	var fore = $('#foreground').val();
	
	// reset options to default
	$("#wordBackground").attr("value", defaults.colors.wordBackground);
	$("#guessBackground").attr("value", defaults.colors.guessBackground);
	$("#foreground").attr("value", defaults.colors.textBackground);
	$("#level option[value='medium']").attr("selected", "selected");
	
	var colors = {
		guessBackground: guess, 
		textBackground: fore, 
		wordBackground: word
	};
	
	$.ajax({
		url : '/wordgame/api/v1/' + sid + '?level=' + level,
		method : 'POST',
		data : colors,
		headers : {font : font},
		success : showGame
	});
}

function retrieveGames() {
	$.ajax({
		url: '/wordgame/api/v1/' + sid,
		method: 'GET',
		success: updateTable
	});
}

function makeGuess() {
	var guess = $('#guess').val();
	$('#guess').val('');
	if (guess.length != 1) {
		alert('One character guesses, please.');
	} else if (modalState.game.guesses && modalState.game.guesses.indexOf(guess) > -1) {
		alert('Guess has already been made.');
	} else {
		$.ajax({
			url: '/wordgame/api/v1/' + sid + '/' + modalState.game.id + '/guesses/?guess=' + guess,
			method: 'POST',
			success: updateGame
		});
	}
}

function getSid() {
	$.ajax({
		url : '/wordgame/api/v1/sid',
		method : 'GET',
		success : function(result) {
			sid = result;
		}
	});	
}

function getMetadata() {
	$.ajax({
		url: '/wordgame/api/v1/meta',
		method: 'GET',
		success: updateMenu
	});
}

