async function fetchData() {
  const url = 'https://fish-species.p.rapidapi.com/fish_api/fishes';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8516776ef9msh8aad61f886f847bp198716jsndcf8180efc5a', 
      'X-RapidAPI-Host': 'fish-species.p.rapidapi.com'
    }
  };

try {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    const result = await response.json(); // Cambiado de .text() a .json()
    console.log(result);
    displayFishData(result); // Asegúrate de que esta función esté implementada correctamente
} catch (error) {
    console.error('Fetch error:', error);
}
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


// Asegúrate de llamar a fetchData cuando sea adecuado, por ejemplo, después de cargar la página
document.addEventListener('DOMContentLoaded', fetchData);
