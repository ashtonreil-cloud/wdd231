const url = "data/members.json"; // Relative path to chamber/data/members.json
const cardsContainer = document.querySelector("#cards");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getCompaniesData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const companies = Array.isArray(data) ? data : data.companies;
    displayCompanies(companies);
  } catch (error) {
    console.error("Error fetching companies data:", error);
  }
}

const displayCompanies = (companies) => {
  cardsContainer.innerHTML = "";

  companies.forEach((company) => {
    let card = document.createElement("section");
    card.classList.add("card");

    const name = company.companyName || company.name;
    const level = company.membershipLevel || company.level;
    const logo = company.companyLogoUrl || company.image;
    const address = company.companyAddress || company.address;
    const phone = company.companyPhone || company.phone;
    const website = company.companyWebsiteUrl || company.website;

    card.innerHTML = `
      <div class="card-header">
        <h2>${name}</h2>
        <p class="tagline">Level: ${level}</p>
      </div>
      <div class="card-body">
        <img src="${logo}" alt="${name} logo" loading="lazy">
        <div class="card-info">
          <p><strong>ADDRESS:</strong> ${address}</p>
          <p><strong>PHONE:</strong> ${phone}</p>
          <p><strong>URL:</strong> <a href="${website}" target="_blank" rel="noopener noreferrer">${website}</a></p>
        </div>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
};

if (gridButton && listButton) {
  gridButton.addEventListener("click", () => {
    cardsContainer.classList.add("grid");
    cardsContainer.classList.remove("list");
  });

  listButton.addEventListener("click", () => {
    cardsContainer.classList.add("list");
    cardsContainer.classList.remove("grid");
  });
}

getCompaniesData();