let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  }), fetchAllToys()
});

const allToysInfo = 'http://localhost:3000/toys'
const toyCollection = document.getElementById('toy-collection')
const newToyButton = document.getElementById('new-toy-btn')

function fetchAllToys() {
  return fetch(allToysInfo)
    .then(resp => resp.json())
    .then(data => renderCards(data))
}

function renderCards(toysArray) {
  // debugger;
  toysArray.forEach(function (obj) {
    const newDiv = document.createElement('div')
    newDiv.className = "card"
    // console.log(newDiv)
    newDiv.innerHTML = ""
    const h2 = document.createElement('h2')
    h2.innerHTML = obj.name
    newDiv.appendChild(h2)
    const img = document.createElement('img')
    img.className = "toy-avatar"
    img.src = obj.image
    newDiv.appendChild(img)
    const p = document.createElement('p')
    p.innerHTML = obj.likes + ' Likes'
    newDiv.appendChild(p)
    const button = document.createElement('button')
    button.className = "like-btn"
    button.id = obj.id
    button.innerHTML = "Like"
    newDiv.appendChild(button)
    toyCollection.appendChild(newDiv)
  })

  const form = document.forms[0]

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputObj = {
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 0
    };

    const configurationObject = {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify(inputObj)
    }
    fetch("http://localhost:3000/toys", configurationObject)
      .then(resp => resp.json())
      .then(data => renderCards([data]))
      .catch(function (error) {
        const alertMessage = error.message
        document.body.innerHTML = alertMessage
    })
  });
  
};

// const h2 = document.createElement('h2')
// h2.innerHTML = obj.name
// const img = document.createElement('img')
// img.src = obj.image
// const p = document.createElement('p')
// p.innerHTML = obj.likes
// const button = document.createElement('button')
// button.className = "like-btn"
// button.id = obj.id
// button.innerHTML = "Like"
// newDiv.appendChild(button)



  // li.addEventListener("DOMContentLoaded", () => {
//     let randomColorNumber = Math.floor(Math.random()*16777215).toString(16);
//     let randomColor= `#${randomColorNumber}`
//     background.style.color = randomColor