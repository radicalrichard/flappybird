DEFAULT_DX = 0;

var $window = $('#game'),
    $bird = $("#bird"),
    baddies = [],
    lastBaddie = Date.now(),
    paused = true,
    dy = DEFAULT_DX,
    velocity = 0,
    baddiesCleared = 0,
    score = 0,
    $score = $('#score'),
    topscore = 0,
    $topscore = $('#topscore');

//RENDER fns
function render(){
    var y = parseInt($bird.css('top')),
        ground = parseInt($window.height());

    // Update Baddies
    for (var i=0; i < baddies.length; i++) {
      var baddie = baddies[i];
      baddie.update();
    }

    // Apply gravity if not flapping
    if(!$bird.hasClass('flap')){
        velocity += dy;
        $bird.css({top:"+=" + velocity});
        dy += 0.025;
    }

    // Spawn a new baddie every 3 sec
    if((Date.now() - lastBaddie) > 3000){
      MakeBaddieWave();
      lastBaddie = Date.now();
    }

    //check in bounds
    if( y > ground ){
        console.log("DIED");
        ded();
    }
}

function stopRender(){
    console.log('Stopping Render');
    cancelAnimationFrame(frameId);
    paused = true;
    toggleMenu();
}

function startRender(){
    console.log('Starting Render');
    animloop();
    paused = false;
    toggleMenu();
} //end RENDER fns

//Resets on player death
function ded(){
  stopRender();
  checkTopScore();
  baddies = [];
  $('.baddie').remove();
  score = 0;
  $score.text('Score: ' + score);
  $bird.css({top: '30%'});
  dy = DEFAULT_DX;
  velocity = 0;
  baddiesCleared = 0;
}

// SCORE
function updateCounter(){
  baddiesCleared++;
  if(baddiesCleared % 2 === 0) {
    score++;
    $score.text('Score: ' + score);
  }
}

function checkTopScore () {
  if(score > topscore) {
    topscore = score;
    $topscore.text('Best: ' + score);
    postScore(topscore);
  }
} // End score functions

//toggle menu
function toggleMenu(){
  if(paused === true) {
    $("#game").addClass('paused');
  } else {
    $("#game").removeClass('paused');
  }
}

function postScore(topscore) {
  $.ajax({
    type:'post',
    url: '/scores',
    data: {
      score: topscore
    }
  }).done(function(data){
    getScores();
  });
}

function getScores(){
  var $scores = $('#scores').empty();

  $.getJSON('/scores', function(scores){
    for (var i = 0; i < scores.length; i++) {
      var $name = $('<dt>').html(scores[i].name),
          $score = $('<dd>').html(scores[i].score);

      $scores.append($name).append($score);
    }
  });
}

//CONTROLS
$(document).on("keydown", function(e){
    var key = e.which;
    if((key == 32) && !paused){
      //normal value 100, 50 for testing
      $bird.css({top:"-=50"}).addClass('flap');
      velocity = 0;
      dy = DEFAULT_DX;
      setTimeout(function(){
        $bird.removeClass('flap');
      }, 60);
    }
    if(key == 80){
      if(paused) {
          startRender();
      } else {
          stopRender();
      }
    } // hit P to stoprender
});

// Animation Frame
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function animloop(){
  window.frameId = requestAnimFrame(animloop);
  render();
}

//DOCRDY
$(function(){

});
