import {registrarCuenta, recuperarCuenta,actualizarCuenta,eliminarCuenta} from "./promesas.js"; // Se importan las funciones de promesas  
window.addEventListener("load",()=>{                    
    document.getElementById("btnContraste").addEventListener("click",contraste);
    document.getElementById("btnTmnLetra").addEventListener("click",tmnLetra);
    document.getElementById("btnEnviar").addEventListener("click",enviar);
    document.getElementById("btnActualizar").addEventListener("click",actualizar);
    cargarDatos();
})

const contraste = ()=>{         // Funcion flecha para el cambio de contraste  
    let eBody = document.body;  // obtenemos el elemento body  

    if(eBody.style.backgroundColor == 'rgb(48, 78, 247)'){          // si el color es azul volvera a ser negro  
        eBody.style.backgroundColor = 'black';
    }else{                                                           // sino, sera azul */
        eBody.style.backgroundColor = 'rgb(48, 78, 247)';  
    };
}

const tmnLetra = ()=>{          // Funcion flecha para el tamanio de letra  
    let eTexto = document.body; // Recuperamos el elemento body  
    if(eTexto.style.fontSize == '30px'){                            // si el la fuente es grande, se va a achicar  
        eTexto.style.fontSize = '16px';
    }else{                                                          // sino, se agrandara  
        eTexto.style.fontSize = '30px';
    }
}

const enviar = () =>{           // FUNCION DE INGRESO DE NUEVAS CUENTAS
    // Recuperar datos  
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let ePais = document.getElementById("pais");
    let eCorreo = document.getElementById("correo");                  // Recuperamos todos los elementos del formulario 
    let eGenero = document.getElementById("genero");                  
    let eDescripcion = document.getElementById("descripcion");
    let eTyC = document.getElementById("TyC");            
    let eRN = document.getElementById("RN");
    
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vPais = ePais.value;                                        // Recuperamos los valores desde los elementos de los campos 
    let vCorreo = eCorreo.value;
    let vGenero = eGenero.value;
    let vDescripcion = eDescripcion.value;
    let vTyC = eTyC.checked;                    // se debe usar checked en vez de value para que la checkbox devuelva su estado actual en formato booleano 
    let vRN = eRN.checked;
    // Verificaciones
    // Se envian el elemento, el valor y el nombre del dato a todas las casillas que sea necesario 
    // hay 4 tipos de verificaciones: verificacion de texto, verificacion de correo, verificacion de selector y verificacion de check
    // por mantener un estandar, todos piden lo mismo
    let invalido = verificartxt(eNombre,vNombre,'nombre') + verificartxt(eApellido,vApellido,'apellido') + verificartxt(ePais,vPais,'pais') + verificarcorreo(eCorreo,vCorreo,'correo') + verificarselector(eGenero,vGenero,'genero') + verificarcheck(eTyC,vTyC,'TyC');
    // Las funciones verificar retornan 1 si fallan, 0 si pasan la prueba
    // En el caso de que un verificador falle el valor de invalido dejara de ser 0 y no proseguira 
    
    if(!invalido && confirm("¿Seguro que quieres crear a :\n"+vNombre+" "+vApellido+"?")){      // Seguido de la revision de la variable invalido se hace una confirmacion en pop up 
        // Se crea el objeto
        let objeto = {nombre:vNombre,apellido:vApellido,pais:vPais,correo:vCorreo,genero:vGenero,descripcion:vDescripcion,TyC:vTyC,RN:vRN}
        registrarCuenta(objeto);

        document.getElementById("nombre").value = ""; 
        document.getElementById("apellido").value = ""; 
        document.getElementById("pais").value = ""; 
        document.getElementById("correo").value = "";           // Se borran los datos de los espacios del formulario 
        document.getElementById("genero").value = ""; 
        document.getElementById("descripcion").value = "";
        document.getElementById("TyC").checked = false;
        document.getElementById("RN").checked = false;
    }
}

const actualizar = () =>{                       // FUNCION ACTUALIZAR APLICADO A FIREBASE
    /* Recuperar datos */
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let ePais = document.getElementById("pais");
    let eCorreo = document.getElementById("correo");                  // Recuperamos todos los elementos del formulario 
    let eGenero = document.getElementById("genero");                  
    let eDescripcion = document.getElementById("descripcion");
    let eTyC = document.getElementById("TyC");            
    let eRN = document.getElementById("RN");
    
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vPais = ePais.value;                                        // Recuperamos los valores desde los elementos de los campos 
    let vCorreo = eCorreo.value;
    let vGenero = eGenero.value;
    let vDescripcion = eDescripcion.value;
    let vTyC = eTyC.checked;                    // se debe usar checked en vez de value para que la checkbox devuelva su estado actual en formato booleano 
    let vRN = eRN.checked;
    // Verificaciones (Es un copiapega de la verificacion anterior)
    let invalido = verificartxt(eNombre,vNombre,'nombre') + verificartxt(eApellido,vApellido,'apellido') + verificartxt(ePais,vPais,'pais') + verificarcorreo(eCorreo,vCorreo,'correo') + verificarselector(eGenero,vGenero,'genero') + verificarcheck(eTyC,vTyC,'TyC');
    // En el caso de que un verificador falle el valor de invalido dejara de ser 0 y no proseguira 
    if(!invalido && confirm("¿Seguro que quieres actualizar a :\n"+vNombre+" "+vApellido+"?")){     // Seguido de la revision de la variable invalido se hace una confirmacion en pop up 
        // Se crea y envia objeto 
        let objeto = {nombre:vNombre,apellido:vApellido,pais:vPais,correo:vCorreo,genero:vGenero,descripcion:vDescripcion,TyC:vTyC,RN:vRN}   
        let id = document.getElementById("btnActualizar").value;            // Se trae el id del objeto a actualizar 
        actualizarCuenta(objeto,id);                                        // Se utilizan los nuevos datos y la id recuperada en la funcio actualizar encontrada en promesas *
        let bAct = document.getElementById("btnActualizar");                
        let bEnv = document.getElementById("btnEnviar");                    // Se vuelve a hacer visible el boton eliminar e invisible el boton actualizar 
        bAct.style.display = "none";                                        
        bEnv.style.display = "block";

        document.getElementById("nombre").value = ""; 
        document.getElementById("apellido").value = ""; 
        document.getElementById("pais").value = ""; 
        document.getElementById("correo").value = "";                       // Se borran los datos de los espacios del formulario 
        document.getElementById("genero").value = ""; 
        document.getElementById("descripcion").value = "";
        document.getElementById("TyC").checked = false;
        document.getElementById("RN").checked = false;
    }
}

// VERIFICACIONES       (Son bastante parecidas asi que comentare en detalle la primera y las demas solo en sus diferencias escenciales)
function verificartxt(elemento,valor,idCampo){                  // Se pidio el elemento, el valor y el nombre del campo previamente
    let flag = 0                                                // Se crea una bandera que en caso de cumplirse una condicion se va a levantar
    let alerta = document.getElementById("p"+idCampo);          // Se recupera el elemento de texto alerta que se encuentra en el index,
                                                                // para ser usado en caso de falla
    if(valor == "" ||valor == " "){                             // Si el campo esta vacio se levanta la bandera y se indica el error 
        alerta.innerText = "Debes ingresar algo al campo";
        elemento.style.borderColor = "red";
        alerta.style.display = "block";
        flag = 1
    }else{
        elemento.style.borderColor = "white";                   // Si el campo esta correcto, se devuelve el color original al campo y se desaparece alerta 
        alerta.style.display = "none";
    }
    if(!flag){    
        if(!isNaN(valor)){                                      // Si el campo tiene numeros se levanta la bandera y se indica el error 
            alerta.innerText = "No debes ingresar numeros";     
            elemento.style.borderColor = "red";
            alerta.style.display = "block";
            flag = 1
        }else{                                                  // Si el campo esta correcto se devuelve el color original al campo y se desaparece alerta 
            elemento.style.borderColor = "white";
            alerta.style.display = "none";
        }
    }
    return flag                                                 // Se retorna si la bandera se levanto o no 
}

function verificarcorreo(elemento,valor,idCampo){               //  Verificacion del campo correo en especifico
    let flag = 0
    let alerta = document.getElementById("p"+idCampo);

    if(valor == "" ||valor == " "){                             // verifica vacio
        alerta.innerText = "Debes ingresar algo al campo";
        elemento.style.borderColor = "red";                     
        alerta.style.display = "block";
        flag = 1
    }else{
        elemento.style.borderColor = "white";
        alerta.style.display = "none";
    }
    if(!flag){   
        if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valor)){        // Se utilizo expresiones regulares para esta parte 
            alerta.innerText = "Se debe ingresar un correo";                        // se permiten valores de todo tipo pero debe poseer un arroba y un punto 
            elemento.style.borderColor = "red";                                     // pase tanto tiempo en esta parte que me dio flojera ser tan especifico en los otros 
            alerta.style.display = "block";                                         // Perdone profe :c 
            flag = 1
        }else{
            elemento.style.borderColor = "white";
            alerta.style.display = "none";
        }
    }
    return flag
}

function verificarselector(elemento,valor,idCampo){                 // La verificacion de selectores funciona parecido a los otros tambien 
    let flag = 0                                                    // Este simplemente busca que no se use el apartado default 
    let alerta = document.getElementById("p"+idCampo);
    if(valor == ''){                                                // El apartado default al tener un valor vacio no es dificil de comparar
        alerta.innerText = "Debes elegir una opcion";
        elemento.style.borderColor = "red";
        alerta.style.display = "block";
        flag = 1
    }else{
        elemento.style.borderColor = "white";
        alerta.style.display = "none";
    }
    return flag
}

function verificarcheck(elemento,valor,idCampo){                    // La verificacion de Checks obligatorios es aun mas simple que todos los demas 
    let flag = 0                                                    // Solamente busca que los campos esten tickeados 
    let alerta = document.getElementById("p"+idCampo);
    let ediv = document.getElementById(idCampo+"div");
    if(valor == false){                                             // Parecido a la anterior, si el valor es falso se levanta bandera
        alerta.innerText = "Debes aceptar para continuar";
        ediv.style.borderColor = "red";
        alerta.style.display = "block";
        flag = 1
    }else{
        elemento.style.borderColor = "white";
        alerta.style.display = "none";
    }
    return flag
}

const cargarDatos = ()=>(                                       
    recuperarCuenta().then((Cuenta)=>{
        let estructura = "";                                    // Se crea una estructura vacia para mostrar los datos
        Cuenta.forEach((c)=>{                                   // Se recorre el objeto cuenta para ingresarlos listados a la estructura
            estructura += "<tr>"
            estructura += "<td>"+c.nombre+"</td>"
            estructura += "<td>"+c.apellido+"</td>"
            estructura += "<td>"+c.pais+"</td>"
            estructura += "<td>"+c.correo+"</td>"
            estructura += "<td>"+c.genero+"</td>"
            estructura += "<td>"+c.descripcion+"</td>"
            estructura += "<td>"+c.TyC+"</td>"
            estructura += "<td>"+c.RN+"</td>"
            estructura += "<td><button id='UPD"+c.id+"'>Actualizar</button></td>"
            estructura += "<td><button id='DEL"+c.id+"'>Eliminar</button></td>"
            estructura += "</tr>";
        });
        document.getElementById("cuerpoTabla").innerHTML = estructura;      // Se ingresa la tabla como html al index para que se vea en la pagina
        Cuenta.forEach((c)=>{                                               // Cada dato tendra su respectivo boton de delete y de update
            let btnUpdate = document.getElementById("UPD"+c.id);                // FUNCION UPDATE
            btnUpdate.addEventListener("click",()=>{                            // Se hace un listener al boton de update
                let bAct = document.getElementById("btnActualizar");            // Se llaman los botones atualizar y enviar del index para mostrarlos y esconderlos
                let bEnv = document.getElementById("btnEnviar");

                document.getElementById("nombre").value = c.nombre;             // los datos de la cuenta a la que se le apreto el boton de update pasan al formulario
                document.getElementById("apellido").value = c.apellido;         //  de ingreso para ser editados
                document.getElementById("pais").value = c.pais; 
                document.getElementById("correo").value = c.correo; 
                document.getElementById("genero").value = c.genero; 
                document.getElementById("descripcion").value = c.descripcion;
                document.getElementById("TyC").checked = c.TyC;
                document.getElementById("RN").checked = c.RN;
                bAct.style.display = "block";                                   // se esconde el boton de enviar y se revela el actualizar
                bEnv.style.display = "none";
                document.getElementById("btnActualizar").value = c.id;          // se guarda la id para la edicion, esperando que se utilice al momento de apretar el nuevo boton actualizar del formulario
            });
            let btnDelete = document.getElementById("DEL"+c.id);                                // FUNCION DELETE
            btnDelete.addEventListener("click",() => {                                          // Se hace un listener al boton delete
                if(confirm("¿Seguro de eliminar a :\nNombre"+c.nombre+" "+c.apellido+"?")){     // se confirma a travez de un pop up
                    eliminarCuenta(c.id).then(()=>{
                        alert("Eliminado con exito");
                        cargarDatos();
                    })
                }
            });
        });

    })
) 