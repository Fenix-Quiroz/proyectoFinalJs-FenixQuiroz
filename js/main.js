// buscador
const search = document.querySelector(".search__fetch");
const btnSearch = document.querySelector(".btn-search")
const container= document.querySelector(".products")
const chekboxsFilter = document.querySelectorAll('input[type="checkbox"]');



const products =[
    //vinos semisecos
    {id: 1 ,tipo:"semiseco", name:"Vino Tabernero Gran Rosé" , img:"img/producto-semiseco1.jpg" , price:"$40"},
    {id: 2 ,tipo:"semiseco", name:"Vino Tabernero Gran Blanco" , img:"img/producto-semiseco2.png" , price:"$40"},
    {id: 3 ,tipo:"semiseco", name:"Vino Tabernero Gran Tinto" , img:"img/producto-semiseco3.jpg" , price:"$40"},
    {id: 4 ,tipo:"semiseco", name:"Vino Tabernero Rosé Gran Selección" , img:"img/producto-semiseco4.jpg" , price:"$40"},
    {id: 5 ,tipo:"semiseco", name:"Vino Tabernero Tinto País" , img:"img/producto-semiseco5.jpg" , price:"$40"},
    {id: 6 ,tipo:"semiseco", name:"Vino Tabernero Rosé Tuyo" , img:"img/producto-semiseco6.jpg" , price:"$40"},

    //vinos secos
    {id: 7 ,tipo:"seco", name:"Vino Gran Tinto Malbec Merlot" , img:"img/producto-seco1.png" , price:"$40"},
    {id: 8 ,tipo:"seco", name:"Vino Gran Tinto Cabernet Sauvignon" , img:"img/producto-seco2.png" , price:"$40"},
    {id: 9 ,tipo:"seco", name:"Vino Gran Blanco Fina Reserva" , img:"img/producto-seco3.png" , precio:"$40"},

    //vinos vittoria
    {id: 10 ,tipo:"vittoria", name:"Vino Vittoria Malbec" , img:"img/producto-vittoria1.png" , price:"$40"},
    {id: 11 ,tipo:"vittoria", name:"Vino Vittoria Syrah" , img:"img/producto-vittoria2.png" , price:"$40"},
    {id: 12 ,tipo:"vittoria", name:"Vino Vittoria Cabernet Sauvignon" , img:"img/producto-vittoria3.png" , price:"$40"},
    {id: 13 ,tipo:"vittoria", name:"Vino Vittoria Rosé de Syrah" , img:"img/producto-vittoria4.png" , price:"$40"},
    {id: 14 ,tipo:"vittoria", name:"Vino Vittoria Sauvignon Blanc" , img:"img/producto-vittoria5.png" , price:"$40"},
    {id: 15 ,tipo:"vittoria", name:"Vino Vittoria Chardonnay" , img:"img/producto-vittoria6.png" , price:"$40"},

    //vinos generosos
    {id: 16 ,tipo:"generosos", name:"Vino El Fraile Oporto Tabernero" , img:"/img/producto-generoso1.png" , price:"$40"},
]


// filtra productos
 function filterProducts(filter) {
    console.log(filter);
    let filteredOut = products.filter((el) =>{
        return el.name.includes(filter);
    })
    return filteredOut;
 }
// crear tajeta con html
function createHtml(arr) {
    let html;
    container.innerHTML="";
    // tarjeta
    for (const product of arr) {
        html= `<div class="card-prod">
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
      container.innerHTML += html
    }
}

createHtml(products);
// search
search.addEventListener('input', ()=>{
    let filter = filterProducts (search.value)
    createHtml(filter)
} )




//filter
  function filterInputChekbox(filter) {
      
      let filterInput = products.filter((el) =>{
           return el.tipo ==(filter);
     })
      return filterInput;
  }
 chekboxsFilter.forEach(element =>{
     element.addEventListener('click', (event)=>{
          let filter = filterInputChekbox(element.value);
          console.log(element.value);
          createHtml(filter)
        
     })
      
 })

