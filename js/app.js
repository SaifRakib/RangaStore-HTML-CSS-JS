// Fetch api
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);

  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="single-product">
        <div>
          <img class="product-image" src=${image}></img>
        </div>
        <h5>${product.title}</h5>
        <p>Category: ${product.category}</p>
        <p>Product Rating: ${product.rating.rate}</p>
        <p>Rated by ${product.rating.count} peoples</p>
        <h4>Price: $ ${product.price}</h4>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-dark">Add to cart</button>
        <button id="details-btn" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModal" onclick="getProductDetails(${product.id})">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// cart js
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
 
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};

// fetch single information and showing in modal
const getProductDetails = (id) =>{
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(data => {
   
      const modalBody = document.getElementById('modal-body');
      let html = `
     
        <h6>Product title: ${data.title}</h6>
        <p>Product Category: ${data.category}</p>
        <p>Product Description: ${data.description}</p>
        <p>Product Rating: ${data.rating.rate} , Rated by ${data.rating.count} peoples</p>
      `;
      modalBody.innerHTML = html;
    });
}

