const getProduct = async () => {
  const params = new URLSearchParams(location.search);
  const productId = params.get("id");
  const response = await axios.get(
    `https://dummyjson.com/products/${productId}`
  );
  return response.data;
};
getProduct();

// swiper
const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  effect: "coverflow",
  coverflowEffect: {
    rotate: 30,
    slideShadows: false,
  },
});

// display Product Data
const displayProductData = async () => {
  try {
    const response = await getProduct();
    console.log(response);

    const ProductImages = response.images
      .map((img) => {
        return `
        <div class="swiper-slide w-100 rounded-5"><img src="${img}" alt="" class="w-100"></div>
      `;
      })
      .join("");

    const ProductInfo = `
      <div class="text-information d-flex flex-column gap-3 align-items-start">
        <span class="emerald-badge px-2 fs-14 text-uppercase">${response.category}</span>
        <h2 class="fw-bold fs-1">${response.title}</h2>
        <span class="fw-bold fs-1 main-font">${response.price}</span>
      </div>
      <div class="disciption">
        <p class="text-muted">${response.description}</p>
      </div>
    `;

    const ProductRevies = response.reviews
      .map((review) => {
        const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);        
        return `
          <div class="comment-card card p-3 d-flex flex-column gap-3 align-items-start rounded-4 border-0">
            <p class="fw-bold">${review.reviewerName}</p>
            <span class="">${stars}</span>
            <p class="fs-14">"${review.comment}"</p>
          </div>
      `;
      })
      .join("");

    document.querySelector(
      ".product-images .swiper .swiper-wrapper"
    ).innerHTML = ProductImages;
    document.querySelector(".product .product-info").innerHTML = ProductInfo;
    document.querySelector(".product .product-reviews .cards").innerHTML = ProductRevies;

    document.querySelector(".loader").classList.add("d-none");
  } catch (error) {
    document.querySelector(".loader").classList.remove("d-none");
    document.querySelector(".loader").classList.add("d-none");
  } finally {
    document.querySelector(".loader").classList.add("d-none");
  }
};

displayProductData();
