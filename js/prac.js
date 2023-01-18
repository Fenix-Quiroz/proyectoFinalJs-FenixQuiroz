//gurdando datos
localStorage.setItem('saludo', 'Hola tarola')
localStorage.setItem('cumple', '20 de noviembre')
localStorage.setItem('es valido', 'true')

// local storage get item
let saludo = localStorage.getItem('saludo')
console.log(saludo  );

//sesseionStorage se pierden cuando se apaga la compu
sessionStorage.setItem('seleccion', [1,2,3,4,5,6,7])
sessionStorage.setItem('email', 'dnai@gmail.com')
let numeros = sessionStorage.getItem('seleccion').split(',')
console.log(numeros);

//eliminar datos del local storage o sesssion storage
localStorage.removeItem('cumple')
localStorage.removeItem('saludo')
localStorage.clear()
//recorrer storag (con for )


// json
const product = {nombre:"Fideos", precio:400}

const aJson= JSON.stringify(product)
localStorage.setItem('product', aJson )
 // de json a object
 let deJsonAObj = JSON.parse(localStorage.getItem("product"))
 console.log(deJsonAObj); 

 let carrito =[];

 carrito.push(product)
 carrito.push(product)
 console.log(carrito);
 localStorage.setItem('carrito', JSON.stringify(carrito))
 let recuperarCarrito= JSON.parse(localStorage.getItem('carrito'))

 //hacer click en el btn comprar = LocalStorage.removeItem("carrito")
