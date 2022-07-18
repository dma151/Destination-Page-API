// const form = document.querySelector("#user")
const editButton = document.querySelector(".edit")
const deleteButton = document.querySelector(".delete")
// const destinationInput = document.getElementById("destination");
// const locationInput = document.getElementById("location");
// const descriptionInput = document.getElementById("description");

form.addEventListener('submit', async () => {
    const imageSrc = await findImage()
    const call = await fetch('http://localhost:3000/new', {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            name: destinationInput.value,
            location: locationInput.value,
            url: imageSrc,
            description: descriptionInput.value
        })
    })
    const reload = window.location.reload(true);

    destinationInput.value = "";
    locationInput.value = "";
    descriptionInput.value = "";
})

editButton.addEventListener('click', _ => {
    const name = prompt("Enter new name");
    const location = prompt("Enter new location");
    const description = prompt("Enter new description");
    let newName;
    let newLocation;
    let newDescription;
    if (name != "") {
        newName = name
    } else {
        newName = e.target.parentElement.querySelector(".cardHeader").innerText
    }
    if (location != "") {
        newLocation = location
    } else {
        newLocation = e.target.parentElement.querySelector(".cardLocation").innerText
    }
    if (description != "") {
        newDescription = description
    } else {
        newDescription = e.target.parentElement.querySelector(".cardDescription").innerText
    }

    const selected = e.target.parentElement.getAttribute('id');
    fetch(`http://localhost:3000/edit/${selected}`, {
        method: 'put',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            name: newName,
            location: newLocation,
            url: e.target.parentElement.querySelector(".cardImage").innerTexte,
            description: newDescription
        })
    })
        .then(response => window.location.reload(true))
        .catch(e => console.error(e))
})

deleteButton.addEventListener('click', e => {
    const selected = e.target.parentElement.getAttribute('id')
    console.log(selected);
    fetch(`http://localhost:3000/remove/${selected}`, {
        method: 'delete'
    })
        .then(response => window.location.reload(true))
        .catch(e => console.error(e))
})

function findImage () {
    const apiKey = "IamxVhyO4gKPFbijEFVv3NQRN7EkQ7T6AngMOVTfBes"
    const makeApiCall = async () => {
        const res = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${destinationInput.value} ${locationInput.value}&client_id=${apiKey}`)
        const json = await res.json();
        return json.results[0].urls.small
    }
    const url = makeApiCall();
    return url
}