const getProducts = async (page) => {
  const skip = (page - 1) * 12;
  console.log("skip: " + skip);

  const response = await axios.get(
    `https://dummyjson.com/products?limit=12&skip=${skip}`
  );
  return response.data;
};

// display Bestsellers
displayBestsellers = async () => {
  const result = await getProducts(1);
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
const displayallproducts = async (page = 1) => {
  const result = await getProducts(page);
  const numberOfPages = Math.ceil(result.total / 12);
  const allproducts = result.products
    .map((product) => {
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
    })
    .join("");
  document.querySelector(".products .row").innerHTML = allproducts;

  // pagination link
  let pagination = ``;

  if (page > 1) {
    pagination = `<li class="page-item"><button class="page-link rounded-circle d-flex justify-content-center align-items-center" onclick=displayallproducts(${
      page - 1
    })><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" fill-rule="evenodd">
            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
            <path fill="#6c757d" d="M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414z" />
          </g>
        </svg></button></li>`;
  } else {
    pagination = `<li class="page-item"><button class="page-link rounded-circle d-flex justify-content-center align-items-center" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" fill-rule="evenodd">
            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
            <path fill="#6c757d" d="M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414z" />
          </g>
        </svg></button></li>`;
  }
  for (let i = 1; i <= numberOfPages; i++) {
    if (i === page) {
      pagination += `<li class="page-item"><button class="page-link active page-link rounded-circle" onclick=displayallproducts(${i})>${i}</button></li>`;
    } else {
      pagination += `<li class="page-item"><button class="page-link rounded-circle" onclick=displayallproducts(${i})>${i}</button></li>`;
    }
  }
if (page < numberOfPages) {
  pagination += `<li class="page-item"><button class="page-link rounded-circle d-flex justify-content-center align-items-center" onclick=displayallproducts(${page + 1})><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g fill="none" fill-rule="evenodd">
  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
  <path fill="#6c757d" d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z" />
  </g>
  </svg></button></li>`;
}
else{
  pagination += `<li class="page-item"><button class="page-link rounded-circle d-flex justify-content-center align-items-center" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g fill="none" fill-rule="evenodd">
  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
  <path fill="#6c757d" d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z" />
  </g>
  </svg></button></li>`;
}

document.querySelector(".pagination").innerHTML = pagination;
};
displayallproducts();

// filter products by category with pagination
const filterByCategory = async (category, page = 1) => {
  const skip = (page - 1) * 12;
  let response = `https://dummyjson.com/products?limit=12&skip=${skip}`;
  
  if (category) {
    response = `https://dummyjson.com/products/category/${category}?limit=12&skip=${skip}`;
  } else {
    category = 'The Collection';
  }
  
  const result = await axios.get(response);
  displaybyCategory(result.data.products, result.data.total, category, page);
};

// display products by category
const displaybyCategory = (products, total, category, page) => {
  const numberOfPages = Math.ceil(total / 12);
  const productsbycategory = products
    .map((product) => {
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
    })
    .join("");
    
  document.querySelector('.products .category').innerHTML = category;
  document.querySelector('.products .row').innerHTML = productsbycategory;
  
  if (numberOfPages <= 1) {
    document.querySelector('.pagination').innerHTML = '';
    return;
  }
    let pagination = '';
  const categoryParam = category === 'The Collection' ? null : category;
  
  if (page > 1) {
    pagination = `<li class="page-item"><button class="page-link rounded-circle d-flex justify-content-center align-items-center" onclick="filterByCategory('${categoryParam}', ${page - 1})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" fill-rule="evenodd">
            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
            <path fill="#6c757d" d="M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414z" />
          </g>
        </svg></button></li>`;
  } else {
    pagination = `<li class="page-item"><button class="page-link rounded-circle d-flex justify-content-center align-items-center" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" fill-rule="evenodd">
            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
            <path fill="#6c757d" d="M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414z" />
          </g>
        </svg></button></li>`;
  }
  
  for (let i = 1; i <= numberOfPages; i++) {
    if (i === page) {
      pagination += `<li class="page-item"><button class="page-link active rounded-circle" onclick="filterByCategory('${categoryParam}', ${i})">${i}</button></li>`;
    } else {
      pagination += `<li class="page-item"><button class="page-link rounded-circle" onclick="filterByCategory('${categoryParam}', ${i})">${i}</button></li>`;
    }
  }
  
  if (page < numberOfPages) {
    pagination += `<li class="page-item"><button class="page-link rounded-circle d-flex justify-content-center align-items-center" onclick="filterByCategory('${categoryParam}', ${page + 1})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g fill="none" fill-rule="evenodd">
  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
  <path fill="#6c757d" d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z" />
  </g>
  </svg></button></li>`;
  } else {
    pagination += `<li class="page-item"><button class="page-link rounded-circle d-flex justify-content-center align-items-center" disabled><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g fill="none" fill-rule="evenodd">
  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
  <path fill="#6c757d" d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z" />
  </g>
  </svg></button></li>`;
  }
  
  document.querySelector('.pagination').innerHTML = pagination;
};
displayCatigories();

// Pagenation
