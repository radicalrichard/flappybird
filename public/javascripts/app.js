
var $window = $('#game'),
    $bird = $("#bird"),
    baddies = [],
    lastBaddie = Date.now(),
    paused = true;

//RENDER fns
function render(){
    var y = parseInt($bird.css('top')),
        ground = parseInt($window.height())


    for (var i=0; i < baddies.length; i++) {
      var baddie = baddies[i];
      baddie.update();
    }

    if(!$bird.hasClass('flap')){
        $bird.css({top:"+=5"})
    }

    if((Date.now() - lastBaddie) > 3000){
      MakeBaddieWave();
      lastBaddie = Date.now()
    }


    //check in bounds
    if( y > ground ){
        console.log("DIED");
        stopRender();
    }
};

function stopRender(){
    console.log('Stopping Render');
    cancelAnimationFrame(frameId);
    paused = true;
};

function startRender(){
    console.log('Starting Render');
    animloop();
    paused = false;
}; //end RENDER fns

//CONTROLS
$(document).on("keydown", function(e){
    var key = e.which
    if(key == 32){
      $bird.css({top:"-=100"}).addClass('flap');
      setTimeout(function(){
        $bird.removeClass('flap');
      }, 60)
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
};

//DOCRDY
$(function(){
  startRender();
});
