document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const dogForm = document.getElementById('dog-form');
    let dogs = [];
  
    function renderDog(dog) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-id="${dog.id}">Edit</button></td>
      `;
      tableBody.appendChild(tr);
  
      const editButton = tr.querySelector('button');
      editButton.addEventListener('click', () => {
        dogForm.name.value = dog.name;
        dogForm.breed.value = dog.breed;
        dogForm.sex.value = dog.sex;
        dogForm.dataset.id = dog.id;
      });
    }
  
    function renderDogs() {
      tableBody.innerHTML = '';
      dogs.forEach(dog => renderDog(dog));
    }
  
    function fetchDogs() {
      fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(json => {
          dogs = json;
          renderDogs();
        });
    }
  
    function updateDog(event) {
      event.preventDefault();
      const id = dogForm.dataset.id;
      const name = dogForm.name.value;
      const breed = dogForm.breed.value;
      const sex = dogForm.sex.value;
      const dogData = { name, breed, sex };
      fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dogData)
      })
        .then(response => response.json())
        .then(json => {
          const updatedDogIndex = dogs.findIndex(dog => dog.id === json.id);
          dogs[updatedDogIndex] = json;
          renderDogs();
        });
    }
  
    fetchDogs();
    dogForm.addEventListener('submit', updateDog);
  });
  