"use strict";

// Load employees from localStorage or use default employees
const defaultSalaries = [
  {
    name: "Juanita",
    jobs: [
      { year: 2018, company: "Freelance", salary: 250 },
      { year: 2019, company: "Freelance", salary: 250 },
      { year: 2020, company: "Mokepon Industries", salary: 850 },
      { year: 2021, company: "Mokepon Industries", salary: 1050 },
      { year: 2022, company: "Mokepon Industries", salary: 1250 },
      { year: 2023, company: "Mokepon Industries", salary: 1250 },
    ],
  },
  {
    name: "Alex",
    jobs: [
      { year: 2018, company: "Freelance", salary: 450 },
      { year: 2019, company: "Freelance", salary: 550 },
      { year: 2020, company: "Freelance", salary: 400 },
      { year: 2021, company: "Mokepon Industries", salary: 1050 },
      { year: 2022, company: "Mokepon Industries", salary: 1250 },
      { year: 2023, company: "Mokepon Industries", salary: 1250 },
    ],
  },
  {
    name: "Nath",
    jobs: [
      { year: 2018, company: "Freelance", salary: 600 },
      { year: 2019, company: "Freelance", salary: 625 },
      { year: 2020, company: "Freelance", salary: 575 },
      { year: 2021, company: "MarketerosCOL", salary: 1000 },
      { year: 2022, company: "MarketerosCOL", salary: 1000 },
      { year: 2023, company: "MarketerosCOL", salary: 1100 },
    ],
  },
  {
    name: "Julia",
    jobs: [
      { year: 2018, company: "MarketerosCOL", salary: 1000 },
      { year: 2019, company: "MarketerosCOL", salary: 2000 },
      { year: 2020, company: "MarketerosCOL", salary: 2000 },
      { year: 2021, company: "MarketerosCOL", salary: 2000 },
      { year: 2022, company: "MarketerosCOL", salary: 2000 },
      { year: 2023, company: "MarketerosCOL", salary: 2000 },
    ],
  },
  {
    name: "Jonatan",
    jobs: [
      { year: 2019, company: "MarketerosCOL", salary: 1000 },
      { year: 2020, company: "MarketerosCOL", salary: 1000 },
      { year: 2021, company: "MarketerosCOL", salary: 800 },
      { year: 2022, company: "MarketerosCOL", salary: 900 },
      { year: 2023, company: "MarketerosCOL", salary: 1000 },
    ],
  },
  {
    name: "Armando",
    jobs: [
      { year: 2018, company: "Freelance", salary: 750 },
      { year: 2019, company: "Freelance", salary: 750 },
      { year: 2020, company: "Freelance", salary: 750 },
      { year: 2021, company: "Freelance", salary: 850 },
      { year: 2022, company: "Freelance", salary: 850 },
      { year: 2023, company: "Freelance", salary: 850 },
    ],
  },
  {
    name: "Dilan",
    jobs: [
      { year: 2018, company: "Freelance", salary: 500 },
      { year: 2019, company: "Freelance", salary: 500 },
      { year: 2020, company: "Freelance", salary: 600 },
      { year: 2021, company: "Mokepon", salary: 1100 },
      { year: 2022, company: "Mokepon", salary: 1100 },
      { year: 2023, company: "Mokepon", salary: 1100 },
    ],
  },
  {
    name: "Zamir",
    jobs: [
      { year: 2018, company: "Freelance", salary: 400 },
      { year: 2019, company: "Freelance", salary: 500 },
      { year: 2020, company: "Freelance", salary: 500 },
      { year: 2021, company: "Mokepon", salary: 1100 },
      { year: 2022, company: "Mokepon", salary: 1100 },
      { year: 2023, company: "Mokepon", salary: 1200 },
    ],
  },
  {
    name: "Daniela",
    jobs: [
      { year: 2018, company: "Freelance", salary: 500 },
      { year: 2019, company: "Freelance", salary: 500 },
      { year: 2020, company: "Freelance", salary: 500 },
      { year: 2021, company: "Freelance", salary: 550 },
      { year: 2022, company: "Freelance", salary: 550 },
      { year: 2023, company: "MarketerosCOL", salary: 850 },
    ],
  },
  {
    name: "Daniel",
    jobs: [
      { year: 2020, company: "Freelance", salary: 150 },
      { year: 2021, company: "Freelance", salary: 450 },
      { year: 2022, company: "Freelance", salary: 550 },
      { year: 2023, company: "Freelance", salary: 650 },
    ],
  },
  {
    name: "Rigoberto",
    jobs: [
      { year: 2018, company: "MarketerosCOL", salary: 700 },
      { year: 2019, company: "MarketerosCOL", salary: 700 },
      { year: 2020, company: "MarketerosCOL", salary: 700 },
      { year: 2021, company: "MarketerosCOL", salary: 750 },
      { year: 2022, company: "MarketerosCOL", salary: 750 },
      { year: 2023, company: "MarketerosCOL", salary: 750 },
    ],
  },
  {
    name: "Alicia",
    jobs: [
      { year: 2018, company: "Inversionify", salary: 300 },
      { year: 2019, company: "Inversionify", salary: 1700 },
      { year: 2020, company: "Inversionify", salary: 2700 },
      { year: 2021, company: "Inversionify", salary: 3750 },
      { year: 2022, company: "Freelance", salary: 1550 },
      { year: 2023, company: "Freelance", salary: 350 },
    ],
  },
  {
    name: "Teodoro",
    jobs: [
      { year: 2018, company: "Freelance", salary: 600 },
      { year: 2019, company: "Freelance", salary: 700 },
      { year: 2020, company: "Inversionify", salary: 1700 },
      { year: 2021, company: "Inversionify", salary: 1750 },
      { year: 2022, company: "Freelance", salary: 800 },
      { year: 2023, company: "Freelance", salary: 850 },
    ],
  },
  {
    name: "Bruce",
    jobs: [
      { year: 2018, company: "Wayne Enterprises", salary: 4600 },
      { year: 2019, company: "Wayne Enterprises", salary: 4700 },
      { year: 2020, company: "Wayne Enterprises", salary: 3700 },
      { year: 2021, company: "Wayne Enterprises", salary: 4150 },
      { year: 2022, company: "Wayne Enterprises", salary: 4400 },
      { year: 2023, company: "Wayne Enterprises", salary: 3850 },
    ],
  },
  {
    name: "Alfred",
    jobs: [
      { year: 2018, company: "Wayne Enterprises", salary: 2000 },
      { year: 2019, company: "Wayne Enterprises", salary: 2000 },
      { year: 2020, company: "Wayne Enterprises", salary: 1500 },
      { year: 2021, company: "Wayne Enterprises", salary: 1500 },
      { year: 2022, company: "Wayne Enterprises", salary: 2000 },
      { year: 2023, company: "Wayne Enterprises", salary: 1500 },
    ],
  },
  {
    name: "Clark Kent",
    jobs: [
      { year: 2018, company: "Daily Planet", salary: 1000 },
      { year: 2019, company: "Daily Planet", salary: 1500 },
      { year: 2020, company: "Daily Planet", salary: 1000 },
      { year: 2021, company: "Daily Planet", salary: 1500 },
      { year: 2022, company: "Daily Planet", salary: 2000 },
      { year: 2023, company: "Daily Planet", salary: 1500 },
    ],
  },
  {
    name: "Lois Lane",
    jobs: [
      { year: 2018, company: "Daily Planet", salary: 2000 },
      { year: 2019, company: "Daily Planet", salary: 2500 },
      { year: 2020, company: "Daily Planet", salary: 2000 },
      { year: 2021, company: "Daily Planet", salary: 2500 },
      { year: 2022, company: "Daily Planet", salary: 2500 },
      { year: 2023, company: "Daily Planet", salary: 2500 },
    ],
  },
  {
    name: "Jimmy Olsen",
    jobs: [
      { year: 2018, company: "Daily Planet", salary: 1500 },
      { year: 2019, company: "Daily Planet", salary: 2000 },
      { year: 2020, company: "Daily Planet", salary: 2000 },
      { year: 2021, company: "Daily Planet", salary: 2500 },
      { year: 2022, company: "Daily Planet", salary: 2500 },
      { year: 2023, company: "Daily Planet", salary: 1500 },
    ],
  },
  {
    name: "Perry White",
    jobs: [
      { year: 2018, company: "Daily Planet", salary: 3500 },
      { year: 2019, company: "Daily Planet", salary: 3700 },
      { year: 2020, company: "Daily Planet", salary: 3800 },
      { year: 2021, company: "Daily Planet", salary: 4000 },
      { year: 2022, company: "Daily Planet", salary: 4050 },
      { year: 2023, company: "Daily Planet", salary: 4050 },
    ],
  },
  {
    name: "Lex Luthor",
    jobs: [
      { year: 2018, company: "LexCorp", salary: 5000 },
      { year: 2019, company: "LexCorp", salary: 5300 },
      { year: 2020, company: "LexCorp", salary: 4000 },
      { year: 2021, company: "LexCorp", salary: 3000 },
      { year: 2022, company: "LexCorp", salary: 3500 },
      { year: 2023, company: "LexCorp", salary: 3050 },
    ],
  },
];

let salaries = [];

// Try to load employees from localStorage
const savedSalaries = localStorage.getItem("mathlab_salaries");
if (savedSalaries) {
  salaries = JSON.parse(savedSalaries);
} else {
  // If there are no saved employees, use the default ones
  salaries = [...defaultSalaries];
  localStorage.setItem("mathlab_salaries", JSON.stringify(salaries));
}

// Log available employees and companies
console.group("Empleados Disponibles");
salaries.forEach((employee) => {
  console.log(`${employee.name} (${employee.jobs.length} registros)`);
});
console.groupEnd();

const availableCompanies = new Set();
salaries.forEach((employee) => {
  employee.jobs.forEach((job) => {
    availableCompanies.add(job.company);
  });
});

console.group("Empresas Disponibles");
Array.from(availableCompanies)
  .sort()
  .forEach((company) => {
    console.log(company);
  });
console.groupEnd();
