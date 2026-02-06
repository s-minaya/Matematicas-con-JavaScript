"use strict";

const Statistics = {};

/* ----------------------------------
            AVERAGE
---------------------------------- */

Statistics.calculateAverage = function calculateAverage(list) {
  /*-------- CALCULATE AVERAGE USING A LOOP --------*/

  //   let sum = 0;
  //   // Sum all elements of the array and then divide by the number of elements
  //   for (let i = 0; i < list.length; i++) {
  //     sum = sum + list[i];
  //   }
  //   const average = sum / list.length;
  //   return average;

  /*-------- CALCULATE AVERAGE USING REDUCE --------*/

  //   function sumAllElements(accumulator, currentValue) {
  //     return accumulator + currentValue;
  //   }
  //   const sum = list.reduce(sumAllElements);

  /*-------- CALCULATE AVERAGE USING ARROW FUNCTION --------*/

  // Sum all elements in the array using reduce with an arrow function
  const sum = list.reduce((a, b) => a + b);

  // Calculate average = sum / number of elements
  const average = sum / list.length;
  return average;
};

/* ----------------------------------
            MEDIAN
---------------------------------- */

// Returns true if the list has an even number of elements
Statistics.isEven = function isEven(list) {
  return !(list.length % 2);
};

// Returns true if the list has an odd number of elements
Statistics.isOdd = function isOdd(list) {
  return !!(list.length % 2);
};

/**
 * Calculates the median of a list of numbers.
 * The list is sorted before calculating the median.
 */

Statistics.calculateMedian = function calculateMedian(unsortedList) {
  const sortedList = Statistics.sortList(unsortedList);
  const listIsEven = Statistics.isEven(sortedList);

  // If the list has an even number of elements,
  // the median is the average of the two middle values

  if (listIsEven) {
    const firstMiddleIndex = sortedList.length / 2 - 1;
    const secondMiddleIndex = sortedList.length / 2;

    const middleValues = [];
    middleValues.push(sortedList[firstMiddleIndex]);
    middleValues.push(sortedList[secondMiddleIndex]);

    const medianOddList = Statistics.calculateAverage(middleValues);

    return medianOddList;
  } else {
    const middleIndex = Math.floor(sortedList.length / 2);
    const medianOddList = sortedList[middleIndex];

    return medianOddList;
  }
};

/**
 * Sorts a list of numbers in ascending order.
 */

Statistics.sortList = function sortList(unsortedList) {
  function sortList(accumulator, currentValue) {
    // if (accumulator > currentValue) {
    //   return 1;
    // } else if (accumulator === currentValue) {
    //   return 0;
    // } else if (accumulator < currentValue) {
    //   return -1;
    // }

    return accumulator - currentValue;

    // return currentValue - accumulator;
    // return 5 - 10 -> -5;
    // return 5 - 5 -> 0;
    // return 10 - 5 -> 5;
  }
  const sortedList = unsortedList.sort(sortList);
  return sortedList;
};

/* ----------------------------------
            MODE
---------------------------------- */

Statistics.calculateMode = function calculateMode(list) {
  const countMap = {};
  for (let i = 0; i < list.length; i++) {
    const element = list[i];

    if (countMap[element]) {
      countMap[element] += 1;
    } else {
      countMap[element] = 1;
    }
  }

  // Convert object to array of [element, count] pairs
  const entriesArray = Object.entries(countMap);

  // Sort array by count (second element of each pair)
  const sortedEntries = Statistics.sort2DList(entriesArray, 1);

  // Take the element with the highest count
  const maxEntry = sortedEntries[sortedEntries.length - 1];
  const mode = maxEntry[0];

  return mode;
};

const list2D = [
  ["a", 1],
  ["b", 2],
  ["c", 3],
];
const list2D_2 = [
  ["a", 100],
  ["b", 20],
  ["c", 30],
];

/**
 * Sorts a 2D list by a specific column index.
 */
Statistics.sort2DList = function sort2DList(unsortedList, index) {
  function compareByIndex(a, b) {
    return a[index] - b[index];
  }
  return unsortedList.sort(compareByIndex);
};

/* ----------------------------------
       WEIGHTED AVERAGE
---------------------------------- */

/**         FORMULA
 *
 * [(N1*C1) + (N2*C2) + (N3*C3)]
 * _____________________________
 *      (C1 + C2 + C3)
 * N = Grade
 * C = Credit
 */

const grades = [
  {
    course: "Art Drawing",
    grade: 10,
    credit: 2,
  },
  {
    course: "Programming",
    grade: 8,
    credit: 5,
  },
  {
    course: "History",
    grade: 7,
    credit: 5,
  },
];

// Multiply each grade by its credit
const gradesWithCredit = grades.map(function (gradeObject) {
  return gradeObject.grade * gradeObject.credit;
});

// Sum all the elements multiplied by their credits
const sumOfGradesWithCredit = gradesWithCredit.reduce(function (sum, current) {
  return sum + current;
}, 0);

// Sum all the credits
const credits = grades.map(function (gradeObject) {
  return gradeObject.credit;
});

const sumOfCredits = credits.reduce(function (sum, current) {
  return sum + current;
}, 0);

// Divide the total weighted grades by the total credits
const weightedAverage = sumOfGradesWithCredit / sumOfCredits;

/* ----------------------------------
       UI FUNCTIONALITY
---------------------------------- */

/*---------AVERAGE UI---------*/

const inputAverageList = document.querySelector(".js_averageList");
const pResultAverage = document.querySelector(".js_pResultAverage");
const btnCalculateAverage = document.querySelector(".js_calculateAverage");
const btnClearAverage = document.querySelector(".js_clearAverage");

if (btnCalculateAverage && btnClearAverage) {
  btnCalculateAverage.addEventListener("click", handleCalculateAverage);
  btnClearAverage.addEventListener("click", clearAverage);
}

/*Parses user input and calculates the average*/

function handleCalculateAverage() {
  const inputValue = inputAverageList.value.trim();

  if (!inputValue) {
    pResultAverage.innerText = "Por favor, introduce una lista de números";
    return;
  }

  const list = parseNumberList(inputValue);

  if (list.length === 0) {
    pResultAverage.innerText = "Por favor, introduce números válidos";
    return;
  }

  const average = Statistics.calculateAverage(list);
  pResultAverage.innerText = `La media aritmética es: ${average.toFixed(2)}`;
}

/*Clears average form*/

function clearAverage() {
  inputAverageList.value = "";
  pResultAverage.innerText = "";
}

/*---------MEDIAN UI---------*/

const inputMedianList = document.querySelector(".js_medianList");
const pResultMedian = document.querySelector(".js_pResultMedian");
const btnCalculateMedian = document.querySelector(".js_calculateMedian");
const btnClearMedian = document.querySelector(".js_clearMedian");

if (btnCalculateMedian && btnClearMedian) {
  btnCalculateMedian.addEventListener("click", handleCalculateMedian);
  btnClearMedian.addEventListener("click", clearMedian);
}

/*Parses user input and calculates the median*/

function handleCalculateMedian() {
  const inputValue = inputMedianList.value.trim();

  if (!inputValue) {
    pResultMedian.innerText = "Por favor, introduce una lista de números";
    return;
  }

  const list = parseNumberList(inputValue);

  if (list.length === 0) {
    pResultMedian.innerText = "Por favor, introduce números válidos";
    return;
  }

  const median = Statistics.calculateMedian(list);
  const sortedList = Statistics.sortList([...list]);
  pResultMedian.innerText = `La mediana es: ${median} (Lista ordenada: ${sortedList.join(", ")})`;
}

/*Clears median form*/

function clearMedian() {
  inputMedianList.value = "";
  pResultMedian.innerText = "";
}

/*---------MODE UI---------*/

const inputModeList = document.querySelector(".js_modeList");
const pResultMode = document.querySelector(".js_pResultMode");
const btnCalculateMode = document.querySelector(".js_calculateMode");
const btnClearMode = document.querySelector(".js_clearMode");

if (btnCalculateMode && btnClearMode) {
  btnCalculateMode.addEventListener("click", handleCalculateMode);
  btnClearMode.addEventListener("click", clearMode);
}

/*Parses user input and calculates the mode*/

function handleCalculateMode() {
  const inputValue = inputModeList.value.trim();

  if (!inputValue) {
    pResultMode.innerText = "Por favor, introduce una lista de números";
    return;
  }

  const list = parseNumberList(inputValue);

  if (list.length === 0) {
    pResultMode.innerText = "Por favor, introduce números válidos";
    return;
  }

  const mode = Statistics.calculateMode(list);
  pResultMode.innerText = `La moda es: ${mode}`;
}

/*Clears mode form*/

function clearMode() {
  inputModeList.value = "";
  pResultMode.innerText = "";
}

/*---------WEIGHTED AVERAGE UI---------*/

const inputWeightedValues = document.querySelector(".js_weightedValues");
const inputWeightedWeights = document.querySelector(".js_weightedWeights");
const pResultWeighted = document.querySelector(".js_pResultWeighted");
const btnCalculateWeighted = document.querySelector(".js_calculateWeighted");
const btnClearWeighted = document.querySelector(".js_clearWeighted");

if (btnCalculateWeighted && btnClearWeighted) {
  btnCalculateWeighted.addEventListener("click", handleCalculateWeighted);
  btnClearWeighted.addEventListener("click", clearWeighted);
}

/*Parses user input and calculates the weighted average*/

function handleCalculateWeighted() {
  const valuesInput = inputWeightedValues.value.trim();
  const weightsInput = inputWeightedWeights.value.trim();

  if (!valuesInput || !weightsInput) {
    pResultWeighted.innerText = "Por favor, rellena ambos campos";
    return;
  }

  const values = parseNumberList(valuesInput);
  const weights = parseNumberList(weightsInput);

  if (values.length === 0 || weights.length === 0) {
    pResultWeighted.innerText = "Por favor, introduce números válidos";
    return;
  }

  if (values.length !== weights.length) {
    pResultWeighted.innerText =
      "Los valores y pesos deben tener la misma cantidad de elementos";
    return;
  }

  // Calculate weighted average
  const valuesWithWeights = values.map(function (value, index) {
    return value * weights[index];
  });

  const sumOfValuesWithWeights = valuesWithWeights.reduce(function (
    sum,
    current,
  ) {
    return sum + current;
  }, 0);

  const sumOfWeights = weights.reduce(function (sum, current) {
    return sum + current;
  }, 0);

  const weightedAvg = sumOfValuesWithWeights / sumOfWeights;

  pResultWeighted.innerText = `La media ponderada es: ${weightedAvg.toFixed(2)}`;
}

/*Clears weighted average form*/

function clearWeighted() {
  inputWeightedValues.value = "";
  inputWeightedWeights.value = "";
  pResultWeighted.innerText = "";
}

/*---------HELPER FUNCTIONS---------*/

/**
 * Parses a comma-separated string into an array of numbers
 * Example: "10, 22, 53" -> [10, 22, 53]
 */
function parseNumberList(inputString) {
  const stringArray = inputString.split(",");
  const numberArray = [];

  for (let i = 0; i < stringArray.length; i++) {
    const trimmedString = stringArray[i].trim();
    const number = Number(trimmedString);

    if (!isNaN(number) && trimmedString !== "") {
      numberArray.push(number);
    }
  }

  return numberArray;
}

// Export para que otros módulos puedan importar
export { Statistics };
