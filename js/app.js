const loadData = (searchText, dataLimit) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data => displayUi(data.data, dataLimit));
}

const displayUi = (phones, dataLimit) => {
    const parentDiv = document.getElementById('phone-container');
    parentDiv.innerHTML = '';
    const showAllBtn = document.getElementById('show-section');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAllBtn.classList.remove('d-none')
    } else {
        showAllBtn.classList.add('d-none')
    }
    const noFound = document.getElementById('no-found');
    if (phones.length === 0) {
        noFound.classList.remove('d-none')
    } else {
        noFound.classList.add('d-none')
    }
    phones.forEach(phone => {
        const createDiv = document.createElement('div');
        createDiv.classList.add('col');
        createDiv.innerHTML = `
        <div class="card p-5 shadow ">
        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button href="#" onclick="loadDetails('${phone.slug}')" class="btn btn-warning text-center text-white" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show All</button>
                
            </div>
    </div>
        `;
        parentDiv.appendChild(createDiv);
    });
    toggleSpinner(false);

}

const SearchData = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search');
    const searchText = searchField.value;
    loadData(searchText, dataLimit);
}

document.getElementById('search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        SearchData(10);
    }
})

document.getElementById('btn').addEventListener('click', () => {
    SearchData(10);

})

document.getElementById('show-all-btn').addEventListener('click', () => {
    SearchData();
})

const loadDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json()
    displayphoneDetails(data.data)
}

const displayphoneDetails = phoneDetails => {
    const phoneTitle = document.getElementById('phoneDetailsModalLabel');
    phoneTitle.innerText = phoneDetails.name;
    const phoneDesc = document.getElementById('phone-desc');
    phoneDesc.innerHTML = `
        <p>Relase Date : ${phoneDetails.releaseDate ? phoneDetails.releaseDate : 'No Relase Date Found'}</p>
        <p>Storage : ${phoneDetails.mainFeatures ? phoneDetails.mainFeatures.storage : 'No Storage  Found'}</p>
    `

}

const toggleSpinner = isLoading => {
    const loadingSection = document.getElementById('loader');
    if (isLoading) {
        loadingSection.classList.remove('d-none')
    } else {
        loadingSection.classList.add('d-none')
    }
}

loadData('apple');