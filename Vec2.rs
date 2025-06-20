use std::{
    f32::consts::PI,
    ops::{Add, Div, Mul, Neg, Sub},
};

#[derive(Clone, Copy, PartialEq)]
pub struct Vec2 {
    pub x: f32,
    pub y: f32,
}

impl Vec2 {
    pub fn magnitude(self) -> f32 {
        f32::sqrt(self.x * self.x + self.y * self.y)
    }

    pub fn set_magnitude(mut self, mag: f32) {
        let c_magnitude = self.magnitude();
        self.x = self.x / c_magnitude * mag;
        self.y = self.y / c_magnitude * mag;
    }

    pub fn angle(self) -> f32 {
        (f32::atan2(self.y, self.x).to_degrees() + 360.0) % 360.0
    }

    pub fn set_angle(mut self, angle: f32) {
        let c_magnitude = self.magnitude();
        let radians = angle * (PI / 180.0);

        self.x = c_magnitude * radians.cos();
        self.y = c_magnitude * radians.sin();
    }

    pub fn angle_from(self, origin: Vec2) -> f32 {
        (self - origin).angle()
    }
}

impl Add for Vec2 {
    type Output = Vec2;

    fn add(self, rhs: Self) -> Self::Output {
        Vec2 {
            x: self.x + rhs.x,
            y: self.y + rhs.y,
        }
    }
}

impl Sub for Vec2 {
    type Output = Vec2;

    fn sub(self, rhs: Self) -> Self::Output {
        Vec2 {
            x: self.x - rhs.x,
            y: self.y - rhs.y,
        }
    }
}

impl Mul<f32> for Vec2 {
    type Output = Vec2;

    fn mul(self, rhs: f32) -> Self::Output {
        Vec2 {
            x: self.x * rhs,
            y: self.y * rhs,
        }
    }
}

impl Div<f32> for Vec2 {
    type Output = Vec2;

    fn div(self, rhs: f32) -> Self::Output {
        Vec2 {
            x: self.x / rhs,
            y: self.y / rhs,
        }
    }
}

impl Neg for Vec2 {
    type Output = Vec2;

    fn neg(self) -> Self::Output {
        Vec2 {
            x: -self.x,
            y: -self.y,
        }
    }
}

impl Eq for Vec2 {}
