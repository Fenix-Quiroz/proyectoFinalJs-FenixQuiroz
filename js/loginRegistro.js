//login y reg
let userName = document.getElementById('name-usuario');
let pass = document.getElementById('usser-password');
let btnLog = document.getElementById('btn-login');
let btnReg = document.getElementById('btn-reg');
let txtConfirmError = document.getElementById('reg-log__error')


//registro
let users;
if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
}else{
    users =[];
}

// datos del usuario
 class User{
    constructor(userName, password){
        this.userName=userName
        this.password = password
    }
 }

 // guardar usuario
 function saveUser(user) {
    return users.push(user)
 }

 // guardar en local storage
 function saveLs(arr) {
  return localStorage.setItem('users', JSON.stringify(arr))
 }


//btn registrar
btnReg.addEventListener('click', ()=>{
    const newUser = new User(userName.value,pass.value)
    saveUser(newUser);
    saveLs(users);
    if (userName.value != "" && pass.value!= "") {
        txtConfirmError.innerText="Usuario registrado haz 'CLICK' EN 'Ingresar' para acceder."
        txtConfirmError.style= "color: green;"
        }else{
            txtConfirmError.innerText="Ingrese sus datos para poder registrarse"
            txtConfirmError.style= "color: red;"
        }
        
})

// LOGIN

function login() {
    let userFond = users.find((user)=>{
        return user.userName == userName.value && user.password == pass.value;
    });
    if (userFond) {
        window.location.href = "./pagina-principal.html"
    }else{
        txtConfirmError.innerText="Usuario no encontrado"
        txtConfirmError.style= "color: red;"
    }
}

//btn ingresar
btnLog.addEventListener('click',() =>{
    if (userName.value != "" && pass.value!= "") {
        login()
        }else{
            txtConfirmError.innerText="Ingrese sus datos por favor."
            txtConfirmError.style= "color: red;"
        }
        
}  )
