// buscador
const search = document.querySelector(".search__fetch");
const btnSearch = document.querySelector(".btn-search");
const container = document.querySelector(".products");
console.log(container);
const chekboxsFilter = document.querySelectorAll('input[type="checkbox"]');


// crear tajeta con html
function createHtml(arr) {
  let html;
  container.innerHTML = "";
  
  // tarjeta
  for (const product of arr) {
    html = `<div class="card-prod" id="card-product">
        <div class="card-prod__img">
          <a href="productos.html">
            <img
              src="${product.img}"
              alt="Imagen de un vino."
            />
          </a>
        </div>
        <div class="card-prod__dates">
          <p class="card-prod__name">${product.name}</p>
          <p class="card-prod__price">${product.price}</p>
          <button  class="card-prod__btn" id="btn-cart">
            Agregar al carrito
          </button>
        </div>
      </div>`;
    container.innerHTML += html;
  }
}
// fetch (trear datos de un JSON)
fetch("./data/data.json")
  .then((response) => response.json())
  .then((data) => {
    // tarjetas de productos
    createHtml(data);
    // filtro buscar
    function filterProducts(filter) {
      let filteredOut = data.filter((el) => {
        return el.name.includes(filter);
      });
      return filteredOut;
    }
    // buscador
    const cartProduct= document.querySelectorAll(".card-prod")
    search.addEventListener("input", () => {
      let filter = filterProducts(search.value);
      createHtml(filter)
      
      
    });

    // filtro p0r checkboxs
    function filterInputChekbox(filter) {
      let filterInput = data.filter((el) => {
        return el.tipo == filter;
      });
      return filterInput;
    }
    chekboxsFilter.forEach((element) => {
      element.addEventListener("click", (event) => {
        
        let filter = filterInputChekbox(element.value);
        let prductsTitle = document.querySelector(".products__title");
        if (element.checked == true) {
          createHtml(filter);
          prductsTitle.innerHTML = `VINOS ${element.id}`;
        } else {
          createHtml(data);
          prductsTitle.innerText = "NUESTROS VINO DISPONIBLES";
        }
      });
    });

    //notificacion al agregar al carrito
    const btnCart = document.querySelectorAll(".card-prod__btn");
    let cartNotification = document.querySelector(".cart__amount");
    let cartQuantity = 0;
    // btn agrgar al carrito
    btnCart.forEach((element) => {
      element.addEventListener("click", () => {
        cartQuantity++;
        cartNotification.style = "display: block;";
        cartNotification.innerText = cartQuantity;

        // guardar productos del carrito en local storage

        //localStorage.setItem('product' ,JSON.stringify() )
      });
    });
  });

// agregar productos al carrito
// let cartProducts= document.querySelector(".main-cart");

// function addTocartProducts() {
//   products.forEach(product => {
//     let createCardHtml = `<div class="card-cart">
//     <div class="card-cart__img">
//       <img src="${product.img}" />
//     </div>
//     <div class="card-cart__info">
//       <img
//         class="card-cart__delete"
//         src="./img/icon-delete.svg"
//         alt="Icon delete"
//       />
//       <p class="card-cart__name">${products.name}</p>
//       <div class="card-cart__items">
//         <p class="card-cart__item">Precio:</p>
//         <p class="card-cart__item">Cantidad:</p>
//         <p class="card-cart__item">Total:</p>
//       </div>
//       <div class="card-cart__dates">
//         <p class="card-cart__price">${product.price}</p>
//         <div class="card-cart__quantity-products">
//           <img
//             class="card-cart__minus"
//             src="./img/icon-minus.svg"
//             alt="Icon minus."
//           />

//           <input
//             class="card-cart__quantity"
//             type="number"
//             id="quantity-products"
//             value="0"
//           />

//           <img
//             class="card-cart__plus"
//             src="./img/icon-plus.svg"
//             alt="Icon plus."
//           />
//         </div>

//         <p  class="card-cart__total">$300</p>
//       </div>
//     </div>
//   </div>`
//       cartProducts += createCardHtml;
//   });
// }
