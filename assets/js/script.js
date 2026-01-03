const getProducts = async () => {
  const response = await axios.get(`https://dummyjson.com/products`);
  return response.data;
};

// display Bestsellers
displayBestsellers = async () => {
  const result = await getProducts();
  const lowestProduct = result.products.reduce((min, product) => {
    return product.price < min.price ? product : min;
  });
  document.querySelector(".bestsellers").innerHTML = `
  <img src="${lowestProduct.thumbnail}" alt="${lowestProduct.title}" class="bestSellers-image w-100 h-100 object-fit-cover rounded-5">
  `;
};
displayBestsellers();

// categories swiper
const swiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 15,
  freeMode: true,
  grabCursor: true,

  keyboard: {
    enabled: true,
  },
});

// display Catigories
displayCatigories = async () => {
  const result = await axios.get(
    `https://dummyjson.com/products/category-list`
  );
  const categories =
    `
    <div class="swiper-slide">
      <button class="nav-link active p-2 rounded-5" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onclick="filterByCategory(null)">All Categories</button>
    </div>
  ` +
    result.data
      .map((category) => {
        return `
      <div class="swiper-slide">
        <button class="nav-link  p-2 rounded-5" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onclick="filterByCategory('${category}')">${category}</button>
      </div>
    `;
      })
      .join("");
  document.querySelector(".swiper .swiper-wrapper").innerHTML = categories;
  swiper.update();
};

// display all products
const displayallproducts = async () => {  
  const result = await getProducts();
  const numberOfPages = Math.ceil(result.total / 10);

  console.log(numberOfPages);
  const allproducts = result.products.map(product => {
    return `
      <div class="col-md-3">
        <a href="./details.html?id=${product.id}" class="product-card card p-4 card rounded-5 mt-4 d-flex gap-3 ">
          <div class="product-image p-3 rounded-4 position-relative d-flex justify-content-center" >
            <span class="white-badge position-absolute">⭐${product.rating}</span>
            <img src="${product.thumbnail}" alt="${product.title}" class="w-auto" height="200px">
          </div>
          <div p class="product-info">
            <p class="main-font color-emerald opacity-50 text-uppercase fs-14">${product.category}</p>
            <p class="main-font fw-medium">${product.title}</p>
          </div>

          <span p class="main-font fw-medium">$${product.price}</span>
        </a>
      </div>
    `;
  }).join('');

  document.querySelector('.products .row').innerHTML = allproducts;
};
displayallproducts();

// Function to filter products by category
const filterByCategory = async (category) => {
  let response = 'https://dummyjson.com/products';
  if (category) {
    response = `https://dummyjson.com/products/category/${category}`;
  }
  else{
    category='The Collection';
  }
  const result = await axios.get(response);
  displaybyCategory(result.data.products, category);
};
// Function to display products
const displaybyCategory = (products, category) => {
  const productsbycategory = products.map(product => {
    return `
      <div class="col-md-3">
        <a href="./details.html?id=${product.id}" class="product-card card p-4 card rounded-5 mt-4 d-flex gap-3 ">
          <div class="product-image p-3 rounded-4 position-relative d-flex justify-content-center" >
            <span class="white-badge position-absolute">⭐${product.rating}</span>
            <img src="${product.thumbnail}" alt="${product.title}" class="w-auto" height="200px">
          </div>
          <div p class="product-info">
            <p class="main-font color-emerald opacity-50 text-uppercase fs-14">${product.category}</p>
            <p class="main-font fw-medium">${product.title}</p>
          </div>

          <span p class="main-font fw-medium">$${product.price}</span>
        </a>
      </div>
    `;
  }).join('');
  document.querySelector('.products .category').innerHTML = category;
  document.querySelector('.products .row').innerHTML = productsbycategory;
};
displayCatigories();
