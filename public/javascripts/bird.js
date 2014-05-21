var Bird = function(){
	this.maxspeed = 20
	this.dx = 0
	this.dy = 0
	this.accel = 0.5
	this.$el = $('#bird')
	this.width = this.$el.width()
	this.height = this.$el.height()
	this.x = 500
	this.y = 200
}
