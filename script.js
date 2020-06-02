const submit = document.getElementById("submit"),
  search = document.getElementById("search"),
  random = document.getElementById("random"),
  resultHeading = document.querySelector(".result-heading"),
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
        resultHeading.innerHTML = `<h2>Search results for '${term}':<h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>Nothing Found for '${term}'<h2>`;
        } else {
          mealEl.innerHTML = data.meals
            .map((meal) => {
              return `<div class='meal'>
            <img src ='${meal.strMealThumb}'  alt='${meal.strMeal}'/ >
            <div class='meal-info' data-mealID ='${meal.idMeal}'>
            <h3>${meal.strMeal}</h3>
         </div>
        </div>
            `;
            })
            .join("");
        }
      });
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
    window.location.reload(true);
  }, 2000);
}

//Event listeners
submit.addEventListener("submit", searchMeal);
