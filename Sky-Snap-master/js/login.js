var urlActual = (new URL(window.location.origin)).hostname;
const laravelApiii = "http://"+urlActual+":8090";
async function login() {

    try {
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let respuesta = await fetch(laravelApiii + "/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        let data = await respuesta.json();
        console.log(data);
        if (data["success"]) {
            sessionStorage.setItem("token", data["data"]["token"]);
            cargarMiPagina();
                        

        } else {
            console.error('Error en el inicio de sesión:', data["error"]);
            alert("la contraseña no coincide");
        }
    } catch (error) {
        console.error(error);
    }
}

async function register() {
    const nombreRegister = document.getElementById('nombreRegister').value;
    const emailRegister = document.getElementById('emailRegister').value;
    const passwordRegister = document.getElementById('passwordRegister').value;
    const passwordRegister2 = document.getElementById('passwordRegister2').value;
    console.log('hola')
    if (passwordRegister.length == passwordRegister2.length){
        console.log('hola')
        try {
            let respuesta = await fetch(laravelApiii + "/api/register", {
                method: "POST",
                body: JSON.stringify({
                    name: nombreRegister,
                    email: emailRegister,
                    password: passwordRegister,
                    c_password: passwordRegister2
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            let data = await respuesta.json();
            console.log(data);

            if (data["success"]) {
                sessionStorage.setItem("token", data["data"]["token"]);
                cargarMiPagina()

            } else {
                // Ha fallado el login
                console.error('Error al registrarse:', data["error"]);
                alert("la contraseña no coincide");
            }
        } catch (error) {
            console.error(error);
        }
    }else{
        alert('Las contraseñas no coinciden');
    }
}

async function logout() {
    
    try {
        let respuesta = await fetch(laravelApiii + "/api/logout", {
           
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: 'Bearer ' + sessionStorage.getItem("token")
            }
        });

        let data = await respuesta.json();
        console.log(data);
    

        if (data["message"] == 'Has cerrado sesion!') {
            llevarIndex()
            sessionStorage.removeItem("token");
        }
    } catch (error) {
        console.log(error);
    }
}
function cargarMiPagina() {
    window.location.href = "miPagina.html";
}
function llevarIndex() {
    window.location.href = "index.html";
    console.log('Session cerrada')
    alert("Session cerrada")
}




