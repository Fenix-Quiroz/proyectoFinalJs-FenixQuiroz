// buscador
const search = document.querySelector(".search__fetch");
const btnSearch = document.querySelector(".btn-search");
const container = document.querySelector(".products");
const chekboxsFilter = document.querySelectorAll('input[type="checkbox"]');
let btnCart = document.querySelectorAll(".card-prod__btn");
let cartNotification = document.querySelector(".cart__amount");
let profileName= document.querySelector('.profile__name')



// fetch (trear datos de un JSON)
fetch("./data/data.json")
  .then((response) => response.json())
  .then((data) => {
    // crear tajeta con html
    function createHtml(arr) {
      let html;
      container.innerHTML = "";

      // tarjeta
      for (const product of arr) {
        html = `<div class="card-prod" id="card-product">
        <div class="card-prod__img">
          
            <img
              src="${product.img}"
              alt="Imagen de un vino."
            />
         
        </div>
        <div class="card-prod__dates">
          <p class="card-prod__name">${product.name}</p>
          <p class="card-prod__price">$${product.price}</p>
          <button  class="card-prod__btn" id="${product.id}">
            Agregar al carrito
          </button>
        </div>
      </div>`;
        container.innerHTML += html;
      }
      updateButtonsCard();
    }


    // insertar en nombre del usuario 
    const ususarioLs  = JSON.parse(localStorage.getItem('users'));
    const nameUser = ususarioLs[0].userName
    profileName.innerText = nameUser
    // botones "agregar al acrrito"
    function updateButtonsCard() {
      btnCart = document.querySelectorAll(".card-prod__btn");
      btnCart.forEach((element) => {
        element.addEventListener("click", updateCart);
      });
    }
    /* vaciar al inicio el carrito  */
    let productsAddToCart;
    let productsLs = JSON.parse(localStorage.getItem("productos en carrito"));
    if (productsLs) {
      productsAddToCart = productsLs;
      updateNotificaticationCart();
    } else {
      productsAddToCart = [];
    }
    /*funcion actualizar carrito */
    function updateCart(e) {
      const idBtn = e.currentTarget.id;
      const productAdd = productsAddToCart.find((e) => e.id == idBtn);
      const productAdd2 = data.find((e) => e.id == idBtn);
      if (!productAdd) {
        productsAddToCart.push(productAdd2);
      }
      // libreria de alertas
      Toastify({
        text: "Producto agregado al carrito.",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {},
      }).showToast();
      updateNotificaticationCart();
      savedLs();
    }

    /* funccion de actualizar cantidad al agregar al carrito */
    function updateNotificaticationCart() {
      cartNotification.style = "display: block;";
      cartNotification.innerText = productsAddToCart.length;
    }

    // guardar en lS
    function savedLs() {
      localStorage.setItem(
        "productos en carrito",
        JSON.stringify(productsAddToCart)
      );
    }
    // tarjetas de productos
    createHtml(data);
    // filtro buscar
    function filterProducts(filter) {
      let filteredOut = data.filter((el) => {
        return el.name.toLowerCase().includes(filter);

      });
      return filteredOut;
    }
    // buscador
    search.addEventListener("input", () => {
      let filter = filterProducts(search.value.toLowerCase());
      createHtml(filter);
    });

    // filtro por checkboxs
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
  });
