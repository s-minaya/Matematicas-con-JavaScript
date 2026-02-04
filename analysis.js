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
/**
 * Calculates the projected salary for an employee based on the median growth
 * of their historical salaries.
 *
 * Steps:
 * 1. Computes year-over-year growth percentages from the employee's salary history.
 * 2. Calculates the median of these growth percentages.
 * 3. Applies the median growth to the last known salary to estimate the projected salary.
 */

function getEmployeeSalaryProjection(employeeName) {
  const jobs = findEmployee(employeeName).jobs;

  let growthPercentages = [];

  for (let i = 1; i < jobs.length; i++) {
    const currentSalary = jobs[i].salary;
    const previousSalary = jobs[i - 1].salary;
    const growth = currentSalary - previousSalary;
    const growthPercentage = growth / previousSalary;

    growthPercentages.push(growthPercentage);
  }
  const medianGrowthPercentages = Statistics.calculateMedian(growthPercentages);
  console.log({ growthPercentages, medianGrowthPercentages });

  const lastSalary = jobs[jobs.length - 1].salary;

  const increase = lastSalary * medianGrowthPercentages;
  const newSalary = lastSalary + increase;

  return newSalary;

  console.log({ newSalary });
}
