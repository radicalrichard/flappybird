
var MakeBaddieWave = function(){
	var positions = [
		[20, 45],
		[32.5, 32.5],
		[45, 20]
	];

	// pick set
	var height = positions[Math.floor(Math.random() * positions.length)];
	// spawn baddie top
	baddies.push(new Baddie('top', height[0]));
	// spawn baddie bottom
	baddies.push(new Baddie('bottom', height[1]));
};

var Baddie = function(position, height){
	// Default position if not given is bottom
	position = typeof position === 'undefined' ? 'bottom' : position;
	// Start baddie off the screen on right
	this.x = $window.width();
	this.width = 100;
	// Build new element
	this.$el = $('<div class="baddie"></div>');
	// Set new element positioning and height
	this.$el.css({left: this.x, height: (height + '%'), width: this.width});

	if(position === 'top'){
		this.$el.css({top: '0px'});
	}

	// Draw new element
	$window.append(this.$el);
	this.width = this.width;
	this.height = parseInt(this.$el.css('height'));
	this.y = this.$el.offset().top;
	//console.log(this.x, this.y, this.width, this.height);
};

function randomheight(){
	// allows minimum space between bars as twice the birds height
	var maxheight = (($window.height() / 2) - $('#bird').height() * 2) + 1;
	var minheight = $window.height() * 0.2;
	var height = Math.floor(Math.random() * (maxheight - minheight)) + minheight;
	return height;
}

Baddie.prototype.update = function(){
	// moves baddie left 1% of window width
	this.x -= ($window.width() * 0.005);
	if(this.x < this.$el.width() * -1){
		baddies.shift();
		this.$el.remove();
		updateCounter();

	} else {
		this.$el.css({left: this.x});
	}
	if(this.collision()){
		ded();
	}
};

Baddie.prototype.collision = function(){
	var birdTop = $bird.offset().top,
  		birdBottom = birdTop + $bird.height(),
  		birdLeft = $bird.offset().left,
  		birdRight = birdLeft + $bird.width();

  var baddieTop = this.y,
  		baddieBottom = baddieTop + this.height,
  		baddieLeft = this.x,
  		baddieRight = baddieLeft + this.width;

  var cantCollide = (
    baddieBottom < birdTop ||
    baddieTop > birdBottom ||
    baddieRight < birdLeft ||
    baddieLeft > birdLeft
  );
  
  return !cantCollide;
};
