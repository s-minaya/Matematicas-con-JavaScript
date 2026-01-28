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

function calculateMedian(list) {
  const listIsEven = isEven(list);

  if (listIsEven) {
  } else {
    const middleIndex = Math.floor(list.length / 2);
    const medianOddList = list[middleIndex];

    console.log(middleIndex);
    console.log(medianOddList);

    return medianOddList;
  }
}
