const submit = document.getElementById("submit"),
  search = document.getElementById("search"),
  random = document.getElementById("random"),
  resultHeading = document.getElementById("result-heading"),
  mealEl = document.getElementById("meals"),
  singleMealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();

  singleMealEl.innerHTML = "";
  const term = search.value;
  //   console.log(term);
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term.toUpperCase()}':<h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>Nothing Found for '${term.toUpperCase()}'<h2>`;
          mealEl.innerHTML = "";
        } else {
          mealEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class='meal'>
            <img src ='${meal.strMealThumb}' alt='${meal.strMeal}'/ >
            <div class='meal-info' data-mealID ='${meal.idMeal}'>
            <h3>${meal.strMeal}</h3>
         </div>
        </div>
            `
            )
            .join("");
        }
      });
    //clear search text.
    search.value = "";
  } else {
    const div = document.createElement("div");
    div.className = `alert`;
    div.appendChild(document.createTextNode("Please type in a food name"));
    const container = document.querySelector(".container");
    const before = document.querySelector(".flex");
    container.insertBefore(div, before);
    timeOut();
  }
}

function timeOut() {
  setTimeout(() => {
    clearAlert();
    // window.location.reload(true);
  }, 2000);
}

function clearAlert() {
  const currentAlert = document.querySelector(".alert");
  if (currentAlert) {
    currentAlert.remove();
  }
}

//fetch meal by id function
function getMealById(meal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}

function addMealToDom(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMealEl.innerHTML = `
  <div class='single-meal'>
  <h1>${meal.strMeal}</h1>
  <img src='${meal.strMealThumb}' alt ='${meal.strMeal}'/>
  <div class='single-meal-info'>
${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
${meal.strCategory ? `<p>${meal.strArea}</p>` : ""}
  </div>

  <div class='main'>
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ol>
  ${ingredients
    .map(
      (ingre) => `
    <li>${ingre}</li>
  `
    )
    .join("")}
  </ol>
  </div>
  </div>
  `;
}

function getRandomMeal() {
  mealEl.innerHTML = "";
  resultHeading.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}

//Event listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);
mealEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealid");
    getMealById(mealId);
  }
});
