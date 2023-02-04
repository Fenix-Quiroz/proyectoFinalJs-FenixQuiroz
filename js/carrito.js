/*traer productos del LS */
let productsCartLs = JSON.parse(localStorage.getItem("productos en carrito"));
const cartEmpty = document.querySelector("#cart-empty");
const cardsCart = document.querySelector("#cards-cart");
const cardConfirm = document.querySelector("#card-confirm");
let totalPrice = document.querySelector(".card-confirm--item");
const btnBuy = document.querySelector("#card-confirm__btn");
const cartModal = document.querySelector(".cart__modal");

if (productsCartLs) {
  cartEmpty.classList.add("disabled");
  cardsCart.classList.remove("disabled");
  cardConfirm.classList.remove("disabled");

  productsCartLs.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("card-cart");
    div.innerHTML = `
        <div class="card-cart__img">
        <img src="${product.img}" alt="${product.name}" />
      </div>
      <div class="card-cart__info">
        <img
           id="${product.id}"
          class="card-cart__delete"
          src="./img/icon-delete.svg"
          alt="Icon delete"
        />
        <p class="card-cart__name">${product.name}</p>
        <div class="card-cart__items">
          <p class="card-cart__item">Precio:</p>
          <p class="card-cart__item">Cantidad:</p>
          <p class="card-cart__item">Total:</p>
        </div>
        <div class="card-cart__dates">
          <p class="card-cart__price">$${product.price}</p>
          <div class="card-cart__quantity-products">
            <img
              class="card-cart__minus"
              src="./img/icon-minus.svg"
              alt="Icon minus."
            />
   
            <input
              class="card-cart__quantity"
              type="number"
              id="quantity"
              value="1"
            />
   
            <img
              class="card-cart__plus"
              src="./img/icon-plus.svg"
              alt="Icon plus."
            />
          </div>
   
          <p  class="card-cart__total" id="price-total">$${
            product.price * product.cantidad
          }</p>
        </div>
      </div>`;
    cardsCart.append(div);
    // aumentar y disminuir cantidad de productos
    let inputQuantity = div.querySelector(".card-cart__quantity");
    const minus = div.querySelector(".card-cart__minus");
    const plus = div.querySelector(".card-cart__plus");
    let total = div.querySelector("#price-total");
    let subtotal = document.querySelector("#price-subtotal");
    let totalConfirm = document.querySelector("#price-total-confirm");

    inputQuantity.value = product.cantidad || 1;
    product.cantidad = product.cantidad || 1;
    productsCartLs.total = total;
    minus.addEventListener("click", () => {
      productsCartLs.total = total;
      if (inputQuantity.value <= 1) {
        inputQuantity.value = 1;
      }
      inputQuantity.value--;
      priceTotal();
      acumulador();
      localStorage.setItem(
        "productos en carrito",
        JSON.stringify(productsCartLs)
      );
    });
    plus.addEventListener("click", () => {
      productsCartLs.total = total;
      inputQuantity.value++;
      priceTotal();
      acumulador();
      localStorage.setItem(
        "productos en carrito",
        JSON.stringify(productsCartLs)
      );
    });

    // acumulador
    function acumulador() {
      let acc = 0;
      for (let i = 0; i < productsCartLs.length; i++) {
        const prod = productsCartLs[i];
        console.log(JSON.parse(JSON.stringify(prod)));
        let tot = prod.price * prod.cantidad;
        acc = acc + tot;
      }
      totalConfirm.innerHTML = `$${acc}`;
      subtotal.innerHTML = `$${acc}`;
      localStorage.setItem(
        "productos en carrito",
        JSON.stringify(productsCartLs)
      );
    }

    acumulador();
    // function sumar precio por cantidad
    function priceTotal() {
      product.cantidad = inputQuantity.value;
      total.innerHTML = `$${product.price * product.cantidad}`;
    }
    priceTotal();
    // Borrar producto del array y del LS
    const deleteCardProduct = div.querySelector(".card-cart__delete");

    deleteCardProduct.addEventListener("click", () => {
      div.remove();
      productsCartLs = productsCartLs.filter((prod) => prod.id != product.id);

      priceTotal();
      acumulador();
      localStorage.setItem(
        "productos en carrito",
        JSON.stringify(productsCartLs)
      );
      cartEmpty2();
    });
  });
}

function cartEmpty2() {
  if (productsCartLs.length == 0) {
    cartEmpty.classList.remove("disabled");
    cardsCart.classList.add("disabled");
    cardConfirm.classList.add("disabled");
  }
}
cartEmpty2();

// activar modal comprar
btnBuy.addEventListener("click", () => {
  cartModal.style = "display: block;";
});
//modal ( boton volver)
const modalVolver = document.querySelector(".cart-modal__btn-volver");
modalVolver.addEventListener("click", () => {
  cartModal.style = "display: none;";
});

// boton pagar
const payBtn = document.querySelector("#cart-form__btn");

// datos del usuario (tarjetas)
let cardNumber = document.querySelector("#cardNumber");
let cardHolder = document.querySelector("#cardHolder");
let ccv = document.querySelector("#ccv");
let modalError = document.querySelector(".modal-error");
// validacion de datos del modal comprar
payBtn.addEventListener("click", () => {
  if (cardNumber.value != "" && cardHolder.value != "" && ccv.value != "") {
    cartModal.style = "display: none;";
    // libreria sweet alert
    Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Gracias por su compra!",
      showConfirmButton: false,
      timer: 1500,
    });
    localStorage.clear("productos en carrito", JSON.stringify(productsCartLs));
    productsCartLs = [];
    cartEmpty2();
  } else {
    modalError.innerText = "Ingrese sus datos para poder comprar.";
  }
});