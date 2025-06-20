struct Vec2(float x, float y)
{
	public float X { get; set; } = x;
	public float Y { get; set; } = y;

	public readonly Vec2 Copy() => new(X, Y);

	public float Magnitude
	{
		readonly get => MathF.Sqrt(X * X + Y * Y);
		set
		{
			var cMagnitude = Magnitude;
			X = X / cMagnitude * value;
			Y = Y / cMagnitude * value;
		}
	}

	public float Angle
	{
		readonly get => (MathF.Atan2(Y, X) * (180f / MathF.PI) + 360f) % 360f;
		set
		{
			var cMagnitude = Magnitude;
			var radians = value * (MathF.PI / 180f);

			X = cMagnitude * MathF.Cos(radians);
			Y = cMagnitude * MathF.Sin(radians);
		}
	}

	public readonly float AngleFrom(Vec2 origin)
	{
		var subtraction = this - origin;
		return subtraction.Angle;
	}

	public readonly Vec2 MoveTowards(Vec2 target, float maxDistance)
	{
		var subtraction = target - this;
		var magnitude = subtraction.Magnitude;

		if (magnitude <= maxDistance || magnitude == 0)
		{
			return target;
		}

		subtraction.Magnitude = maxDistance;

		return this + subtraction;
	}

	public readonly Vec2 PointTowards(Vec2 origin, Vec2 target, float maxAngle)
	{
		var targetAngle = target.AngleFrom(origin);
		var currentAngle = Angle;
		var difference = MathF.Abs(targetAngle - currentAngle);
		var copy = Copy();

		if (difference <= maxAngle || difference == 0)
		{
			copy.Angle = targetAngle;
			return copy;
		}

		sbyte s = 1;
		if ((currentAngle - targetAngle + 360) % 360 < (targetAngle - currentAngle + 360) % 360)
		{
			s = -1;
		}

		copy.Angle = currentAngle + maxAngle * s;

		return copy;
	}

	public static Vec2 operator +(Vec2 left, Vec2 right) => new(left.X + right.X, left.Y + right.Y);

	public static Vec2 operator -(Vec2 left, Vec2 right) => new(left.X - right.X, left.Y - right.Y);

	public static Vec2 operator -(Vec2 vec2) => new(-vec2.X, -vec2.Y);

	public static Vec2 operator /(Vec2 vec2, float div) => new(vec2.X / div, vec2.Y / div);

	public static Vec2 operator *(Vec2 vec2, float mul) => new(vec2.X * mul, vec2.Y * mul);
}
