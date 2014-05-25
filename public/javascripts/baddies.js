
var Baddie = function(){
	this.x = 100
	this.y = Math.floor(Math.random() * ($(window).height() + 1))
	this.width = 100
	this.height = 100
	this.speed = Math.floor(Math.random() * 2) + 5
	this.$el = $('<div>').addClass('baddie').css({
		left: this.x,
		top: this.y
	}).appendTo($('#body'))

	this.death = function(){
		this.$el.remove();
	}
}

Baddie.prototype.update = function(){
	this.$el.css({left: this.x, top: this.y})
}
