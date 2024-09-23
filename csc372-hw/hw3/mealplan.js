const recommendedDishesAddBtns = qsa('.add-btn');

let totalMealPlanCost = 0;

// Add click event to all recommended dishes Add button elements
for (let index = 0; index < recommendedDishesAddBtns.length; index++) {
    const addBtn = recommendedDishesAddBtns[index];
    addBtn.addEventListener('click', addToMealPlanAndCalculateTotal)
}

// Adds meal to meal plan with dollar amount, quantity, add more, and remove buttons
function addToMealPlanAndCalculateTotal(event) {
    const addBtn = event.currentTarget;
    const mealName = addBtn.dataset.name;
    const mealPrice = parseFloat(addBtn.dataset.price);

    const mealElement = isMealInPlanList(mealName)

    // If meal exists in meal plan, then update meal info otherwise add new meal to meal plan
    if (mealElement) {
        updateMealTotalPriceAndQuantity(mealElement, mealPrice);
    } else {
        addNewMeal(mealName, mealPrice);
    }

    updateTotal(mealPrice);
}

// Add new meal to meal plan
function addNewMeal(mealName, mealPrice) {
    const newMealElement = ce('li');
    newMealElement.dataset.name = mealName;
    newMealElement.innerHTML =
        `${mealName} - $<span id="total-meal-price">${mealPrice.toFixed(2)}</span> 
        (Quantity: <span id="quantity">1</span>)
        <button id="remove-meal-btn">Remove</button>
        <button id="add-more-btn">Add More</button>`;

    const mealPlanList = id('meal-plan-list');
    mealPlanList.appendChild(newMealElement);

    addMoreMealBtn(newMealElement);
    removeMealBtn(newMealElement);
}

// Add more meal button
function addMoreMealBtn(newMealElement) {
    const addMoreBtn = eqs(newMealElement, '#add-more-btn');

    addMoreBtn.addEventListener('click', function () {
        const totalMealPriceElement = eqs(newMealElement, '#total-meal-price');
        const totalMealPrice = totalMealPriceElement.textContent;
        const totalQuantityElement = eqs(newMealElement, '#quantity');
        const totalQuantity = totalQuantityElement.textContent;

        const newTotalMealPrice = parseFloat(totalMealPrice) / parseInt(totalQuantity);

        updateMealTotalPriceAndQuantity(newMealElement, newTotalMealPrice);
        updateTotal(newTotalMealPrice)
    });
}

// Add remove meal button
function removeMealBtn(newMealElement) {
    const removeMealBtn = eqs(newMealElement, '#remove-meal-btn');

    removeMealBtn.addEventListener('click', function () {
        const totalMealPriceElement = eqs(newMealElement, '#total-meal-price');
        const totalMealPrice = totalMealPriceElement.textContent;

        // When meal is removed, subtract total-meal-price from total-meal-plan-cost
        updateTotal(parseFloat(totalMealPrice) * (-1))
        newMealElement.remove()
    });
}

// Update total meal price and quantity for a specific meal
function updateMealTotalPriceAndQuantity(mealElement, mealPrice) {
    const quantityElement = eqs(mealElement, '#quantity');
    const quantity = parseInt(quantityElement.textContent) + 1;
    quantityElement.textContent = quantity;

    const totalMealPriceElement = eqs(mealElement, '#total-meal-price');
    totalMealPriceElement.textContent = (quantity * mealPrice).toFixed(2);
}

// Update overall total cost for the meal plan
function updateTotal(amount) {
    totalMealPlanCost += amount;
    const totalMealPlanCostElement = id('total-meal-plan-cost')
    totalMealPlanCostElement.textContent = totalMealPlanCost.toFixed(2);
}

// Check if meal exists in the meal plan
function isMealInPlanList(mealName) {
    const mealPlanList = id('meal-plan-list');
    for (let index = 0; index < mealPlanList.children.length; index++) {
        const meal = mealPlanList.children[index];
        if (mealName === meal.dataset.name) {
            return meal;
        }
    }
    return null;
}

/*
* Handy Shortcut Functions
*/

function id(id) {
    return document.getElementById(id);
}

function qs(selector) {
    return document.querySelector(selector);
}

function eqs(element, selector) {
    return element.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

function ce(element) {
    return document.createElement(element);
}
