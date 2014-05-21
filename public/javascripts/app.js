
var $window = $(window),
    $bird = $("#bird");

function render(){
    var y = parseInt($bird.css('top')),
        ground = parseInt($window.height())
    updateBaddies()
		this.player.update()

    $bird.css({top:"+=1"})

    //check in bounds
    if( y > ground ){
        console.log("DIED");
        stopRender();
    }
};

//CONTROLS
$(document).on("keydown", function(e){
    var key = e.which
    if(key == 32){
        $bird.css({top:"-=30"})
    }
});

// Animation Frame
function stopRender(){
    console.log('Stopping Render');
    cancelAnimationFrame(frameId);
};

function startRender(){
    console.log('Starting Render');
    animloop();
};

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
