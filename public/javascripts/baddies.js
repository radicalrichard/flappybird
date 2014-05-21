
var Baddie = function(){
	this.x = Math.floor(Math.random() * ($(window).width() + 1))
	this.y = -100
	this.width = 100
	this.height = 100
	this.speed = Math.floor(Math.random() * 11) + 5
	this.$el = $('<div>').addClass('baddie').css({
		left: this.x,
		top: this.y
	}).appendTo($('#body'))

	this.death = function(){
		this.$el.remove();
	}
}
