"use strict";

// SECCIÓN DE QUERY-SELECTOR

const squareForm = document.getElementById("squareForm");
const triangleForm = document.getElementById("triangleForm");
const isoscelesForm = document.getElementById("isoscelesForm");
const scaleneForm = document.getElementById("scaleneForm");
const circleForm = document.getElementById("circleForm");

/* ----------------------------------
    SECCIÓN DE DATOS
---------------------------------- */

const RESULT_LABELS = {
  perimeter: "Perímetro",
  area: "Área",
  circumference: "Circunferencia",
  altura: "Altura",
};

/* ----------------------------------
    SECCIÓN DE FUNCIONES
---------------------------------- */

function calculateSquare(side) {
  return {
    perimeter: side * 4,
    area: side * side,
  };
}

function calculateTriangle(side1, side2, base, height) {
  return {
    perimeter: side1 + side2 + base,
    area: (base * height) / 2,
  };
}

function calculateIsoscelesTriangleHeight(side1, base) {
  if (side1 == base) {
    console.warn("This is not an isosceles triangle");
    return null;
  } else {
    return Math.sqrt(side1 ** 2 - base ** 2 / 4);
  }
}

function calculateScaleneTriangleHeight(side1, side2, side3, base) {
  if (side1 === side2 || side1 === side3 || side2 === side3) {
    console.warn("This is not a scalene triangle");
    return null;
  }

  const semiPerimeter = (side1 + side2 + side3) / 2;

  const area = Math.sqrt(
    semiPerimeter *
      (semiPerimeter - side1) *
      (semiPerimeter - side2) *
      (semiPerimeter - side3),
  );

  const height = (2 * area) / base;
  return height;
}

function calculateCircle(radius) {
  const diameter = radius * 2;
  const radiusSquared = Math.pow(radius, 2);

  return {
    circumference: diameter * Math.PI,
    area: radiusSquared * Number(Math.PI.toFixed(5)),
  };
}

/* ----------------------------------
    FUNCIONES DE INTERFAZ
---------------------------------- */

function clearResults(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = "";
  }
}

function displayResults(containerId, results, unit = "cm") {
  const container = document.getElementById(containerId);
  if (!container) return;

  let html = '<div class="results__grid">';

  for (const [key, value] of Object.entries(results)) {
    const label = RESULT_LABELS[key] || key;
    const formattedValue = typeof value === "number" ? value.toFixed(2) : value;

    html += `
      <div class="result-item">
        <span class="result-item__label">${label}:</span>
        <span class="result-item__value">${formattedValue} ${unit}</span>
      </div>
    `;
  }

  html += "</div>";
  container.innerHTML = html;
}

function displayError(containerId, message) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="error-message">
      <span class="error-message__icon">⚠</span>
      <span class="error-message__text">${message}</span>
    </div>
  `;
}

// SECCIÓN DE FUNCIONES DE EVENTOS
// Aquí van las funciones handler/manejadoras de eventos

function handleSquareSubmit(event) {
  event.preventDefault();
  const side = parseFloat(document.getElementById("squareSide").value);

  if (side <= 0) {
    displayError("squareResults", "El lado debe ser mayor que 0");
    return;
  }

  const results = calculateSquare(side);
  displayResults("squareResults", results);
}

function handleTriangleSubmit(event) {
  event.preventDefault();

  const side1 = parseFloat(document.getElementById("triangleSide1").value);
  const side2 = parseFloat(document.getElementById("triangleSide2").value);
  const base = parseFloat(document.getElementById("triangleBase").value);
  const height = parseFloat(document.getElementById("triangleHeight").value);

  if (side1 <= 0 || side2 <= 0 || base <= 0 || height <= 0) {
    displayError(
      "triangleResults",
      "Todos los valores deben ser mayores que 0",
    );
    return;
  }

  const results = calculateTriangle(side1, side2, base, height);
  displayResults("triangleResults", results);
}

function handleIsoscelesSubmit(event) {
  event.preventDefault();

  const side = parseFloat(document.getElementById("isoscelesSide").value);
  const base = parseFloat(document.getElementById("isoscelesBase").value);

  if (side <= 0 || base <= 0) {
    displayError(
      "isoscelesResults",
      "Todos los valores deben ser mayores que 0",
    );
    return;
  }

  const height = calculateIsoscelesTriangleHeight(side, base);

  if (height === null) {
    displayError(
      "isoscelesResults",
      "Esto no es un triángulo isósceles. Los lados iguales deben ser distintos de la base.",
    );
    return;
  }

  displayResults("isoscelesResults", { altura: height });
}

function handleScaleneSubmit(event) {
  event.preventDefault();

  const side1 = parseFloat(document.getElementById("scaleneSide1").value);
  const side2 = parseFloat(document.getElementById("scaleneSide2").value);
  const side3 = parseFloat(document.getElementById("scaleneSide3").value);
  const base = parseFloat(document.getElementById("scaleneBase").value);

  if (side1 <= 0 || side2 <= 0 || side3 <= 0 || base <= 0) {
    displayError("scaleneResults", "Todos los valores deben ser mayores que 0");
    return;
  }

  const height = calculateScaleneTriangleHeight(side1, side2, side3, base);

  if (height === null) {
    displayError(
      "scaleneResults",
      "Esto no es un triángulo escaleno. Todos los lados deben ser diferentes.",
    );
    return;
  }

  displayResults("scaleneResults", { altura: height });
}

function handleCircleSubmit(event) {
  event.preventDefault();

  const radius = parseFloat(document.getElementById("circleRadius").value);

  if (radius <= 0) {
    displayError("circleResults", "El radio debe ser mayor que 0");
    return;
  }

  const results = calculateCircle(radius);
  displayResults("circleResults", results);
}

// SECCIÓN DE EVENTOS
// Éstos son los eventos a los que reacciona la página

if (squareForm) {
  squareForm.addEventListener("submit", handleSquareSubmit);
  squareForm.addEventListener("reset", () => clearResults("squareResults"));
}
if (triangleForm) {
  triangleForm.addEventListener("submit", handleTriangleSubmit);
  triangleForm.addEventListener("reset", () => clearResults("triangleResults"));
}
if (isoscelesForm) {
  isoscelesForm.addEventListener("submit", handleIsoscelesSubmit);
  isoscelesForm.addEventListener("reset", () =>
    clearResults("isoscelesResults"),
  );
}
if (scaleneForm) {
  scaleneForm.addEventListener("submit", handleScaleneSubmit);
  scaleneForm.addEventListener("reset", () => clearResults("scaleneResults"));
}
if (circleForm) {
  circleForm.addEventListener("submit", handleCircleSubmit);
  circleForm.addEventListener("reset", () => clearResults("circleResults"));
}

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA
// Este código se ejecutará cuando se carga la página

console.log("Página y JS cargados!");
