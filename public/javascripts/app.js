var sid,
  defaults,
  state = {
    game: null,
  };

window.onload = function() {
  getMetadata();
  getSid();
};

function updateGame(game) {
  $('.tile').remove();
  state.game = game;
  $('#guessesRemaining').text(game.remaining + ' guesses remaining');
  if (game.status === 'victory') {
    $('#game>div').css('background-image', "url('../../assets/winner.gif')");
  } else if (game.status === 'loss') {
    $('#game>div').css('background-image', "url('../../assets/cry.gif')");
  }
  makeTiles(game);
}

function updateMenu(m) {
  m.fonts.forEach(f => {
    $('#inputFont').append(
      '<option style="font-family": "' +
        f.family +
        '", ' +
        f.category +
        '">' +
        f.family +
        '</option>',
    );
    $('head').append('<link rel="stylesheet" href="' + f.url + '">');
  });
  m.levels.forEach(l => {
    $('#inputDifficulty').append(
      "<option value='" + l.name + "'>" + l.name + '</option>',
    );
  });

  defaults = m.defaults;
  $('#inputWordTileColor').attr('value', defaults.colors.wordBackground);
  $('#inputGuessTileColor').attr('value', defaults.colors.guessBackground);
  $('#inputTextColor').attr('value', defaults.colors.textBackground);
  $("#inputDifficulty option[value='medium']").attr('selected', 'selected');
}

function updateTable(games) {
  var table = $('#gamesTable').empty();
  var header = $(
    '<tr><th>Level</th><th>Phrase</th><th>Remaining</th><th>Answer</th><th>Status</th></tr>',
  );
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
  return $(
    '<tr><td>' +
      game.level.name +
      '</td><td id="phrases">' +
      game.view +
      '</td><td>' +
      game.remaining +
      '</td><td>' +
      target +
      '</td><td>' +
      game.status +
      '</td></tr>',
  );
}

function showGame(game) {
  state.game = game;
  $('.tile').remove();
  if (game) {
    /*$('#game').slideDown();
    $('#game-list').slideUp();*/
    $('#guessesRemaining').text(game.remaining + ' guesses remaining');
    /*if (game.status === 'victory') {
      $('#game>div').css('background-image', "url('../../assets/winner.gif')");
    } else if (game.status === 'loss') {
      $('#game>div').css('background-image', "url('../../assets/cry.gif')");
    }*/
    makeTiles(game);
  } else {
    retrieveGames();
    $('#game>div').css('background-image', '');
    $('#game').slideUp();
    $('#game-list').slideDown();
  }

  $('#gameModal').modal('toggle');
}

function closeGame() {
  showGame(null);
}

function makeTiles(game) {
  $('.tile').remove();
  var letters = game.view.split('');
  letters.forEach(l => {
    $('#word').append("<div class='word tile'>" + l.toUpperCase() + '</div>');
  });
  letters = game.guesses.split('');
  letters.forEach(l => {
    $('#guesses').append(
      "<div class='guess tile'>" + l.toUpperCase() + '</div>',
    );
  });
  $('.word').css('background-color', game.colors.wordBackground);
  $('.guess').css('background-color', game.colors.guessBackground);
  $('.tile').css('color', game.colors.textBackground);
  $('.tile').css({
    'font-family': game.font.family + ', ' + game.font.category,
  });
}

function createGame() {
  var font = $('#inputFont').val();
  var level = $('#inputDifficulty').val();
  var word = $('#inputWordTileColor').val();
  var guess = $('#inputGuessTileColor').val();
  var fore = $('#inputTextColor').val();

  // reset options to default
  $('#inputWordTileColor').attr('value', defaults.colors.wordBackground);
  $('#inputGuessTileColor').attr('value', defaults.colors.guessBackground);
  $('#inputTextColor').attr('value', defaults.colors.textBackground);
  $("#inputLevel option[value='medium']").attr('selected', 'selected');

  var colors = {
    guessBackground: guess,
    textBackground: fore,
    wordBackground: word,
  };

  $.ajax({
    url: '/wordgame/api/v1/' + sid + '?level=' + level,
    method: 'POST',
    data: colors,
    headers: { font: font },
    success: showGame,
  });
}

function retrieveGames() {
  $.ajax({
    url: '/wordgame/api/v1/' + sid,
    method: 'GET',
    success: updateTable,
  });
}

function makeGuess() {
  var guess = $('#inputGuess').val();
  $('#inputGuess').val('');
  if (guess.length != 1) {
    alert('One character guesses, please.');
  } else if (state.game.guesses && state.game.guesses.indexOf(guess) > -1) {
    alert('Guess has already been made.');
  } else {
    $.ajax({
      url:
        '/wordgame/api/v1/' +
        sid +
        '/' +
        state.game.id +
        '/guesses/?guess=' +
        guess,
      method: 'POST',
      success: updateGame,
    });
  }
}

function getSid() {
  $.ajax({
    url: '/wordgame/api/v1/sid',
    method: 'GET',
    success: function(result) {
      sid = result;
    },
  });
}

function getMetadata() {
  $.ajax({
    url: '/wordgame/api/v1/meta',
    method: 'GET',
    success: updateMenu,
  });
}
