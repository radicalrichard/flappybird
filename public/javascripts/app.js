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
} 

//toggle menu
function toggleMenu(){
  if(paused === true) {
    $("#game").addClass('paused');
  } else {
    $("#game").removeClass('paused');
  }
}

function postScore(topscore) {
  var getName = prompt("Enter your name");

  $.ajax({
    type:'post',
    url: '/scores',
    data: {
      score: topscore,
      name: getName
    }
  }).done(function(data){
    getScores();
  });
}

function getScores(){
  var $scores = $('#post').empty();

  $.getJSON('/scores', function(scores){
    for (var i = 0; i < scores.length; i++) {
      var $score = '<dd>' + scores[i].name + " : " + scores[i].score + '</dd>';
      // var date = new Date();
      // var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      // var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      // var day = days[date.getDay()];
      // var month = months[date.getMonth()];
      // var year = date.getFullYear();

      // //$name = $('<dt>').html(scores[i].name)

      $scores.append($score);
    }
  });
} // End score functions

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
  getScores();
});
