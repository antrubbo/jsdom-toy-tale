let addToy = false;
const whereToysLive = document.querySelector("div#toy-collection")
const toyFormContainer = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  addBtn.addEventListener("click", () => {
    toggleToyForm()
  });

  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => {
      json.forEach(toy => {
        renderToy(toy)
      })
    })

});

function toggleToyForm(){
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
}

function renderToy(toy){
  const newToy = document.createElement("div")
  const h2 = document.createElement("h2")
  h2.textContent = toy.name
  const img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")
  const p = document.createElement("p")
  p.textContent = `${toy.likes} Likes `
  const button = document.createElement("button")
  button.classList.add("like-btn")
  button.textContent = "Like <3"
  newToy.dataset.id = toy.id
  newToy.append(h2,img,p,button)
  newToy.classList.add("card")
  whereToysLive.append(newToy)
}

// -----------------------------------------------------

const toyForm = document.querySelector(".add-toy-form")

toyForm.addEventListener("submit", evt => {
  evt.preventDefault()

  const newToyObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: evt.target.name.value,
      image: evt.target.image.value,
      likes: 0
      })
  }

  fetch(" http://localhost:3000/toys", newToyObject)
    .then(resp => resp.json())
    .then(toy => {
      renderToy(toy)
    })
    evt.target.reset();
    toggleToyForm()
})

// -------------------------------------------------------



whereToysLive.addEventListener("click", evt => {
  evt.preventDefault()
  const parentObj = evt.target.parentElement
  const likesPtag = parentObj.querySelector("div.card p")
  const numOfLikes = parseInt(likesPtag.textContent) + 1
  const id = parentObj.dataset.id
  if(evt.target.matches("button.like-btn")){
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: numOfLikes
      })
    })
    .then(resp => resp.json())
    .then(json => {
      likesPtag.textContent = `${json.likes} Likes `
    })
  }
})






//  // make PATCH /posts/100 fetch request
//  const postDiv = event.target.closest("div.post");
//  const likesPtag = postDiv.querySelector(".likes-count");
//  const numOfLikes = parseInt(likesPtag.textContent) + 1;

//  const id = event.target.dataset.id;

//  fetch(`http://localhost:3000/posts/${id}`, {
//    method: "PATCH",
//    headers: {
//      "Content-Type": "application/json",
//    },
//    body: JSON.stringify({
//      likes: numOfLikes,
//    }),
//  })
//    .then((res) => res.json())
//    .then((updatedPost) => {
//      console.log(updatedPost);
//      // pessimists!
//      likesPtag.textContent = updatedPost.likes;
//    });

//  // and update the likes on the DOM
//  // optimists!
//  // likesPtag.textContent = numOfLikes;
// }