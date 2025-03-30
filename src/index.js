

// index.js

// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const name = document.querySelector('.name');
  const restaurant = document.querySelector('.restaurant');
  const ratingDisplay = document.querySelector('#rating-display');
  const commentDisplay = document.querySelector('#comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    const newRamen = {
      name,
      restaurant,
      image,
      rating,
      comment,
    };

    try {
      const response = await fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRamen),
      });

      if (response.ok) {
        const newRamenData = await response.json();
        displayRamens();
      } else {
        console.error('Failed to add new ramen');
      }
    } catch (error) {
      console.error('Error adding new ramen:', error);
    }
  });
};

const displayRamens = async () => {
  const ramenMenu = document.getElementById('ramen-menu');
  ramenMenu.innerHTML = '';

  try {
    const response = await fetch('http://localhost:3000/ramens');
    const ramens = await response.json();

    ramens.forEach((ramen) => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.classList.add('ramen-image');
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(img);
    });

    if (ramens.length > 0) {
      handleClick(ramens[0]);
    }
  } catch (error) {
    console.error('Failed to fetch ramen data:', error);
  }
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};