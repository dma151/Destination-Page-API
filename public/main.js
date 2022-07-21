// const form = document.querySelector("#user")
const editButtons = document.querySelectorAll(".edit");
const deleteButtons = document.querySelectorAll(".delete");
const detailsButtons = document.querySelectorAll(".details");
// const destinationInput = document.getElementById("destination");
// const locationInput = document.getElementById("location");
// const descriptionInput = document.getElementById("description");

form.addEventListener("submit", async () => {
  const imageSrc = await findImage();
  const call = await fetch("http://localhost:3000/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: destinationInput.value,
      location: locationInput.value,
      url: imageSrc,
      description: descriptionInput.value,
    }),
  });
  const reload = window.location.reload(true);

  destinationInput.value = "";
  locationInput.value = "";
  descriptionInput.value = "";
});

for (let i = 0; i < editButtons.length; i++) {
  editButtons[i].addEventListener("click", async () => {
    const name = prompt("Enter new name");
    const location = prompt("Enter new location");
    const description = prompt("Enter new description");
    let newName;
    let newLocation;
    let newDescription;
    if (name != "") {
      newName = name;
    } else {
      newName = e.target.parentElement.querySelector(".cardHeader").innerText;
    }
    if (location != "") {
      newLocation = location;
    } else {
      newLocation =
        e.target.parentElement.querySelector(".cardLocation").innerText;
    }
    if (description != "") {
      newDescription = description;
    } else {
      newDescription =
        e.target.parentElement.querySelector(".cardDescription").innerText;
    }

    const selected = e.target.parentElement.getAttribute("id");
    const imageUrl = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${newName} ${newLocation}&client_id=${apiKey}`
    );

    const call = await fetch(`http://localhost:3000/edit/${selected}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName,
        location: newLocation,
        url: imageUrl,
        description: newDescription,
      }),
    });
    const reload = window.location.reload(true);
  });
}

for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", async () => {
    const selected = e.target.parentElement.getAttribute("id");
    console.log(selected);
    const call = await fetch(`http://localhost:3000/remove/${selected}`, {
      method: "delete",
    });
    const reload = window.location.reload(true);
  });
}

for (let i = 0; i < detailsButtons.length; i++) {
  detailsButtons[i].addEventListener("click", async () => {
    window.open("http://localhost:3000/details", "_blank");
  });
}

function findImage() {
  const apiKey = "IamxVhyO4gKPFbijEFVv3NQRN7EkQ7T6AngMOVTfBes";
  const makeApiCall = async () => {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${destinationInput.value} ${locationInput.value}&client_id=${apiKey}`
    );
    const json = await res.json();
    return json.results[0].urls.small;
  };
  const url = makeApiCall();
  return url;
}
