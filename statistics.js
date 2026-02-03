"use strict";

/* ----------------------------------
            AVERAGE
---------------------------------- */

function calculateAverage(list) {
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
}

console.log(calculateAverage([10, 22, 53, 14, 10000]));

/* ----------------------------------
            MEDIAN
---------------------------------- */

// Returns true if the list has an even number of elements
function isEven(list) {
  return !(list.length % 2);
}
console.log(isEven([1, 2, 3, 4]));
console.log(isEven([10, 22, 53]));

// Returns true if the list has an odd number of elements
function isOdd(list) {
  return !!(list.length % 2);
}
console.log(isOdd([1, 2, 3]));
console.log(isOdd([1, 2, 3, 4]));

/**
 * Calculates the median of a list of numbers.
 * The list is sorted before calculating the median.
 */

function calculateMedian(unsortedList) {
  const sortedList = sortList(unsortedList);
  const listIsEven = isEven(sortedList);

  // If the list has an even number of elements,
  // the median is the average of the two middle values

  if (listIsEven) {
    const firstMiddleIndex = sortedList.length / 2 - 1;
    const secondMiddleIndex = sortedList.length / 2;

    const middleValues = [];
    middleValues.push(sortedList[firstMiddleIndex]);
    middleValues.push(sortedList[secondMiddleIndex]);

    const medianOddList = calculateAverage(middleValues);

    return medianOddList;
  } else {
    const middleIndex = Math.floor(sortedList.length / 2);
    const medianOddList = sortedList[middleIndex];

    console.log(middleIndex);
    console.log(medianOddList);

    return medianOddList;
  }
}

/**
 * Sorts a list of numbers in ascending order.
 */

function sortList(unsortedList) {
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
}

/* ----------------------------------
            MODE
---------------------------------- */

function calculateMode(list) {
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
  const sortedEntries = sort2DList(entriesArray, 1);

  // Take the element with the highest count
  const maxEntry = sortedEntries[sortedEntries.length - 1];
  const mode = maxEntry[0];

  return mode;
}

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
function sort2DList(unsortedList, index) {
  function compareByIndex(a, b) {
    return a[index] - b[index];
  }
  return unsortedList.sort(compareByIndex);
}
