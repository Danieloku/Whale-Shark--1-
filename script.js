document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('loadFishImage').addEventListener('click', function() {
    fetch('https://fishpicrandomizerapi.p.rapidapi.com/api/fish-gen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '8516776ef9msh8aad61f886f847bp198716jsndcf8180efc5a',
        'X-RapidAPI-Host': 'fishpicrandomizerapi.p.rapidapi.com'
      },
      body: JSON.stringify({ type: 'fish' })
    })
    .then(response => response.json())
    .then(data => {
      // Suponiendo que 'image' es la clave en la respuesta que contiene la URL de la imagen.
      document.getElementById('randomFishImage').src = data.image;
      document.getElementById('randomFishImage').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
  });
});

document.getElementById