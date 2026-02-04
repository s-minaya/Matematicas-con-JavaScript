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
/**
 * Organizes all employees' salaries into a structured object by company and year.
 * Steps:
 * 1. Iterate over each employee in the salaries array.
 * 2. Iterate over each job of the employee.
 * 3. For each job, initialize the company and year in the `companies` object if needed.
 * 4. Push the job's salary into the corresponding company and year array.
 */

const companies = {};

for (const employee of salaries) {
  for (const job of employee.jobs) {
    if (!companies[job.company]) {
      companies[job.company] = {};
    }

    if (!companies[job.company][job.year]) {
      companies[job.company][job.year] = [];
    }

    companies[job.company][job.year].push(job.salary);
  }
}

console.log(companies);

function getMedianSalaryByCompanyAndYear(name, year) {
  if (!companies[name]) {
    console.warn("La empresa no existe");
    return;
  } else if (!companies[name][year]) {
    console.warn("La empresa no dió salarios ese año");
  } else {
    return Statistics.calculateMedian(companies[name][year]);
  }
}

/**
 * Calculates the projected median salary for a company based on historical median salaries per year.
 *
 * Steps:
 * 1. Retrieves all years for which the company has salary data.
 * 2. Calculates the median salary for each year using getMedianSalaryByCompanyAndYear().
 * 3. Computes the year-over-year growth percentages from the yearly medians.
 * 4. Finds the median of these growth percentages.
 * 5. Applies the median growth to the last year's median salary to estimate the projected median salary.
 */

function getCompanySalaryProjection(name) {
  if (!companies[name]) {
    console.warn("La empresa no existe");
  } else {
    const companyYears = Object.keys(companies[name]);
    const yearlyMedianSalaries = companyYears.map((year) => {
      return getMedianSalaryByCompanyAndYear(name, year);
    });
    let growthPercentages = [];

    for (let i = 1; i < yearlyMedianSalaries.length; i++) {
      const currentSalary = yearlyMedianSalaries[i];
      const previousSalary = yearlyMedianSalaries[i - 1];
      const growth = currentSalary - previousSalary;
      const growthPercentage = growth / previousSalary;

      growthPercentages.push(growthPercentage);
    }
    const medianGrowthPercentages =
      Statistics.calculateMedian(growthPercentages);
    const lastMedianSalary =
      yearlyMedianSalaries[yearlyMedianSalaries.length - 1];
    const increase = lastMedianSalary * medianGrowthPercentages;
    const newMedianSalary = lastMedianSalary + increase;
    return newMedianSalary;
  }
}
