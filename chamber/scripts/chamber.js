const url = "chamber/data/members.json";
const cardsContainer = document.querySelector("#directory-cards");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

async function getCompaniesData() {
    try {
        const response = await fetch(url);  
        const data = await response.json();
        displayCompanies(data.companies);
        displayCompanies(data.companies);

}catch (error) {
        console.error("Error fetching companies data:", error);
    }      
}
const displayCompanies = (companies) => {
    cardsContainer.innerHTML = "";
      companies.forEach((company) => {
        let card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-header">
                <h2>${company.name}</h2>
                <p class="tagline">Level: ${company.membershipLevel}</p>
            </div>
            <div class="card-body">
                <img src="images/${company.image}" alt="${company.name}" loading="lazy">
                <div class="card-info">
                    <p><strong>ADDRESS:</strong> ${company.address}</p>
                    <p><strong>PHONE:</strong> ${company.phone}</p>
                    <p><strong>URL:</strong> <a href="${company.website}" target="_blank" rel="noopener noreferrer">${company.website}</a></p>
                    <p><strong>Category:</strong> ${company.category}</p>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
};

gridButton.addEventListener("click", () => {
    cardsContainer.classList.add("grid");
    cardsContainer.classList.remove("list");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    cardsContainer.classList.add("list");
    cardsContainer.classList.remove("grid");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

getCompaniesData();
