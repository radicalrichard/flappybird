DEFAULT_DX = 0;

var $window = $('#game'),
    $bird = $("#bird"),
    baddies = [],
    lastBaddie = Date.now(),
    paused = true,
    dy = DEFAULT_DX,
    ticks = 0,
    velocity = 0;

//RENDER fns
function render(){
    var y = parseInt($bird.css('top')),
        ground = parseInt($window.height());


    for (var i=0; i < baddies.length; i++) {
      var baddie = baddies[i];
      baddie.update();
    }

    //Velocity on flap
    if(!$bird.hasClass('flap')){
        velocity += dy;
        $bird.css({top:"+=" + velocity});
        dy += 0.025;
    }

    //Spawn a new baddie every 3 sec
    if((Date.now() - lastBaddie) > 3000){
      MakeBaddieWave();
      lastBaddie = Date.now();
    }

    //check in bounds
    if( y > ground ){
        console.log("DIED");
        stopRender();
    }
}

function stopRender(){
    console.log('Stopping Render');
    cancelAnimationFrame(frameId);
    paused = true;
}

function startRender(){
    console.log('Starting Render');
    animloop();
    paused = false;
} //end RENDER fns

// SCORE
function updateCounter(){
  ticks++;
  if(ticks % 25 === 0){
    $('#score').text(parseInt($('#score').text())+1 );
  }
}

//CONTROLS
$(document).on("keydown", function(e){
    var key = e.which;
    if(key == 32){
      $bird.css({top:"-=100"}).addClass('flap');
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
