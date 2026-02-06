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

  // If there is only one salary record, projection cannot be calculated
  if (jobs.length < 2) {
    console.warn(
      "Se necesitan al menos 2 registros de salario para calcular la proyección",
    );
    return null;
  }

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

// Function to rebuild the companies object from the salaries array
function rebuildCompanies() {
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

  return companies;
}

// Initialize companies from salaries
let companies = rebuildCompanies();

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
    return null;
  } else {
    const companyYears = Object.keys(companies[name]);

    // If there is only one year of data, projection cannot be calculated
    if (companyYears.length < 2) {
      console.warn(
        "Se necesitan al menos 2 años de datos para calcular la proyección",
      );
      return null;
    }

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

// General analysis

function getOverallMedian() {
  const mediansPerEmployee = salaries.map((employee) =>
    medianByEmployee(employee.name),
  );

  const median = Statistics.calculateMedian(mediansPerEmployee);
  return median;
}

function getTop10EmployeeMedian() {
  const mediansPerEmployee = salaries.map((employee) =>
    medianByEmployee(employee.name),
  );

  const sortedMedians = Statistics.sortList(mediansPerEmployee);

  const top10Count = mediansPerEmployee.length / 10;
  const limit = mediansPerEmployee.length - top10Count;

  const top10 = sortedMedians.splice(limit, sortedMedians.length);
  const medianTop10 = Statistics.calculateMedian(top10);
  return medianTop10;
}

/* ----------------------------------
       UI FUNCTIONALITY
---------------------------------- */

/*---------ADD EMPLOYEE---------*/

const inputEmployeeName = document.querySelector(".js_employeeName");
const inputEmployeeYears = document.querySelector(".js_employeeYears");
const inputEmployeeCompanies = document.querySelector(".js_employeeCompanies");
const inputEmployeeSalaries = document.querySelector(".js_employeeSalaries");
const pResultAddEmployee = document.querySelector(".js_pResultAddEmployee");
const btnAddEmployee = document.querySelector(".js_addEmployee");
const btnClearAddEmployee = document.querySelector(".js_clearAddEmployee");

btnAddEmployee.addEventListener("click", handleAddEmployee);
btnClearAddEmployee.addEventListener("click", clearAddEmployee);

/*Adds a new employee to the salaries array*/

function handleAddEmployee() {
  const name = inputEmployeeName.value.trim();
  const yearsInput = inputEmployeeYears.value.trim();
  const companiesInput = inputEmployeeCompanies.value.trim();
  const salariesInput = inputEmployeeSalaries.value.trim();

  if (!name || !yearsInput || !companiesInput || !salariesInput) {
    pResultAddEmployee.innerText = "Por favor, rellena todos los campos";
    return;
  }

  const years = parseNumberList(yearsInput);
  const companiesArray = companiesInput.split(",").map((c) => c.trim());
  const salariesArray = parseNumberList(salariesInput);

  if (
    years.length === 0 ||
    companiesArray.length === 0 ||
    salariesArray.length === 0
  ) {
    pResultAddEmployee.innerText = "Por favor, introduce datos válidos";
    return;
  }

  // Determine which arrays need to be expanded
  const maxLength = Math.max(
    years.length,
    companiesArray.length,
    salariesArray.length,
  );

  // Expand years if there is only one
  if (years.length === 1 && maxLength > 1) {
    const singleYear = years[0];
    years.length = 0;
    for (let i = 0; i < maxLength; i++) {
      years.push(singleYear + i); // Consecutive years
    }
  }

  // Expand companies if there are fewer than the maximum
  if (companiesArray.length < maxLength) {
    const lastCompany = companiesArray[companiesArray.length - 1];
    while (companiesArray.length < maxLength) {
      companiesArray.push(lastCompany);
    }
  }

  // Expand salaries if there is only one
  if (salariesArray.length === 1 && maxLength > 1) {
    const singleSalary = salariesArray[0];
    salariesArray.length = 0;
    for (let i = 0; i < maxLength; i++) {
      salariesArray.push(singleSalary);
    }
  }

  // Ensure all have the same length
  if (
    years.length !== companiesArray.length ||
    years.length !== salariesArray.length
  ) {
    pResultAddEmployee.innerText = `Error: Años (${years.length}), Empresas (${companiesArray.length}) y Salarios (${salariesArray.length}) deben coincidir. Ajusta los datos.`;
    return;
  }

  // Check if employee already exists
  const existingEmployee = findEmployee(name);
  if (existingEmployee) {
    pResultAddEmployee.innerText = `El empleado ${name} ya existe`;
    return;
  }

  // Build jobs array
  const jobs = [];
  for (let i = 0; i < years.length; i++) {
    jobs.push({
      year: years[i],
      company: companiesArray[i],
      salary: salariesArray[i],
    });
  }

  // Add employee to salaries array
  salaries.push({
    name: name,
    jobs: jobs,
  });

  // Save employees to localStorage
  localStorage.setItem("mathlab_salaries", JSON.stringify(salaries));

  // Rebuild the companies object
  companies = rebuildCompanies();

  pResultAddEmployee.innerText = `¡Empleado ${name} añadido con ${jobs.length} registros!`;

  // Log updated data
  console.log("Empleado añadido:", salaries[salaries.length - 1]);
  console.log("Empresas actualizadas:", companies);
}

/*Clears add employee form*/

function clearAddEmployee() {
  inputEmployeeName.value = "";
  inputEmployeeYears.value = "";
  inputEmployeeCompanies.value = "";
  inputEmployeeSalaries.value = "";
  pResultAddEmployee.innerText = "";
}

/*---------EMPLOYEE MEDIAN---------*/

const inputMedianEmployee = document.querySelector(".js_medianEmployee");
const pResultEmployeeMedian = document.querySelector(
  ".js_pResultEmployeeMedian",
);
const btnCalculateEmployeeMedian = document.querySelector(
  ".js_calculateEmployeeMedian",
);
const btnClearEmployeeMedian = document.querySelector(
  ".js_clearEmployeeMedian",
);

btnCalculateEmployeeMedian.addEventListener("click", handleEmployeeMedian);
btnClearEmployeeMedian.addEventListener("click", clearEmployeeMedian);

/*Calculates employee median salary*/

function handleEmployeeMedian() {
  const employeeName = inputMedianEmployee.value.trim();

  if (!employeeName) {
    pResultEmployeeMedian.innerText = "Por favor, introduce el nombre";
    return;
  }

  const employee = findEmployee(employeeName);
  if (!employee) {
    pResultEmployeeMedian.innerText = `El empleado ${employeeName} no existe`;
    return;
  }

  const median = medianByEmployee(employeeName);
  pResultEmployeeMedian.innerText = `La mediana salarial de ${employeeName} es: ${median.toFixed(2)}`;
}

/*Clears employee median form*/

function clearEmployeeMedian() {
  inputMedianEmployee.value = "";
  pResultEmployeeMedian.innerText = "";
}

/*---------EMPLOYEE PROJECTION---------*/

const inputProjectionEmployee = document.querySelector(
  ".js_projectionEmployee",
);
const pResultEmployeeProjection = document.querySelector(
  ".js_pResultEmployeeProjection",
);
const btnCalculateEmployeeProjection = document.querySelector(
  ".js_calculateEmployeeProjection",
);
const btnClearEmployeeProjection = document.querySelector(
  ".js_clearEmployeeProjection",
);

btnCalculateEmployeeProjection.addEventListener(
  "click",
  handleEmployeeProjection,
);
btnClearEmployeeProjection.addEventListener("click", clearEmployeeProjection);

/*Calculates employee salary projection*/

function handleEmployeeProjection() {
  const employeeName = inputProjectionEmployee.value.trim();

  if (!employeeName) {
    pResultEmployeeProjection.innerText = "Por favor, introduce el nombre";
    return;
  }

  const employee = findEmployee(employeeName);
  if (!employee) {
    pResultEmployeeProjection.innerText = `El empleado ${employeeName} no existe`;
    return;
  }

  const projection = getEmployeeSalaryProjection(employeeName);

  if (projection === null) {
    pResultEmployeeProjection.innerText = `No se puede calcular la proyección de ${employeeName}. Se necesitan al menos 2 registros de salario históricos.`;
    return;
  }

  pResultEmployeeProjection.innerText = `La proyección salarial de ${employeeName} es: ${projection.toFixed(2)}`;
}

/*Clears employee projection form*/

function clearEmployeeProjection() {
  inputProjectionEmployee.value = "";
  pResultEmployeeProjection.innerText = "";
}

/*---------COMPANY MEDIAN---------*/

const inputCompanyName = document.querySelector(".js_companyName");
const inputCompanyYear = document.querySelector(".js_companyYear");
const pResultCompanyMedian = document.querySelector(".js_pResultCompanyMedian");
const btnCalculateCompanyMedian = document.querySelector(
  ".js_calculateCompanyMedian",
);
const btnClearCompanyMedian = document.querySelector(".js_clearCompanyMedian");

btnCalculateCompanyMedian.addEventListener("click", handleCompanyMedian);
btnClearCompanyMedian.addEventListener("click", clearCompanyMedian);

/*Calculates company median salary by year*/

function handleCompanyMedian() {
  const companyName = inputCompanyName.value.trim();
  const year = Number(inputCompanyYear.value);

  if (!companyName || !year) {
    pResultCompanyMedian.innerText = "Por favor, rellena ambos campos";
    return;
  }

  if (!companies[companyName]) {
    pResultCompanyMedian.innerText = `La empresa ${companyName} no existe`;
    return;
  }

  if (!companies[companyName][year]) {
    pResultCompanyMedian.innerText = `La empresa ${companyName} no tiene datos del año ${year}`;
    return;
  }

  const median = getMedianSalaryByCompanyAndYear(companyName, year);
  pResultCompanyMedian.innerText = `La mediana salarial de ${companyName} en ${year} es: ${median.toFixed(2)}`;
}

/*Clears company median form*/

function clearCompanyMedian() {
  inputCompanyName.value = "";
  inputCompanyYear.value = "";
  pResultCompanyMedian.innerText = "";
}

/*---------COMPANY PROJECTION---------*/

const inputProjectionCompany = document.querySelector(".js_projectionCompany");
const pResultCompanyProjection = document.querySelector(
  ".js_pResultCompanyProjection",
);
const btnCalculateCompanyProjection = document.querySelector(
  ".js_calculateCompanyProjection",
);
const btnClearCompanyProjection = document.querySelector(
  ".js_clearCompanyProjection",
);

btnCalculateCompanyProjection.addEventListener(
  "click",
  handleCompanyProjection,
);
btnClearCompanyProjection.addEventListener("click", clearCompanyProjection);

/*Calculates company salary projection*/

function handleCompanyProjection() {
  const companyName = inputProjectionCompany.value.trim();

  if (!companyName) {
    pResultCompanyProjection.innerText = "Por favor, introduce el nombre";
    return;
  }

  if (!companies[companyName]) {
    pResultCompanyProjection.innerText = `La empresa ${companyName} no existe`;
    return;
  }

  const projection = getCompanySalaryProjection(companyName);

  if (projection === null) {
    pResultCompanyProjection.innerText = `No se puede calcular la proyección de ${companyName}. Se necesitan al menos 2 años de datos históricos.`;
    return;
  }

  pResultCompanyProjection.innerText = `La proyección de mediana salarial de ${companyName} es: ${projection.toFixed(2)}`;
}

/*Clears company projection form*/

function clearCompanyProjection() {
  inputProjectionCompany.value = "";
  pResultCompanyProjection.innerText = "";
}

/*---------OVERALL MEDIAN---------*/

const pResultOverallMedian = document.querySelector(".js_pResultOverallMedian");
const btnCalculateOverallMedian = document.querySelector(
  ".js_calculateOverallMedian",
);

btnCalculateOverallMedian.addEventListener("click", handleOverallMedian);

/*Calculates overall median*/

function handleOverallMedian() {
  if (salaries.length === 0) {
    pResultOverallMedian.innerText = "No hay empleados en la base de datos";
    return;
  }

  const median = getOverallMedian();
  pResultOverallMedian.innerText = `La mediana general de todos los empleados es: ${median.toFixed(2)}`;
}

/*---------TOP 10% MEDIAN---------*/

const pResultTop10Median = document.querySelector(".js_pResultTop10Median");
const btnCalculateTop10Median = document.querySelector(
  ".js_calculateTop10Median",
);

btnCalculateTop10Median.addEventListener("click", handleTop10Median);

/*Calculates top 10% median*/

function handleTop10Median() {
  if (salaries.length === 0) {
    pResultTop10Median.innerText = "No hay empleados en la base de datos";
    return;
  }

  const median = getTop10EmployeeMedian();
  pResultTop10Median.innerText = `La mediana del top 10% de empleados es: ${median.toFixed(2)}`;
}

/*---------HELPER FUNCTIONS---------*/
