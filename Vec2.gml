function Vec2(x = 0, y = 0) constructor {
	self.x = x;
	self.y = y;

	static copy = function() {
		return new Vec2(x, y);
	}

	static magnitude = function() {
		return point_distance(0, 0, x, y);
	}

	static set_magnitude = function(mag) {
		var ang = angle();

		x = lengthdir_x(mag, ang);
		y = lengthdir_y(mag, ang);
	}

	static angle = function() {
		return point_direction(0, 0, x, y);
	}

	static set_angle = function(ang) {
		var mag = magnitude();

		x = lengthdir_x(mag, ang);
		y = lengthdir_y(mag, ang);
	}

	static angle_from = function(origin) {
		return point_direction(origin.x, origin.y, vec2.x, vec2.y);
	}

	static add = function(vec2) {
		return new Vec2(
			x + vec2.x,
			y + vec2.y
		);
	}

	static subtract = function(vec2) {
		return new Vec2(
			x - vec2.x,
			y - vec2.y
		);
	}

	static negate = function() {
		return new Vec2(-x, -y);
	}

	static divide = function(divisor) {
		return new Vec2(x/divisor, y/divisor);
	}

	static multiply = function(num) {
		return new Vec2(x*num, y*num);
	}

	static set_to_object = function(obj) {
		obj.x = x;
		obj.y = y;
	}

	static set_from_object = function(obj) {
		x = obj.x;
		y = obj.y;
	}

	static move_towards = function(target, max_distance) {
		var sub = target.subtract(self);
		var sub_magnitude = sub.magnitude();

		if (sub_magnitude <= max_distance || sub_magnitude == 0) {
			return target.copy();
		}

		sub.set_magnitude(max_distance);

		return add(sub);
	}

	static point_towards = function(origin, target, max_angle) {
		var target_angle = point_direction(origin.x, origin.y, target.x, target.y);
		var current_angle = self.angle();
		var difference = abs(target_angle - current_angle);

		var c = copy();
		if(difference <= max_angle || difference == 0) {
			c.set_angle(target_angle);
			return c;
		}

		var s = 1;
		if (
			(current_angle - target_angle + 360) % 360
			<
			(target_angle - current_angle + 360) % 360
		) {
			s = -1;
		}

		c.set_angle(current_angle + max_angle * s);

		return c;
	}

	static distance_to = function(vec2) {
		return point_distance(x, y, vec2.x, vec2.y);
	}

	static equal = function(vec2) {
		return x == vec2.x && y == vec2.y;
	}
}
