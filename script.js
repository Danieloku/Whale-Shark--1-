let allFishes = [];

async function fetchData() {
  const url = 'https://fish-species.p.rapidapi.com/fish_api/fishes';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8516776ef9msh8aad61f886f847bp198716jsndcf8180efc5a', 
      'X-RapidAPI-Host': 'fish-species.p.rapidapi.com'
    }
  };

  if (allFishes.length === 0) { 
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      allFishes = await response.json(); // Almacena todos los peces
      displayRandomFishes(); // Muestra peces aleatorios
    } catch (error) {
      console.error('Fetch error:', error);
    }
  } else {
    displayRandomFishes(); // Ya tienes los peces, muestra aleatorios
  }
}

function displayRandomFishes() {
  const randomFishes = pickRandomFishes(allFishes, 4); // Selecciona 4 peces aleatoriamente
  displayFishData(randomFishes); // Muestra esos peces
}

function pickRandomFishes(fishes, count) {
  const shuffled = fishes.sort(() => 0.5 - Math.random()); // Mezcla el array
  return shuffled.slice(0, count); // Toma los primeros 'count' elementos
}

function displayFishData(data) {
  const container = document.getElementById('fishContainer');
  container.innerHTML = ''; // Limpiar el contenedor

  // Asumiendo que 'data' es un arreglo con la estructura correcta
  data.forEach((fish, index) => {
    // Crear un contenedor para cada pez
    const fishDiv = document.createElement('div');
    fishDiv.className = 'fish-info';
    
    // Elegir una imagen (por ejemplo, la versión de alta resolución)
    const imageUrl = fish.img_src_set['2x'] || fish.img_src_set['1.5x'];

    // Construir el contenido con los datos de la API
    fishDiv.innerHTML = `
      <h3>${fish.name}</h3>
      <img src="${imageUrl}" alt="${fish.name}" class="img-fluid">
      <p>Estado de conservación: ${fish.meta.conservation_status}</p>
      <p>Nombre científico: ${fish.meta.scientific_classification.binomial_name}</p>
      <p>Clasificación: ${fish.meta.scientific_classification.kingdom} > 
                        ${fish.meta.scientific_classification.phylum} > 
                        ${fish.meta.scientific_classification.class} > 
                        ${fish.meta.scientific_classification.order} > 
                        ${fish.meta.scientific_classification.family} > 
                        ${fish.meta.scientific_classification.genus} > 
                        ${fish.meta.scientific_classification.species}</p>
      <a href="${fish.url}" target="_blank" rel="noopener noreferrer">Leer más en Wikipedia</a>
    `;

    // Añadir el contenedor del pez al contenedor principal
    container.appendChild(fishDiv);

    // Si quieres agregar un separador entre elementos
    if (index < data.length - 1) {
      const separator = document.createElement('hr');
      container.appendChild(separator);
    }
  });
}


document.addEventListener('DOMContentLoaded', fetchData);
document.getElementById('loadRandomFishes').addEventListener('click', fetchData);

