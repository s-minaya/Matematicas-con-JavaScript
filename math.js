"use strict";

/* ----------------------------------
            SQUARE 
---------------------------------- */

console.group("Square");

const squareSide = 5;

const squarePerimeter = squareSide * 4;

const squareArea = squareSide * squareSide;

console.log({
  squareSide,
  squarePerimeter,
  squareArea,
});

function calculateSquare(side) {
  return {
    perimeter: side * 4,
    area: side * side,
  };
}

console.groupEnd("Square");

/* ----------------------------------
            TRIANGLE 
---------------------------------- */

console.group("Triangle");

const triangleSide1 = 6;
const triangleSide2 = 6;
const triangleBase = 4;
const triangleHeight = 5.5;

const trianglePerimeter = triangleSide1 + triangleSide2 + triangleBase;

const triangleArea = (triangleBase * triangleHeight) / 2;

function calculateTriangle(side1, side2, base, height) {
  return {
    perimeter: side1 + side2 + base,
    area: (base * height) / 2,
  };
}

console.log(calculateTriangle(6, 6, 4, 5.5));

console.log({
  triangleSide1,
  triangleSide2,
  triangleBase,
  triangleHeight,
  trianglePerimeter,
  triangleArea,
});

console.groupEnd("Triangle");

/* ----------------------------------
            CIRCLE 
---------------------------------- */

console.group("Circle");

const circleRadius = 3;
const circleDiameter = circleRadius * 2;
const PI = 3.1415;

/* Circle circumference = diameter × PI */
const circleCircumference = circleDiameter * PI;

/* Circle area = radius² × PI */
const circleArea = circleRadius ** 2 * PI;

console.log({
  circleRadius,
  circleDiameter,
  PI,
  circleCircumference,
  circleArea,
});

function calculateCircle(radius) {
  const diameter = radius * 2;

  /* Square the radius using Math.pow(base, exponent) */
  const radiusSquared = Math.pow(radius, 2);

  return {
    /* Circumference using the full precision of Math.PI */
    circumference: diameter * Math.PI,

    /* Area using PI limited to 5 decimal places */
    area: radiusSquared * Number(Math.PI.toFixed(5)),
  };
}

console.groupEnd("Circle");
