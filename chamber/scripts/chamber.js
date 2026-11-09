
const url = "data/members.json";


const cardsContainer = document.querySelector("#cards");


async function getMemberData() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }


    const data = await response.json();

   
    displayMembers(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


const displayMembers = (members) => {
  cardsContainer.innerHTML = ""; // Clear existing content

  members.forEach((member) => {
   
    const card = document.createElement("section");
    card.classList.add("card");

   
    card.innerHTML = `
      <div class="card-header">
        <h2>${member.companyName}</h2>
        <p class="tagline">Level: ${member.membershipLevel}</p>
      </div>
      <div class="card-body">
        <img src="${member.companyLogoUrl}" alt="${member.companyName} logo" loading="lazy">
        <div class="card-info">
          <p><strong>ADDRESS:</strong> ${member.companyAddress}</p>
          <p><strong>PHONE:</strong> ${member.companyPhone}</p>
          <p><strong>URL:</strong> <a href="${member.companyWebsiteUrl}" target="_blank" rel="noopener noreferrer">${member.companyWebsiteUrl}</a></p>
        </div>
      </div>
    `;

    
    cardsContainer.appendChild(card);
  });
};


getMemberData();