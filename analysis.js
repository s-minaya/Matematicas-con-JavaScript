"use strict";

// Personal analysis

function findEmployee(employeeToFind) {
  return salaries.find((employee) => employee.name === employeeToFind);
}

function medianByEmployee(employeeName) {
  const jobs = findEmployee(employeeName).jobs;

  const salaries = jobs.map(function (element) {
    return element.salary;
  });

  const medianSalaries = Statistics.calculateMedian(salaries);

  console.log(medianSalaries);
  return medianSalaries;
}
