const BASE_URL = 'http://localhost:5000/api';

// Handle form submission
$('.cupcake-form').on('submit', async function (e) {
  e.preventDefault();
  let formData = {
    flavor: $('#flavor').val(),
    size: $('#size').val(),
    rating: $('#rating').val(),
    image: $('#image').val(),
  }
  const res = await axios.post(`${BASE_URL}/cupcakes`, formData)

  const newCupcake = $(generateCupcakeHTML(res.data.cupcake));
  $('.cupcakes-list').append(newCupcake);
  $('.cupcake-form').trigger('reset');
});

// Create html from form data
function generateCupcakeHTML (cupcake) {
  return `
    <div data-cupcake-id=${cupcake.id} "class="card" style="width: 18rem;">
      <img class="cupcake-img card-img-top"
          src="${cupcake.image}"
          alt="image">
      <div class="card-body border border-secondary">
        <h5 class="card-title mt-2">${cupcake.flavor}</h5>
        <p class="card-text">Size - ${cupcake.size}</p>
        <p class="card-text">Rating - ${cupcake.rating}</p>
        <button class="delete-button btn btn-danger">Remove</button>
      </div>
    </div>
  `;
}

// handle clicking delete: delete cupcake

$('.cupcakes-list').on('click', '.delete-button', async function (e) {
  e.preventDefault();
  let $cupcake = $(e.target).closest('div');
  let cupcakeId = $cupcake.attr('data-cupcake-id');

  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $cupcake.remove();
});


// Load existing cupcakes on page

async function loadExistingCupcakes () {
  const res = await axios.get(`${BASE_URL}/cupcakes`);

  for (let cupcakeData of res.data.cupcakes) {
    let newCupcake = $(generateCupcakeHTML(cupcakeData));
    $('.cupcakes-list').append(newCupcake);
  }
}

$(loadExistingCupcakes);



