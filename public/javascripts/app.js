
var $window = $(window),
    $bird = $("#bird"),
    baddies = [],
    lastBaddie = Date.now()

baddies.push(new Baddie());

//RENDER fns
function render(){
    var y = parseInt($bird.css('top')),
        ground = parseInt($window.height())


    for (var i=0; i < baddies.length; i++) {
      var baddie = baddies[i];
      baddie.update();
    }

    $bird.css({top:"+=1"})
    if((Date.now() - lastBaddie) > 500){
      baddies.push(new Baddie());
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
};

function startRender(){
    console.log('Starting Render');
    animloop();
}; //end RENDER fns

//CONTROLS
$(document).on("keydown", function(e){
    var key = e.which
    if(key == 32){
      $bird.css({top:"-=30"})
    }
    if(key == 80){
      stopRender();
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
