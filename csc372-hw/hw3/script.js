const gallary = qsa('.image');

// Add click event to all image elements
for (let index = 0; index < gallary.length; index++) {
  const element = gallary[index];
  element.addEventListener('click', expand)
}

// Expand clicked image
function expand(event) {
  const smallImage = event.currentTarget;
  const bigImage = qs('.big');
  if (bigImage) {
    bigImage.classList.remove('big');

    // Hide all dish descriptions
    const dishDescription = bigImage.querySelector('.dish-desc');
    if (dishDescription) {
      dishDescription.classList.add('hide');
    }
  }

  // Add big style to clicked image
  smallImage.classList.add('big');

  // Display the dish description
  const dishDescription = smallImage.querySelector('.dish-desc');
  dishDescription.classList.remove('hide');
}

/*
* Handy Shortcut Functions
*/

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}
