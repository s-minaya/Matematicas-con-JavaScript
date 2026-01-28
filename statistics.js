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
