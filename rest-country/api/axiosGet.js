const searchInput = document.getElementById('searchInputId');
const continentDropdown = document.getElementById('dropdown-menu');
const continentSelect = document.getElementById('btnDrpdwn');
const cardContainer = document.getElementById('cardContainer');
const dataUrl = 'https://restcountries.com/v3.1/all';

// Ambil data dari file JSON menggunakan Axios
const getData = async () => {
  try {
    const response = await axios.get(dataUrl);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Render data dalam bentuk card
const renderData = (data) => {
  cardContainer.innerHTML = '';

  data.forEach((item) => {
    const card = `
      <div class="bg-slate-400 dark:bg-slate-700 rounded-md shadow-md">
        <img src="${item.flags.png}" alt="${item.name}" class="w-full h-40 object-cover rounded-t-md">
        <div class="p-4">
          <h2 class="text-xl text-white font-semibold">${item.name.common}</h2>
          <div class="data-list mt-3">
            
            <div class="flex data-opsional">
              <p class="text-white font-[500]">Population: </p>
              <p class="text-white font-[300] mx-2">${item.population}</p>
            </div>

            <div class="flex data-opsional">
              <p class="text-white font-[500]">Region: </p>
              <p class="text-white font-[300] mx-2">${item.region}</p>
            </div>

            <div class="flex data-opsional">
              <p class="text-white font-[500]">Sub Region: </p>
              <p class="text-white font-[300] mx-2">${item.subregion}</p>
            </div>

            <div class="flex data-opsional">
              <p class="text-white font-[500]">Capital: </p>
              <p class="text-white font-[300] mx-2">${item.capital}</p>
            </div>
            
          </div>
        </div>
      </div>
    `;
    cardContainer.innerHTML += card;
  });

  // Tambahkan event listener pada setiap tombol "View Details"
  const detailButtons = document.querySelectorAll('[data-country]');
  detailButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const countryCode = event.target.getAttribute('data-country');
      const country = data.find((item) => item.alpha3Code === countryCode);
      showCountryDetail(country);
    });
  });
};

//Sort By Benua
const continentOptions = document.querySelectorAll('#dropdown-menu li');
continentOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const continent = option.getAttribute('data-continent');
    sortCountriesByContinent(continent);
    continentSelect.continentOptions = option.continentOptions;
    document.getElementById("name-continent").innerHTML = continent;
  });
});

// Fungsi pencarian berdasarkan nama negara
const searchCountry = async (query) => {
  const data = await getData();

  const filteredData = data.filter((item) => {
    const name = item.name.common.toLowerCase();
    return name.includes(query.toLowerCase());
  });

  renderData(filteredData);
};

// Fungsi sortir berdasarkan benua
const sortCountriesByContinent = (continent) => {
  if (continent === 'all') {
    getData().then((data) => renderData(data));
  } else {
    getData().then((data) => {
      const filteredData = data.filter((item) => item.region === continent);
      renderData(filteredData);
    });
  }
};

// Fungsi menampilkan halaman detail negara
const showCountryDetail = (country) => {
  const detailPage = `
    <div class="container mx-auto py-10">
      <div class="flex justify-center">
        <div class="w-full max-w-md">
          <div class="bg-white rounded-md shadow-md">
            <img src="${country.flags.png}" alt="${country.name}" class="w-full h-40 object-cover rounded-t-md">
            <div class="p-4">
              <h2 class="text-xl font-semibold">${country.name}</h2>
              <p class="text-gray-600">${country.region}</p>
              <p class="text-gray-600">${country.subregion}</p>
              <p class="mt-4">Capital: ${country.capital}</p>
              <p>Population: ${country.population}</p>
              <p>Area: ${country.area}</p>
              <p>Timezones: ${country.timezones.join(', ')}</p>
              <p>Borders: ${country.borders.join(', ')}</p>
              <p>Currencies: ${country.currencies.map((currency) => currency.name).join(', ')}</p>
              <p>Languages: ${country.languages.map((language) => language.name).join(', ')}</p>
              <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onclick="goBack()">Go Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.innerHTML = detailPage;
};

// Fungsi kembali ke halaman utama
const goBack = () => {
  location.reload();
};

// Tambahkan event listener pada input pencarian
searchInput.addEventListener('input', (event) => {
  const query = event.target.value;
  searchCountry(query);
});


// Panggil fungsi renderData saat halaman dimuat
window.onload = async () => {
  const data = await getData();
  renderData(data);
};