"use strict";

const API_KEY = "908e0604-8ed0-4407-9f7e-1cba79d6ac8b";
const form = document.getElementById("form__search");
const uploadRecipeForm = document.getElementById("form__upload-recipe");
const table = document.getElementsByClassName("table")[0];
const tbody = table.getElementsByTagName("tbody")[0];
const btnOpenModal = document.getElementsByClassName("btn-open-modal")[0];
const btnCloseModal = document.getElementsByClassName("btn-close-modal")[0];
const modal = document.getElementsByClassName("modal")[0];

async function getRecipes(food) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${food}`
    );
    const json = await res.json();

    return json.recipes;
  } catch (err) {
    throw err;
  }
}

async function displayRecipes(food = "pizza") {
  try {
    tbody.innerHTML = generateSpinnerMarkup();

    const recipes = await getRecipes(food);

    const markup = recipes.map(generateRecipeMarkup).join("");

    tbody.innerHTML = markup;
  } catch (err) {
    tbody.innerHTML = generateErrorMarkup(food);
  }
}

function generateRecipeMarkup(recipe) {
  return `
    <tr>
        <td>
        <img src="${recipe.image_url}" />
        </td>

        <td>
        ${recipe.title}
        </td>

        <td>
        ${recipe.publisher}
        </td>
    </tr>
    `;
}

function uploadRecipe(data) {
  fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
    });
}

function generateSpinnerMarkup() {
  return `
    <tr>
      <td colspan="3" class="loader">
        <span></span>
      </td>
    </tr>
  `;
}

function generateErrorMarkup(food) {
  return `
    <tr>
      <td colspan="3">
        There are no recipes available for ${food}
      </td>
    </tr>
  `;
}

function toggleModal() {
  modal.classList.toggle("hidden");

  return null;
}

window.addEventListener("DOMContentLoaded", () => displayRecipes());
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const { query } = Object.fromEntries([...new FormData(e.currentTarget)]);

  displayRecipes(query);
});

uploadRecipeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries([...new FormData(e.currentTarget)]);

  uploadRecipe(data);
});

[btnOpenModal, btnCloseModal].forEach((btnElement) => {
  btnElement.addEventListener("click", toggleModal);
});
