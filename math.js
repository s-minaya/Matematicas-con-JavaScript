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

console.log({
  triangleSide1,
  triangleSide2,
  triangleBase,
  triangleHeight,
  trianglePerimeter,
  triangleArea,
});

/* ISOSCELES TRIANGLE */

/* REQUIREMENTS:
- Given the lengths of the three sides, find the height.
- It must be an isosceles triangle, not equilateral
  (2 equal sides and 1 different side).*/

function calculateIsoscelesTriangleHeight(side1, base) {
  if (side1 == base) {
    console.warn("This is not an isosceles triangle");
  } else {
    // h = squareRoot(side² − (base² / 4))
    return Math.sqrt(side1 ** 2 - base ** 2 / 4); // Math.sqrt is used to calculate the square root
  }
}

/* SCALENE TRIANGLE */

/* REQUIREMENTS:
- Given the lengths of the three sides, find the height.
- It must be a scalene triangle (all sides must be different).
*/

function calculateScaleneTriangleHeight(side1, side2, side3, base) {
  // Validate scalene triangle (all sides must be different)
  if (side1 === side2 || side1 === side3 || side2 === side3) {
    console.warn("This is not a scalene triangle");
    return;
  }

  // Semi-perimeter
  const semiPerimeter = (side1 + side2 + side3) / 2;

  // Area using Heron's formula
  const area = Math.sqrt(
    semiPerimeter *
      (semiPerimeter - side1) *
      (semiPerimeter - side2) *
      (semiPerimeter - side3),
  );

  // Height relative to the selected base
  const height = (2 * area) / base;

  return height;
}

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

/* ----------------------------------
        PRECIOS Y DESCUENTOS
---------------------------------- */

/* P x (100 - D )
___________________
        100*/
