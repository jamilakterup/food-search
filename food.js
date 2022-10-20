const loadMeals = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
    console.log(meals)
    const mealsContainer = document.getElementById('meal-container');
    mealsContainer.innerHTML = ``;
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col')
        mealDiv.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
                        </div>
                    </div>
        `;
        mealsContainer.appendChild(mealDiv)
        console.log(meal)
    })
}


const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log('klk', searchText)
    loadMeals(searchText);
    searchField.value = ''
}


const loadMealDetail = (idMeal) => {
    // console.log(idMeal)

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}


const displayMealDetail = meal => {
    console.log(meal)
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text">${meal.strInstructions}</p>
        </div>
    `;
    detailContainer.appendChild(div);
}


loadMeals('')