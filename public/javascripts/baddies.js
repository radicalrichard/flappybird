
var Baddie = function(){
	this.x = $(window).width()
	//this.y = Math.floor(Math.random() * ($(window).height() + 1))

	// Round down ( percentage of window height )
	this.height = Math.floor(Math.random() * ($(window).height() + 1));
	this.$el = $('<div class="baddie"></div>');
	this.$el.height(this.height);
	$('body').append(this.$el);
}

Baddie.prototype.update = function(){
	this.x -= ($(window).width() * 0.01)
	if(this.x < this.$el.width() * -1){
		this.$el.remove()
	} else {
		this.$el.css({left: this.x})
	}
}
