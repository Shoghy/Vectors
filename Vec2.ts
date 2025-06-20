export class Vec2 {
  constructor(
    public x: number,
    public y: number,
  ) { }

  copy(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  get magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  set magnitude(value: number) {
    const cMagnitude = this.magnitude;
    this.x = this.x / cMagnitude * value;
    this.y = this.y / cMagnitude * value;
  }

  get angle(): number {
    return (Math.atan2(this.y, this.x) * (180 / Math.PI) + 360) % 360;
  }

  set angle(value: number) {
    const cMagnitude = this.magnitude;
    const radians = value * (Math.PI / 180);

    this.x = cMagnitude * Math.cos(radians);
    this.y = cMagnitude * Math.sin(radians);
  }

  angleFrom(origin: Vec2): number {
    return this.subtract(origin).angle;
  }

  moveTowards(target: Vec2, maxDistance: number): Vec2 {
    const subtraction = target.subtract(this);
    const magnitude = subtraction.magnitude;

    if (magnitude <= maxDistance || magnitude === 0) {
      return target.copy();
    }

    subtraction.magnitude = maxDistance;
    return this.add(subtraction);
  }

  pointTowards(origin: Vec2, target: Vec2, maxAngle: number): Vec2 {
    const targetAngle = target.angleFrom(origin);
    const currentAngle = this.angle;
    const difference = Math.abs(targetAngle - currentAngle);
    const copy = this.copy();

    if (difference <= maxAngle || difference === 0) {
      copy.angle = targetAngle;
      return copy;
    }

    let s = 1;
    if (
      (currentAngle - targetAngle + 360) % 360
      <
      (targetAngle - currentAngle + 360) % 360
    ) {
      s = -1;
    }

    copy.angle = currentAngle + maxAngle * s;

    return copy;
  }

  add(other: Vec2): Vec2 {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  subtract(other: Vec2): Vec2 {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  negate(): Vec2 {
    return new Vec2(-this.x, -this.y);
  }

  divide(divisor: number): Vec2 {
    return new Vec2(this.x / divisor, this.y / divisor);
  }

  multiply(mul: number): Vec2 {
    return new Vec2(this.x * mul, this.y * mul);
  }

  equal(vec: Vec2): boolean {
    return this.x === vec.x && this.y === vec.y;
  }
}
